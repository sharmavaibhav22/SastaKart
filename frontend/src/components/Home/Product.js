import React from 'react'
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
const options = {
    size: 20,
    value: 4.5,
    edit: false,
    activeColor: "gold",
    isHalf: true
};
const Product = ({product}) => {
  return (
    <Link className='productCard' to={product._id}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
        <div>
            <ReactStars {...options}/> <span>(256 reviews)</span>
        </div>
        <span>{product.price}</span>
    </Link>
  )
}

export default Product
