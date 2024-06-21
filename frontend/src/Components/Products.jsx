import React, { useState,useEffect, useContext } from 'react'
import Product from './Product'
import axios from 'axios'
import { BACKEND_URL } from '../../config';


function Products() {

  const [products,setproducts]=useState([]);


  useEffect(()=>{
    axios.get(`${BACKEND_URL}/product`)
    .then((res)=>{
      // console.log(res.data);
      setproducts(res.data);
    }).catch((error) => {
      console.error('Error fetching products:', error);
    })

  },[])


  return (
    <div className='px-10'>
        
        <h1 className='font-bold text-2xl text-zinc-600'>Products</h1>
          <div  className=' grid  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-24'>
          {
               products.map((product)=> <Product key={product._id} product={product}/>
               )
          }
          </div>
    </div>
  )
}

export default Products
