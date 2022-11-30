import { useSelector } from "react-redux";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function Adminroutes() {
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.user.role);
  if (user.user?.role === "admin") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Adminroutes;
