import "./HotelList.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import moment from "moment";
import SearchItem from "../../../components/Search Item/SearchItem";
import * as api from "../../../api/index.js";
const HotelList = () => {
  const location = useLocation();
  const [destination, setdestination] = useState("");
  const [dates, setDates] = useState([]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setoptions] = useState({});
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(10000);
  const [hoteldata, sethoteldata] = useState([]);

  const data = async () => {
    const alldata = await api.HotelBydestination({ destination, min, max });
    console.log(alldata);
    sethoteldata(alldata.data);
  };
  useEffect(() => {
    if (location?.state) {
      setdestination(location.state.destination);
      setDates(location.state.dates);
      setoptions(location.state.options);
      data();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);
  return (
    <div>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                placeholder="Enter Your Destination"
                value={destination}
                type="text"
                onChange={(e) => setdestination(e.target.value)}
              />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${moment(
                dates[0]?.startDate
              ).format("MM/DD/YYYY")} to ${moment(dates[0]?.endDate).format(
                "MM/DD/YYYY"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={data}>Search</button>
          </div>
          <div className="listResult">
            <>
              {hoteldata.map((item) => (
                <SearchItem item={item} key={item._id} />
              ))}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HotelList;
