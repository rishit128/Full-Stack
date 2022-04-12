import logo from './logo.svg';
import './App.css';
import bootstrap from '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'
import Navbar from './components/Nabvar';
import Homescreen from './screens/Homescreen';
import Cartscreen from './screens/Cartscreen';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function App() {
  return (
  
  <Router>
     <div className="App">
       <Navbar/>
 
    <Routes>
   
    <Route path='/' element={<Homescreen />} />
    <Route path='/cart' element={<Cartscreen />} />
   
                
  

    </Routes>


  </div>

  </Router>
 

  
    
  );
}

export default App;
