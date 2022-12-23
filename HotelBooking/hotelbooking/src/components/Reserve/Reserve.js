import "./reserve.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Useclickoutside from "../../components/useClickoutisde/Useclickoutside";
const Reserve = ({ setOpen, hoteldetails }) => {
  const reservepopup = useRef(null);
  Useclickoutside(reservepopup, () => {
    setOpen(false);
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
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

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
    } catch (err) {}
  };
  return (
    <div className="reserve" ref={reservepopup}>
      <div className="rContainer">
        <span>Select your rooms:</span>
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
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
