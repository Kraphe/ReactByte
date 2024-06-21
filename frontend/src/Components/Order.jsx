import React, { useState, useEffect, useContext} from 'react';
import { CartContext } from '../CartContext';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const OrdersList = () => {
    const [orders, setOrders] = useState([]);
    useEffect( () => {     

                const userId=window.localStorage.getItem('userId')
                console.log(userId);
                const fetchOrders = async () => {
                const response = await axios.get(`${BACKEND_URL}/order/${userId}`);
                setOrders(response.data);
        };

        fetchOrders();
    }, []);
    // console.log(cart.userId);
    

    return (
        <div className="container mx-auto p-16">
            <h2 className="text-2xl font-bold mb-4">Orders</h2>
            <ul className="divide-y divide-gray-200">
                {orders.map(order => (
                    <li key={order._id} className="py-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-lg font-semibold">{order.userId}</p>
                                <p className="text-sm text-gray-600">Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                                <p className="text-sm text-gray-600">Total Items ordered: {order.totalItems}</p>
                            </div>
                            <ul className="mt-2">
                                {order.items.map(item => (
                                    <li key={item._id} className="text-sm text-gray-600">
                                        {item.itemId} : {item.quantity}
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
