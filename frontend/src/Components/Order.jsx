import React, { useState, useEffect,useContext } from 'react';
import { CartContext } from '../CartContext';
import axios from 'axios';
const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    const {cart}=useContext(CartContext);
    useEffect( () => {     

                console.log();
                const fetchOrders = async () => {
                const response = await axios.get(`http://localhost:5000/api/order/${cart.userId}`);
                setOrders(response.data);
          
        };

        fetchOrders();
    }, []);
    // console.log(cart.userId);
    

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <ul className="divide-y divide-gray-200">
                {orders.map(order => (
                    <li key={order._id} className="py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">{order.userId}</p>
                                <p className="text-sm text-gray-600">Creation Date: {new Date(order.createdAt).toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Total Items: {order.totalItems}</p>
                            </div>
                            <ul className="mt-2">
                                {order.items.map(item => (
                                    <li key={item._id} className="text-sm text-gray-600">
                                        {item.itemId}: {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrdersList;