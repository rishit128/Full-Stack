import React from "react";
import "./home.css";
import { Outlet } from "react-router-dom";
import Header from "../User Navbar/Header";
import Propertylist from "../../../components/Propertylist/Propertylist";
function Userhome() {
  return (
    <div>
      <Header />
      <div className="userhomeContainer">
        <h1 className="userhomeTitle">Browse by property type</h1>
        <Propertylist />
        <h1 className="userhomeTitle">Homes guests love</h1>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Userhome;
