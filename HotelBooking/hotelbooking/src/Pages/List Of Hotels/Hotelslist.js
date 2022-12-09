import Datatable from "../../components/Datatable/Datatable";
import { hotelColumns } from "../../config";
import React from "react";
import { useSelector } from "react-redux";

const HotelList = () => {
  const { hotels } = useSelector((state) => ({ ...state }));
  console.log(hotels);
  return (
    <div>
      <Datatable columns={hotelColumns} data={hotels.Allhotels} />
    </div>
  );
};

export default HotelList;
