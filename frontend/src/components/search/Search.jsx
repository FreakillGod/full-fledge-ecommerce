import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './search.css'

const Search = () => {
    const navigate= useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSubmit=(e)=>{
    e.preventDefault()

    if(keyword.trim()){
        navigate(`/products/${keyword}`)
    }

  }
  return (
    <Fragment>
      <form className="searchBox" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search here..."
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
