import "./reserve.css";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Useclickoutside from "../../components/useClickoutisde/Useclickoutside";
import Checkbox from "@mui/material/Checkbox";
import * as api from "../../api/index";
import Errortoast from "../../components/Errortoast";
const Reserve = ({ setOpen, hoteldetails }) => {
  const reservepopup = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  Useclickoutside(reservepopup, () => {
    setOpen(false);
  });
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(
      new Date(date2).getTime() - new Date(date1).getTime()
    );
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(
    user?.usersearchdetails?.dates[0].endDate,
    user?.usersearchdetails?.dates[0].startDate
  );
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [error, seterror] = useState("");
  var Total =
    selectedRooms.length &&
    selectedRooms.reduce((x, item) => x + item.price, 0);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const alldates = getDatesInRange(
    user?.usersearchdetails?.dates[0].startDate,
    user?.usersearchdetails?.dates[0].endDate
  );

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const handleSelect = (e, item) => {
    seterror("");
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, { id: value, price: item.price }]
        : selectedRooms.filter((item) => item.id !== value)
    );
  };

  var message = `Please Select Only ${user?.usersearchdetails?.options.room} Room`;
  const handleClick = async () => {
    try {
      if (error) {
        return;
      }
      await Promise.all(
        selectedRooms.map(async (roomId) => {
          const { data } = await api.RoomAvailability(roomId, {
            dates: alldates,
          });
          console.log(data);
          return data;
        })
      );
      setOpen(false);
    } catch (err) {}
  };
  useEffect(() => {
    var error =
      selectedRooms.length > user?.usersearchdetails?.options.room
        ? true
        : false;
    seterror(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRooms]);
  return (
    <div className="reserve" ref={reservepopup}>
      <div className="rContainer">
        {error && (
          <Errortoast showstate={true} message={message} severity="error" />
        )}
        <b>
          Select Your {user?.usersearchdetails?.options.room}
          {user?.usersearchdetails?.options.room <= 1 ? (
            <span>Room</span>
          ) : (
            <span>Rooms</span>
          )}
        </b>
        {hoteldetails.rooms.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.roomtitle}</div>
              <div className="rMax">
                Max people: <b>{item.maxpeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomno.map((roomNumber) => (
                <div className="room">
                  <Checkbox
                    label={roomNumber.number}
                    value={roomNumber._id}
                    onChange={(e) => {
                      handleSelect(e, item);
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <b>Total Nights :- {days}</b>
        <hr />
        <b>Total Price:-{Total * days}</b>
        <button onClick={handleClick} disabled={error} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
