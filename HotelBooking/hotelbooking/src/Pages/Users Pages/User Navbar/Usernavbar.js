import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Usernavbar.css";
const Usernavbar = () => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return (
    <div className="usernavbar">
      <div className="usernavContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Booking</span>
        </Link>
        {user && user.user.name.toUpperCase()}
      </div>
    </div>
  );
};
export default Usernavbar;
