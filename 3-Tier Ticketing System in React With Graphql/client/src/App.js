
import './App.css';
import { BrowserRouter as Router, Routes, Route,Navigate  } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import SignUpForm from './components/Forms/SignUpForm';
import Home from './components/Home/Home';
import SignInForm from './components/Forms/SignInForm';
import Dashboard from './components/Dashboard/Dashboard';
import Filter from './components/Dashboard/Filter'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Routes>
        <Route path="/" element={!user ? <Home/> : <Navigate to="/home" />}/>
        <Route path="/signin" element={<SignInForm/>}></Route>
        <Route path="/signUp" element={<SignUpForm />}></Route>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/filter" element={<Filter/>}></Route>
        <Route path="/tickets/search" element={<Filter/>}></Route>
        </Routes>
      </Router>
      
    
    </div>
  );
}

export default App;
