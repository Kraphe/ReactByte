import React from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../CartContext';
import {useContext} from 'react'
import { TokenContext } from '../TokenContext';
import axios from 'axios'


function Navbar() {

  const {cart,setCart}=useContext(CartContext)
  const { token, setToken } = useContext(TokenContext);
  const requestBody = {
    refresh_token: token
  };

  async function logOut(){
    try{
      const response = await axios.post('http://localhost:5000/api/logout',requestBody);
      console.log(response);
      setToken({});
      setCart({});
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('cart');
      window.localStorage.removeItem('userId');

      // console.log(token);
    }
    catch(err){
      console.log(err)
    }
  }

  return (
   <nav className='px-10 flex items-center justify-between py-4 '>
    <Link to='/'>
      <img className='h-12' alt="logo" src='/images/logo.png'></img>
    </Link>

    <ul  className='flex'>
      <li className='mt-3'><Link to='/'>Home</Link></li>
      <li className='mt-3 ml-4'><Link to='/products'>Products</Link></li>
      {
            token.length? 
            <> 
                 <Link to='/order'><li className='mt-3 ml-4'>My Order</li></Link>
                <li className='mt-3 ml-4'><button onClick={()=>{logOut()}}>Logout</button></li>
            </>
            :
            <>
                <Link to='/register'> <li className='mt-3 ml-4'>Register</li></Link>
                <Link to='/login'> <li className='mt-3 ml-4'>Login</li></Link>
            </>

      }
      <li>
        <Link to='/cart'>
          <div className='bg-orange-400 flex ml-4 p-2 rounded-full hover:bg-orange-500 '>
            <span className='font-semibold mr-1 text-xl text-slate-600'>{cart.totalItems}</span>
            <img alt="cart-icon" src='/images/cart.png'></img>
            
          </div>
        </Link>
      </li>
    </ul>

   </nav>
  );
}

export default Navbar;
