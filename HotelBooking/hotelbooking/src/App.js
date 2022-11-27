import { Routes, Route } from "react-router-dom";
import IndexRoutes from "./Routes/Indexoutes";
import NotLoggedInRoutes from "./Routes/NotLoggedInRoutes";
import UserRoutes from "./Routes/Userroutes";
import Login from "./Pages/login/login";
import Home from "./Pages/home/Home";
import Userhome from "./Pages/Users Pages/Userhome";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<IndexRoutes />}>
          <Route path="/" element={<Home />} exact />
        </Route>
        <Route element={<UserRoutes />}>
          <Route path="/user" element={<Userhome />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
