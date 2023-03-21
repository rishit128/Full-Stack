import "./addroom.scss";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useSelector } from "react-redux";
import * as api from "../../api/index.js";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import * as Yup from "yup";
import DotLoader from "react-spinners/DotLoader";
import Errortoast from "../../components/Errortoast";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const Addroom = () => {
  const { hotels } = useSelector((state) => ({ ...state }));
  const [roommdetails, setroomdetails] = useState({
    hotelname: "",
    roomtitle: "",
    price: "",
    maxpeople: "",
  });
  const [Success, setSucess] = useState("");
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomdescription, setroomdescription] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setroomdetails({ ...roommdetails, [name]: value });
  };
  const addRoom = (e) => {
    const { name, value } = e.target;
    setRooms([value]);
  };
  const addroomdata = async () => {
    try {
      setSucess("");
      setLoading(true);
      const roomno = rooms[0].split(",").map((room) => ({ number: room }));
      var regex = /(<([^>]+)>)/gi;
      var description = roomdescription.replace(regex, "");
      const { data } = await api.createroom({
        ...roommdetails,
        roomno,
        description,
      });
      if (data && data.Success) {
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
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];
  const Roomvalidation = Yup.object({
    roomtitle: Yup.string().required("Room Title Is Required"),
    hotelname: Yup.string().required("Hotel Name Is required!"),
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
                  roomdescription: roomdescription,
                  price: roommdetails.price,
                  maxpeople: roommdetails.maxpeople,
                  roomtitle: roommdetails.roomtitle,
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
                      <label htmlFor="roomtitle">Room Title</label>
                      <Field
                        type="text"
                        id="roomtitle"
                        name="roomtitle"
                        onChange={handleChange}
                        placeholder="Enter Room Title"
                      />
                      {errors.roomtitle && touched.roomtitle ? (
                        <div style={{ color: "red" }}>{errors.roomtitle}</div>
                      ) : null}
                    </div>
                    <div className="formInput">
                      <label htmlFor="roomno"> Room Number</label>
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
                    <div>
                      <label htmlFor="roomdescription">Room description</label>
                      {/* <Field
                        style={{ width: "430px", height: "100px" }}
                        type="text"
                        as="textarea"
                        id="roomdescription"
                        name="roomdescription"
                        onChange={handleChange}
                        placeholder="Enter Your Room's Description"
                      /> */}
                      <ReactQuill
                        theme="snow"
                        id="roomdescription"
                        onChange={setroomdescription}
                        modules={modules}
                        formats={formats}
                        name="roomdescription"
                        placeholder="Enter Your Room's Description"
                      />
                      {errors.roomdescription && touched.roomdescription ? (
                        <div style={{ color: "red" }}>
                          {errors.roomdescription}
                        </div>
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
