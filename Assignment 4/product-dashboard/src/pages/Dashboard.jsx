import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stock}</p>
            <Link to={`/order/${product._id}`}>
              <button 
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                disabled={product.stock === 0}
              >
                Order
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
