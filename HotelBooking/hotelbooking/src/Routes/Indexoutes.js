import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Login from "../Pages/login/login";
export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  if (user.user) {
    console.log("if");
    if (user.user?.role === "admin") {
      return <Outlet />;
    } else {
      return <Navigate to="/user" />;
    }
  } else {
    console.log("else");
    return <Login />;
  }
}
