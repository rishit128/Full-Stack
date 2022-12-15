import { Outlet } from "react-router-dom";
import Usernavbar from "../User Navbar/Usernavbar";
const Usermain = () => {
  return (
    <div>
      <Usernavbar />
      <Outlet />
    </div>
  );
};

export default Usermain;
