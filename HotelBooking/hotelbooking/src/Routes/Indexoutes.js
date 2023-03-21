import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Login from "../Pages/login/login";
export default function LoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  if (user.user) {
    if (user.user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/user/home" />;
    }
  } else {
    return <Login />;
  }
}
