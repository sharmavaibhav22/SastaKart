import React, { useState, Fragment } from "react";
import "./Search.css";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchHandler}>
        <input
          type="text"
          placeholder="Search for Products"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="Submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
