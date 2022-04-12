import AOS from 'aos'
import 'aos/dist/aos.css';
import React,{useState} from 'react'
import {Modal} from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { addTocart } from '../actions/cartActions'


export default function Pizza({pizza}) {
    AOS.init({
        
    })
  
    const [Quantity, setquantity] = useState(1)
    const [Varient, setvarient] = useState('small')
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();

    function addtocart()
    {
        dispatch(addTocart(pizza, Quantity , Varient))
        
        
    }
    return (
        
        <div data-aos='zoom-in' className="shadow-lg p-3 mb-5 bg-white rounded">
            <div onClick={handleShow}>
            <h1>{pizza.name}</h1>
            <img src={pizza.image} className="img-fluid" style={{height:'200px',widht:'200px'}}/>
            </div>
            
        
            <div className="flex-container">
            <div className='w-100 m-1'>
                <p>Varients</p>
                <select className='form-control' value={Varient} onChange={(e)=>{setvarient(e.target.value)}}>
                    {pizza.varients.map((varient)=>{
                        return <option >{varient}</option>
                    })}
                </select>
                
            </div>
            <div className='w-100'>
                <p>Quantity</p>
                <select className='form-control' value={Quantity} onChange={(e)=>{setquantity(e.target.value)}}>
                    {[...Array(10).keys()].map((x, i)=>{
                        return <option >{x+1}</option>
                    })}
                </select>
            </div>
            </div>
            <div >
                    <div className='m-1 w-100'>
                        <h1 className= "mt-1">Price:{pizza.prices[0][Varient] * Quantity} Rs/-</h1>

                    </div>

                    <div className='m-1 w-100'>
                        <button onClick={addtocart} className="btn">Add To Cart</button>
                        
                    </div>
            </div>
            <div className="flex-container">
                 <div className='m-1 w-100'>
                     {pizza.itm_qty>0?<h1 className= "mt-1">IN STOCK</h1>:<h1 className= "mt-1">OUT OF STOCK</h1>}
                        

                    </div>
                
            </div>

                        <Modal show={show}>
            <Modal.Header closeButton>
                <Modal.Title>{pizza.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img src={pizza.image} className="img-fluid" style={{height:'400px'}} 
                
               /> 
               <p>{pizza.description}</p>
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn">Close</button>
               
            </Modal.Footer>
            </Modal>
           
        </div>
    )
}

