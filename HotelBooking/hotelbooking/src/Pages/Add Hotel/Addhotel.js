import { useState } from "react";
import "./addhotel.scss";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FlightOutlinedIcon from "@mui/icons-material/FlightOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Addhotel = () => {
  const [files, setfiles] = useState("");
  const [formdetails, setformdetails] = useState({});
  const [description, setdesciption] = useState("");
  const handleChange = (e) => {
    setformdetails((prev) => ({ ...prev, [e.target.id]: e.target.value }));
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
            <form>
              <div className="formInput">
                <label htmlFor="name">Hotel Name</label>
                <input
                  type="text"
                  id="name"
                  onChange={handleChange}
                  placeholder="Enter Your Hotel Name"
                />
              </div>
              <div className="formInput">
                <label htmlFor="type">Hotel Type</label>
                <input
                  type="text"
                  id="type"
                  onChange={handleChange}
                  placeholder="Enter Your Hotel Type"
                />
              </div>
              <div className="formInput">
                <label htmlFor="address">
                  Hotel Address :
                  <HomeOutlinedIcon fontSize="medium" color="primary" />
                </label>
                <input
                  type="text"
                  id="address"
                  onChange={handleChange}
                  placeholder="Enter Your Hotel Address"
                />
              </div>
              <div className="formInput">
                <label htmlFor="city">
                  Hotel in Which City :
                  <LocationCityOutlinedIcon color="primary" fontSize="medium" />
                </label>
                <input
                  type="text"
                  id="city"
                  onChange={handleChange}
                  placeholder="Enter Your Hotel is in which City"
                />
              </div>
              <div className="formInput">
                <label htmlFor="distancefromairport">
                  Hotel Distance From Airport :
                  <FlightOutlinedIcon color="primary" fontSize="medium" />
                </label>
                <input
                  type="text"
                  id="distancefromairport"
                  onChange={handleChange}
                  placeholder="Enter Your Hotel Distance From Airport"
                />
              </div>
              <div className="desc">
                <label htmlFor="desc">
                  Hotel Description :
                  <DescriptionOutlinedIcon color="primary" fontSize="medium" />
                </label>
                <ReactQuill
                  theme="snow"
                  onChange={setdesciption}
                  modules={modules}
                  formats={formats}
                />
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Addhotel;
