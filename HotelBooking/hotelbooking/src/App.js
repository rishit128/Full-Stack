import { Routes, Route } from "react-router-dom";
import IndexRoutes from "./Routes/Indexoutes";
import NotLoggedInRoutes from "./Routes/NotLoggedInRoutes";
import Adminroutes from "./Routes/AdminRoutes";
import Login from "./Pages/login/login";
import Home from "./Pages/home/Home";
import Userhome from "./Pages/Users Pages/Home/Userhome";
import Addhotel from "./Pages/Add Hotel/Addhotel";
import Dashboard from "./Pages/Dash Board/Dashboard";
import HotelList from "./Pages/List Of Hotels/Hotelslist";
import Addrom from "./Pages/Add Room/Addroom";
import DestinationhotelList from "./Pages/Users Pages/HotelList by Destination/HotelList";
import Usermain from "./Pages/Users Pages/Default Page/Usermain";
import HotelDetails from "./Pages/Users Pages/Hotel Details/Hoteldetails";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<IndexRoutes />}>
          <Route path="/" exact />
        </Route>
        <Route path="/user" element={<Usermain />} exact>
          <Route path="Home" element={<Userhome />} />
          <Route
            path="Destinationhotelist"
            element={<DestinationhotelList />}
          />
          <Route path="hotels/:id" element={<HotelDetails />} />
        </Route>

        <Route element={<Adminroutes />}>
          <Route path="/admin" element={<Home />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addhotel" element={<Addhotel />} />
            <Route path="hotelList" element={<HotelList />} />
            <Route path="addroom" element={<Addrom />} />
          </Route>
        </Route>

        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
