import "./App.css";
import Header from "./components/layout/Header/Header.js";
import Footer from "./components/layout/Footer/Footer.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home.js";
import ProductDetails from "./components/Product/ProductDetails.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import Login from "./components/User/Login.js"
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" Component={Home} />
        <Route exact path="/product/:id" Component={ProductDetails} />
        <Route exact path="/products" Component={Products} />
        <Route path="/products/:keyword" Component={Products} /> 
        {/* this is for
        search bar, when we search for a product, it will redirect to
        '/products/:keyword */}
        <Route exact path="/search" Component={Search} />
        <Route exact path="/login" Component={Login} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
