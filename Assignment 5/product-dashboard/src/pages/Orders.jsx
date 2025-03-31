import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1>Orders</h1>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Email ID</th>
            <th className="px-4 py-2">Product</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border">
              <td className="p-2 border">{order.emailId}</td>
              <td className="p-2 border">{order.product ? order.product.name : 'N/A'}</td>
              <td className="p-2 border">{order.quantity}</td>
              <td className="p-2 border">{order.deliveryDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;