import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {useContext} from 'react'
import {CartContext} from '../CartContext'

function Product(props) {
  
  const product=props.product;
  
  const [isAdding,setIsAdding]=useState(false);

  const {cart,setCart}=useContext(CartContext)

  const addToCart=(event,product)=>{
    event.preventDefault();

    let _cart = {...cart}

    if(!_cart.items){
      _cart.items={ };
      _cart.totalItems=0;
    }

    if(_cart.items[product._id]){
      _cart.items[product._id]+=1;
    }
    else{
      _cart.items[product._id]=1;
    }

    _cart.totalItems+=1;
    setCart(_cart);
    // console.log(isAdding);
    setIsAdding(true);
    setTimeout(()=>{setIsAdding(false)},600);
  }

  
  return (

    <Link to={`/product/${product._id}`}>
        <div className='text-center p-4 bg-zinc-100 w-1/2 sm:w-full '>
                <div >
                   <img src={product.image} alt='pizza'></img>
                </div>
                <h2 className='font-bold'>{product.name}</h2>
                <span className='bg-zinc-300 px-3 rounded-2xl'>{product.size}</span>
                <div className='flex justify-between'>
                    <h1 className='font-bold'>₹{product.price}</h1>
                    <button disabled={isAdding} onClick={(e)=>{addToCart(e,product)}} className={`${isAdding?'bg-green-500':'bg-orange-400 hover:bg-orange-500'}  font-bold text-slate-50 rounded-full px-3 py-0.5 hover:text-black `} > {isAdding?'Added': '+ Add'}</button>
                </div>
        </div>
    </Link>
  )
}

export default Product
