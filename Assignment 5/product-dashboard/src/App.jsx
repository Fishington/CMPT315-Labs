import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import OrderPage from "./pages/OrderPage";
import Orders from "./pages/Orders";

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Dashboard</Link>
        <Link to="/orders">Orders</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders/:id" element={<OrderPage />} />
        <Route path="/orders" element={<Orders />} />
      </Routes> 
    </Router>
  );
}

export default App;
