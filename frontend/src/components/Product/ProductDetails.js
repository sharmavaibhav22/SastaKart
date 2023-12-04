import React, { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  let { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const options = {
    size: 20,
    value: product.ratings,
    edit: false,
    activeColor: "gold",
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
    color: "rgba(20,20,20,0.1)",
  };
  return (
    <Fragment>
      <div className="productDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} slide`}
                />
              ))}
          </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Product # {product._id}</p>
          </div>
          <div className="detailsBlock-2">
            <ReactStars {...options} />
            <span>({product.numOfReviews} Reviews)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{product.price}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button>-</button>
                <input value="1" type="number" />
                <button>+</button>
              </div>
              {""}
              <button>Add to Cart</button>
            </div>
            <p>
              Status:{""}
              <b className={product.quantity < 1 ? "redColor" : "greenColor"}>
                {product.quantity < 1 ? "Out of Stock" : "In Stock"}
              </b>
            </p>
          </div>
          <div className="detailsBlock-4">
            <p>
              Description: <br />
              {product.description}
            </p>
          </div>
          <button className="submitReview">
                Submit Review
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
