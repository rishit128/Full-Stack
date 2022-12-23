import "./Hoteldetails.css";
import Header from "../../Users Pages/User Navbar/Header";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as api from "../../../api/index";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Table from "@mui/material/Table";
import TableRow from "@material-ui/core/TableRow";
import PeopleIcon from "@mui/icons-material/People";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
const Hoteldetails = () => {
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const [hotelid, sethotelid] = useState("");
  const [availableroomsdata, setavailableroomsdata] = useState([]);
  const [hoteldetails, sethoteldetails] = useState({});
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
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
  const availablerooms = new Promise(function (resolve, reject) {
    const hoteldata = hoteldetails?.rooms?.map((e) => {
      const availablerooms = e.roomno.map((e) => {
        const rishit = isAvailable(e);

        return { ...e, rishit };
      });

      return { ...e, availablerooms };
    });
    resolve(hoteldata);
  });

  useEffect(() => {
    const fetchhoteldetails = async (id) => {
      const { data } = await api.HotelByid(id);
      var regex = /(<([^>]+)>)/gi;
      var description = data.description.replace(regex, "");
      sethoteldetails({ ...data, description });
    };
    if (location?.pathname) {
      const id = location.pathname.split("/")[3];
      sethotelid(id);
      fetchhoteldetails(id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    availablerooms.then(function (data) {
      console.log(data);
      setavailableroomsdata(data);
      console.log(availableroomsdata);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoteldetails]);
  return (
    <div>
      <Header type="list" />
      <div className="hotelContainer">
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hoteldetails.hotelname}</h1>
          <div className="hotelAddress">
            <span>{hoteldetails.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location – {hoteldetails.distancefromairport}Km from
            Airport
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over{" "}
            <CurrencyRupeeOutlinedIcon
              fontSize="small"
              style={{ color: "green" }}
            />
            {hoteldetails.cheapestPrice} at this property and get a free airport
            taxi
          </span>
          {/* <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div> */}
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <p className="hotelDesc">{hoteldetails.description}</p>
              <div className="availability-block-header">
                <hr />
                <h2>Availability</h2>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow style={{ backgroundColor: "#03a9f4" }}>
                        <TableCell align="left" style={{ width: "350px" }}>
                          Accommodation Type
                        </TableCell>
                        <TableCell align="left"> Sleeps</TableCell>
                        <TableCell align="left"> Today's Price</TableCell>
                      </TableRow>
                    </TableHead>
                    {availableroomsdata?.map((e) => {
                      return (
                        e.availablerooms.some(
                          (item) => item.rishit === true
                        ) && (
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                <div>
                                  {e.roomtitle}
                                  {e.roomdescription}
                                </div>
                              </TableCell>

                              <TableCell>
                                {e.maxpeople <= 2 ? (
                                  <div>
                                    <PeopleIcon
                                      fontSize="small"
                                      style={{ color: "black" }}
                                    />
                                    {e.maxpeople} Max People
                                  </div>
                                ) : (
                                  <div>
                                    <FamilyRestroomIcon
                                      fontSize="small"
                                      style={{ color: "black" }}
                                    />
                                    {e.maxpeople}
                                  </div>
                                )}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        )
                      );
                    })}
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>
                  <CurrencyRupeeOutlinedIcon
                    fontSize="large"
                    style={{ color: "gray" }}
                  />
                  {days *
                    hoteldetails.cheapestPrice *
                    user?.usersearchdetails?.options.room}
                </b>{" "}
                ({days} nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
      </div>

      {/* {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />} */}
    </div>
  );
};
export default Hoteldetails;
