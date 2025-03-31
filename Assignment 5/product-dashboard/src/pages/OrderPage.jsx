import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    axios.get(`http://localhost:5000/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleOrder = () => {
    axios.post("http://localhost:5000/orders", {
      productId: id,
      quantity,
      emailId: email,
      deliveryDate: date,
    })
    .then(() => navigate("/orders"))
    .catch(err => alert(err.response.data.message));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Available Stock: {product.stock}</p>
      
      <input type="number" min="1" max={product.stock}
        value={quantity} onChange={(e) => setQuantity(e.target.value)}
        className="border p-2 mt-2"
      />
      <input type="email" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mt-2 w-full"
      />
      <input type="date"
        value={date} onChange={(e) => setDate(e.target.value)}
        className="border p-2 mt-2 w-full"
      />

      <button onClick={handleOrder} 
        className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Confirm Order
      </button>
    </div>
  );
};

export default OrderPage;
