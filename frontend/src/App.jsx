import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Components/Navbar';
import ProductsPage from './Pages/ProductsPage';
import Cart from './Pages/Cart';
import SingleProduct from './Pages/SingleProduct';
import Order from './Components/Order';
import { CartContext } from './CartContext';
import {TokenContext} from './TokenContext'
import { useState,useEffect } from 'react';
import Registration from './Pages/Register';
import Login from './Pages/Login'

function App() {

  const [cart,setCart]=useState({}) 
  const [token,setToken]=useState({}); 
  useEffect(()=>{
    const cartData=window.localStorage.getItem('cart')
    const tokenData=window.localStorage.getItem('token')
    // console.log(token);
    if(tokenData)
    setToken(JSON.parse(tokenData));
    
    if(cartData)
    setCart(JSON.parse(cartData));
   
  },[]);

  useEffect(() => {
    if (token && Object.keys(token).length > 0) {
        window.localStorage.setItem('token', JSON.stringify(token));
    }
}, [token]);


  useEffect(()=>{
   if(cart.items)
    window.localStorage.setItem('cart',JSON.stringify(cart));
  },[cart])
  

  return (
    <>
        
        <BrowserRouter>
        <CartContext.Provider value ={{cart,setCart}}>
           <TokenContext.Provider value={{token,setToken}}>
            <Navbar/>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" exact element={<ProductsPage />} />
                <Route path="/product/:id"  element={<SingleProduct/>}/>
                <Route path="/cart" element={<Cart/>} />
                <Route path="/register" element={<Registration/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/order" element={<Order/>}/>
              </Routes>
            </TokenContext.Provider> 
        </CartContext.Provider>
        </BrowserRouter>
    </>
  );
}

export default App
