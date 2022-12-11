import "./addroom.scss";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as api from "../../api/index.js";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import Errortoast from "../../components/Errortoast";
const Addroom = () => {
  const { hotels } = useSelector((state) => ({ ...state }));
  const [roommdetails, setroomdetails] = useState({
    hotelname: "",
    roomdescription: "",
    price: "",
    maxpeople: "",
  });
  const [Success, setSucess] = useState("");
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
    console.log(value);
    setroomdetails({ ...roommdetails, [name]: value });
  };
  const addRoom = (e) => {
    const { name, value } = e.target;
    console.log(name);
    setRooms([value]);
    console.log(rooms);
  };
  const addroomdata = async () => {
    try {
      setSucess("");
      setLoading(true);
      console.log(roommdetails);
      console.log(rooms);
      const roomno = rooms[0].split(",").map((room) => ({ number: room }));
      console.log("first");
      const { data } = await api.createroom({
        ...roommdetails,
        roomno,
      });
      console.log(data);
      if (data && data.Success) {
        console.log("first");
        setSucess(data.message);
      }

      setLoading(false);
      setroomdetails({
        ...roommdetails,
        hotelname: "",
        roomdescription: "",
        price: "",
        maxpeople: "",
      });
      setRooms([]);
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
    }
  };
  const Roomvalidation = Yup.object({
    hotelname: Yup.string().required("Hotel Name is required!"),
    roomno: Yup.array().min(1, "At least One Room Number Is Required"),
    roomdescription: Yup.string().required("Room Description Is required"),
    price: Yup.string().required("Room Price Is required"),
    maxpeople: Yup.string().required(
      "Please Mention Max People Allow In This Room "
    ),
  });
  return (
    <>
      <div className="new">
        <div className="newContainer">
          <div className="top">Add New Room</div>
          <div className="bottom">
            <div className="right">
              {Success && (
                <Errortoast
                  showstate={true}
                  message={Success}
                  severity="success"
                />
              )}
              {Error && (
                <Errortoast showstate={true} message={Error} severity="error" />
              )}
              <Formik
                enableReinitialize
                initialValues={{
                  hotelname: roommdetails.hotelname,
                  roomno: rooms,
                  roomdescription: roommdetails.roomdescription,
                  price: roommdetails.price,
                  maxpeople: roommdetails.maxpeople,
                }}
                validationSchema={Roomvalidation}
                onSubmit={() => {
                  addroomdata();
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="formInput">
                      <label>
                        Choose a hotel{" "}
                        <ArrowDropDownCircleIcon
                          style={{
                            color: "blue",
                          }}
                        />
                      </label>
                      <select
                        className="mt-2"
                        style={{ width: "200px" }}
                        id="hotelname"
                        name="hotelname"
                        onChange={handleChange}
                        value={roommdetails.hotelname}
                      >
                        <option value="" disabled>
                          Choose a Hotel ...
                        </option>
                        {hotels.Allhotels &&
                          hotels.Allhotels.map((hotel) => {
                            return (
                              <option key={hotel._id} value={hotel._id}>
                                {hotel.hotelname}
                              </option>
                            );
                          })}
                      </select>
                      {errors.hotelname && touched.hotelname ? (
                        <div style={{ color: "red" }}>{errors.hotelname}</div>
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label htmlFor="roomno"> Hotel Number</label>
                      <Field
                        type="text"
                        id="roomno"
                        name="roomno"
                        onChange={addRoom}
                        placeholder="Give Comma Between Room Numbers."
                      />
                      {errors.roomno && touched.roomno ? (
                        <div style={{ color: "red" }}>{errors.roomno}</div>
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label htmlFor="roomdescription">Room description</label>
                      <Field
                        style={{ width: "500px", height: "100px" }}
                        type="text"
                        as="textarea"
                        id="roomdescription"
                        name="roomdescription"
                        onChange={handleChange}
                        placeholder="Enter Your Room's Description"
                      />
                      {errors.roomdescription && touched.roomdescription ? (
                        <div style={{ color: "red" }}>
                          {errors.roomdescription}
                        </div>
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label htmlFor="price">Room Price</label>
                      <Field
                        type="number"
                        id="price"
                        name="price"
                        onChange={handleChange}
                        placeholder="Enter Your Room's Price"
                      />
                      {errors.price && touched.price ? (
                        <div style={{ color: "red" }}>{errors.price}</div>
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label htmlFor="maxpeople">
                        How Many People Allow In This Room
                      </label>

                      <Field
                        type="number"
                        id="maxpeople"
                        name="maxpeople"
                        onChange={handleChange}
                        placeholder="Enter Your Room's Max People Allow"
                      />
                      {errors.maxpeople && touched.maxpeople ? (
                        <div style={{ color: "red" }}>{errors.maxpeople}</div>
                      ) : null}
                    </div>
                    <button className="button">Add Room </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
      <div className="centered">
        <DotLoader color="#1876f2" loading={loading} size={30} />
      </div>
    </>
  );
};

export default Addroom;
