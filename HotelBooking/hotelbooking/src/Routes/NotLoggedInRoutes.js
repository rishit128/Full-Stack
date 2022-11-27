import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NotLoggedInRoutes() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);
  return user.user ? <Navigate to="/" /> : <Outlet />;
}
