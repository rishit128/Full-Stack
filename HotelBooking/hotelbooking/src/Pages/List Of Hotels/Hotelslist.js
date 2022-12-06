import Datatable from "../../components/Datatable/Datatable";
import { hotelColumns } from "../../config";
import * as api from "../../api/index.js";
import React, { useEffect, useState } from "react";
const HotelList = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await api.hotelList();
      setData(data);
      console.log(data);
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Datatable columns={hotelColumns} data={data} />
    </div>
  );
};

export default HotelList;
