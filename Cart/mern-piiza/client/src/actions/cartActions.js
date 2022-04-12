export const addTocart=(pizza , Quantity , Varient)=>(dispatch , getState)=>{
   
  
    var cartItem = {
        name:pizza.name,
        _id : pizza._id,
        image : pizza.image,
        varient : Varient ,
        quantity : Number(Quantity) ,
        prices : pizza.prices ,
        price : pizza.prices[0][Varient]* Quantity,
        itm_qty:pizza.itm_qty

    }
    if(cartItem.quantity>pizza.itm_qty)
    {
        alert('Out of Stock')
    }
    else{
        if(cartItem.quantity<1)
        {
      
            dispatch({type:'DELETE_FROM_CART' , payload:{pizza,Quantity}})
          
        }
        else{
            dispatch({type:'ADD_TO_CART', payload : cartItem})


        }


      
    }
    
    
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems) )
}

export const deleteFromcart=(pizza)=>(dispatch,getState)=>{
    dispatch({type:'DELETE_FROM_CART' , payload:pizza})
    const cartItems = getState().cartReducer.cartItems
    localStorage.setItem('cartItems' , JSON.stringify(cartItems) )

}