import React, { useContext,useState,useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenContext } from '../TokenContext';
import { useNavigate, useLocation } from "react-router-dom";
import {CartContext} from '../CartContext'

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [msg, setMsg] = useState("");
  const { token, setToken } = useContext(TokenContext);
  const { cart, setCart } = useContext(CartContext);

   
  useEffect(()=>{

    // console.log(window.localStorage.getItem('userId'))
    if(window.localStorage.getItem('userId'))
      {
        navigate('/');
      }
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      toast.success('Login successful');

      const temp_token= response.data.refresh_token;
      setToken(temp_token);
      let _cart = {...cart};
      setCart(_cart);
      window.localStorage.removeItem('cart');
      window.localStorage.setItem('userId',formData.email);
      console.log(token);
      setTimeout(() => {
        navigate('/');
      }, 1000);
      // You may redirect the user to another page after successful registration
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
      setMsg(error.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
          <h1 className="text-red-500 text-center">{msg}</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
         
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-4"
          />
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4"
          >
            Register
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
