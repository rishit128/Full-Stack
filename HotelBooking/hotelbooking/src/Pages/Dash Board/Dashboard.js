import "./dashboard.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as api from "../../api/index.js";
import Widget from "../../components/widget/Widget";
import { hotelsdata } from "../../Store/hotel/hotelSlice.js";
const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchdata = async () => {
      const { data } = await api.hotelList();
      const roomsdata = await api.roomlist();
      console.log(roomsdata);
      dispatch(hotelsdata(data));
    };
    fetchdata();
  }, [dispatch]);
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="hotels" />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
