import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css';
import Product from './Product.js';
import MetaData from '../layout/MetaData.js';
const product = {
    name: "Nike Shoes",
    price: 10000,
    _id:"vaibhav",
    images: [{url:"https://i.ibb.co/DRST11n/1.webp"}],
};
const Home = () => {
  return (
    <Fragment>
        <MetaData title={'Home Page'} />
        <div className="banner">
            <p>
                Welcome to Ecommerce
            </p>
            <h1>
                Find Amazing Products below
            </h1>
            <a href="#container">
                <button>
                    Scroll <CgMouse/>
                    </button>
            </a>
        </div>
        <h2 className="homeHeading">
            Featured Products
        </h2>
        <div className="container" id="container">
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />
            <Product product={product} />

        </div>
    </Fragment>
  )
  };

export default Home
