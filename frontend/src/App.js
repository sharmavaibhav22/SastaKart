import './App.css';
import Header from './components/layout/Header/Header.js';
import Footer from './components/layout/Footer/Footer.js';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home/Home.js'; 
import ProductDetails from './components/Product/ProductDetails.js';
function App() {
  return (
    <Router>
    <Header />
    <Routes>
    <Route exact path='/' Component={Home}/>
    <Route exact path='/product/:id' Component={ProductDetails}/>

    </Routes>
    <Footer/>
    </Router>
  );
}

export default App;
