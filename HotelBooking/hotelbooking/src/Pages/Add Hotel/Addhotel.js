import { useState } from "react";
import "./addhotel.scss";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import * as api from "../../api/index.js";
import "react-quill/dist/quill.snow.css";
const Addhotel = () => {
  const [files, setfiles] = useState("");
  const [formdetails, setformdetails] = useState({});
  const [description, setdesciption] = useState("");

  const handleChange = (e) => {
    setformdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log(formdetails);
  };
  const addhoteldata = async (e) => {
    console.log("hi");
    const { data } = await api.addhotel({
      ...formdetails,
      description,
    });
    console.log(data);
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
  const Hotelvalidation = Yup.object({
    hotelname: Yup.string().required("Hotel Name Is required").max(20),
    hoteltype: Yup.string().required("Hotel Type Is required"),
    address: Yup.string().required("Hotel Address Is required"),
    city: Yup.string().required("Please Mention Your Hotel is in which City "),
    distancefromairport: Yup.string().required(
      "Please Mention Your Hotel Distance from Airport"
    ),
    cheapestPrice: Yup.string().required(
      "Please Mention Your Hotel Starting Price of Room"
    ),
  });
  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">Add New Hotel</div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <Formik
              enableReinitialize
              initialValues={{
                hotelname: formdetails.hotelname,
                hoteltype: formdetails.hoteltype,
                address: formdetails.address,
                city: formdetails.city,
                cheapestPrice: formdetails.cheapestPrice,
                distancefromairport: formdetails.distancefromairport,
              }}
              validationSchema={Hotelvalidation}
              onSubmit={() => {
                addhoteldata();
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="formInput">
                    <label htmlFor="hotelname">Hotel Name</label>
                    <Field
                      type="text"
                      id="hotelname"
                      name="hotelname"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel Name"
                    />
                    {errors.hotelname && touched.hotelname ? (
                      <div style={{ color: "red" }}>{errors.hotelname}</div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlFor="hoteltype">Hotel Type</label>
                    <Field
                      type="text"
                      id="hoteltype"
                      name="hoteltype"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel Type"
                    />
                    {errors.hoteltype && touched.hoteltype ? (
                      <div style={{ color: "red" }}>{errors.hoteltype}</div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlFor="address">
                      Hotel Address :
                      <HomeOutlinedIcon fontSize="medium" color="primary" />
                    </label>
                    <Field
                      type="text"
                      id="address"
                      name="address"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel Address"
                    />
                    {errors.address && touched.address ? (
                      <div style={{ color: "red" }}>{errors.address}</div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlFor="city">
                      Hotel in Which City :
                      <LocationCityOutlinedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    </label>
                    <Field
                      type="text"
                      id="city"
                      name="city"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel is in which City"
                    />
                    {errors.city && touched.city ? (
                      <div style={{ color: "red" }}>{errors.city}</div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlFor="distancefromairport">
                      Hotel Distance From Airport :
                      <FlightOutlinedIcon color="primary" fontSize="medium" />
                    </label>
                    <Field
                      type="number"
                      id="distancefromairport"
                      name="distancefromairport"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel Distance From Airport"
                    />
                    {errors.distancefromairport &&
                    touched.distancefromairport ? (
                      <div style={{ color: "red" }}>
                        {errors.distancefromairport}
                      </div>
                    ) : null}
                  </div>
                  <div className="formInput">
                    <label htmlFor="file">
                      Hotel Images:
                      <DriveFolderUploadOutlinedIcon className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      multiple
                      onChange={(e) => setfiles(e.target.files)}
                      style={{ display: "none" }}
                    />
                  </div>
                  <div className="formInput">
                    <label htmlFor="cheapestPrice">
                      Starting Price of Room :
                      <CurrencyRupeeIcon color="primary" fontSize="medium" />
                    </label>
                    <Field
                      type="number"
                      id="cheapestPrice"
                      name="cheapestPrice"
                      onChange={handleChange}
                      placeholder="Enter Your Hotel Room Starting Price"
                    />
                    {errors.cheapestPrice && touched.cheapestPrice ? (
                      <div style={{ color: "red" }}>{errors.cheapestPrice}</div>
                    ) : null}
                  </div>
                  <div>
                    <label>
                      Hotel Description :
                      <DescriptionOutlinedIcon
                        color="primary"
                        fontSize="medium"
                      />
                    </label>
                    <ReactQuill
                      theme="snow"
                      onChange={setdesciption}
                      modules={modules}
                      formats={formats}
                      placeholder="Enter Your Details/Description Here"
                    />
                  </div>

                  <button>Save Product</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Addhotel;