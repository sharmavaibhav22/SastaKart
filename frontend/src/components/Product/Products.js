import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductCard from "../Home/ProductCard";
import { getProducts, clearErrors } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];


const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [ratings, setRatings] = useState(0);
  const [category, setCategory] = useState("");
  const {
    products,
    loading,
    errors,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  let { keyword } = useParams();
  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (errors) {
      alert.error(errors);
      dispatch(clearErrors());
    }
    dispatch(getProducts(keyword, currentPage, price, ratings, category));
  }, [dispatch, errors, alert, keyword, currentPage, price, ratings, category]);
  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${keyword}`} />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={1000000}
            />
            <Typography>Category</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings above</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider" 
              valueLabelDisplay="auto"
              min={0}
              max={5} 
              />
              </fieldset>

          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageitemActive"
                activeLinkClass="pagelinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
