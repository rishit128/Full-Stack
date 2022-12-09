import "./addroom.scss";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import * as Yup from "yup";
const Addroom = () => {
  const { hotels } = useSelector((state) => ({ ...state }));
  const [roommdetails, setroomdetails] = useState({});
  const handleChange = (e) => {
    setroomdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(roommdetails);
  };
  const Hotelvalidation = Yup.object({
    roomno: Yup.string().required("Room Number Is required"),
    roomdescription: Yup.string().required("Room Description Is required"),
    price: Yup.string().required("Room Price Is required"),
    maxpeople: Yup.string().required(
      "Please Mention Max People Allow In This Room "
    ),
  });
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">Add New Room</div>
        <div className="bottom">
          <div className="right">
            <Formik
              enableReinitialize
              initialValues={{
                roomno: roommdetails.roomno,
                roomdescription: roommdetails.roommdetails,
                price: roommdetails.price,
                maxpeople: roommdetails.maxpeople,
              }}
              validationSchema={Hotelvalidation}
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
                    <Field as="select" style={{ width: "200px" }}>
                      {hotels.Allhotels &&
                        hotels.Allhotels.map((hotel) => {
                          return (
                            <option key={hotel._id} value={hotel._id}>
                              {hotel.hotelname}
                            </option>
                          );
                        })}
                    </Field>
                  </div>
                  <div className="formInput">
                    <label htmlFor="roomno"> Hotel Number</label>
                    <Field
                      type="text"
                      id="roomno"
                      name="roomno"
                      onChange={handleChange}
                      placeholder="Give Comma Between Room Numbers."
                    />
                    {errors.roomno && touched.roomno ? (
                      <div style={{ color: "red" }}>{errors.roomno}</div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlfor="roomdescription">Room description</label>
                    <Field
                      style={{ width: "500px", height: "100px" }}
                      type="text"
                      as="textarea"
                      id="roomdescription"
                      name="roomdescription"
                      onChange={handleChange}
                      placeholder="Enter Your Room's Description"
                    />
                  </div>
                  <div className="formInput">
                    <label htmlfor="price">Room description</label>
                    <Field
                      type="text"
                      id="price"
                      name="price"
                      onChange={handleChange}
                      placeholder="Enter Your Room's Price"
                    />
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
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addroom;
