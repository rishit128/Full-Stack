import "./widget.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link } from "react-router-dom";
const Widget = ({ type }) => {
  let data;
  switch (type) {
    case "hotels":
      data = {
        title: "HOTELS",
        link: "See all Hotels",
        to: "/admin/hotelList",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="link">
          <Link to={data.to} style={{ textDecoration: "none" }}>
            {data.link}
          </Link>
        </span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};
export default Widget;
