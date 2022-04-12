import React from 'react'
import Stripecheckout from 'react-stripe-checkout'
import { useDispatch , useSelector } from 'react-redux'



function Checkout({subtotal}) {
    const dispatch = useDispatch();
  
    function tokenHandler(token)
    {
    
 
    }
    return (
        <div>
             
            <Stripecheckout
            amount={subtotal*100}
            shippingAddress
            token={tokenHandler}
            stripeKey='pk_test_51KF21tKc3WQso7rnt5AKyTiIQGe0p2QHBe7IxyUlOiWyI3MO9cFXZxmiD5oCuoiuANfiFhh2HXCkNN1IImJsybCh00W9HZ5a27'
            currency='INR'
            >
                <button className='btn'>Pay Now</button>
            </Stripecheckout>
        </div>
    )
}

export default Checkout
