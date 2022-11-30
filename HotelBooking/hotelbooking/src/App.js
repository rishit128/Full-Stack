import { Routes, Route } from "react-router-dom";
import IndexRoutes from "./Routes/Indexoutes";
import NotLoggedInRoutes from "./Routes/NotLoggedInRoutes";
import Adminroutes from "./Routes/Adminroutes";
import Login from "./Pages/login/login";
import Home from "./Pages/home/Home";
import Userhome from "./Pages/Users Pages/Userhome";
function App() {
  return (
    <div>
      <Routes>
        <Route element={<IndexRoutes />}>
          <Route path="/" exact />
        </Route>
        <Route path="/user" element={<Userhome />} exact />
        <Route element={<Adminroutes />}>
          <Route path="/admin" element={<Home />}>
            <Route path="hotels" element={<Userhome />} />
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
