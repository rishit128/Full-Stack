import { useSelector } from "react-redux";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
function Userroutes() {
  const { user } = useSelector((state) => ({ ...state }));
  if (user.user?.role === "user") {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
}

export default Userroutes;
