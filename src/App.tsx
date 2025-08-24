import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import ProductList from "./pages/ProductList/ProductList";
import ProductRegistration from "./pages/ProductRegistration/ProductRegistration";
import UserRegistration from "./pages/UserRegistration/UserRegistration";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/add-product" element={<ProductRegistration />} />
      <Route path="/signup" element={<UserRegistration />} />
    </Routes>
  );
};

export default App;
