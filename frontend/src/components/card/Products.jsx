import React, { useEffect, useState } from 'react'
import './products.css'
import ProductCard from '../../layouts/deals/ProductCard'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { clearErrors, getProduct } from '../../redux/actions/productAction'
import Loader from '../../layouts/Loader/Loader'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import MetaData from '../../layouts/MetaData'

const categories = [
  "laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Card = () => {
  const dispatch = useDispatch()

  const { keyword } = useParams()

  const { loading, error, products, productsCount, resultPerPage , productsfilteredProductsCount} = useSelector(state => state.products)
  const data = useSelector(state => state.products)
  console.log('data', data)

  const [currentPage, setCurrentPage] = useState(1);
  const [price,setPrice]= useState([0, 25000])
  const [category, setCategory] = useState(null);
  const [ratings, setRatings] = useState(0);


  const priceHandler=(e,newPrice)=>{
    console.log(e, newPrice)
    setPrice(newPrice);
  }

  const setCurrentPageNo = (e) => {
    console.log(e)
    setCurrentPage(e)
  }

  useEffect(() => {
    if(error){
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, keyword, currentPage, price, category, ratings, error])

  console.log(products)
  return (
    <>
    <MetaData title="Your Products" />
    <div className='card-container'>
      <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
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
              <Typography component="legend">Ratings Above</Typography>
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
      <div>
        <h2>Products</h2>
        {loading ? <Loader /> : (
          <>
            <div className='cards'>
              {products && products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* {resultPerPage < productsCount && ( */}
              <div className='paginationBox'>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
            {/* )} */}
          </>
        )}

      </div>
    </div>
    </>
  )
}

export default Card