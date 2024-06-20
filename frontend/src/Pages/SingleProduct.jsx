import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'

function SingleProduct() {
    const [product, setProduct] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    // console.log(params)
    useEffect(() => {
       axios.get(`http://localhost:5000/api/product/${params.id}`)
       .then((res)=>{
        // console.log(res)
        setProduct(res.data)
       })
    }, [params._id]);


    return (
        <div className="ml-16 w-48 mt-12 ">
            <button className="mb-12 font-bold" onClick={ () => { navigate(-1)} }>Back</button>
            <div className="flex">
                <img src={ product.image } alt="pizza" />
                <div className="ml-16">
                    <h1 className="text-xl font-bold">{ product.name }</h1>
                    <div className="text-md">{ product.size }</div>
                    <div className="font-bold mt-2">₹ { product.price }</div>
                    <button className="bg-yellow-500 py-1 px-1 rounded-full font-bold mt-4"> Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default SingleProduct
