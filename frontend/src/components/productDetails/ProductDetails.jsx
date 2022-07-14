import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useParams } from 'react-router-dom'

import './productDetails.css'

import pro1 from '../../assets/img/pro1.jpg'
import pro2 from '../../assets/img/pro2.jpg'
import pro3 from '../../assets/img/pro3.jpg'
import { clearErrors, getProductDetails } from '../../redux/actions/productAction';
import Loader from '../../layouts/Loader/Loader';
import ReviewCard from '../review/ReviewCard'
import { addItemsToCart } from '../../redux/actions/cartActions'

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { id } = useParams();

    const [quantity, setQuantity] = useState(0)

    const addtoCartHandler=()=>{
        dispatch(addItemsToCart(id,quantity))
        //alert item added to cart
        console.log('item added to cart')
    }

    const { product, loading, error } = useSelector((state) => state.productDetails)

    useEffect(() => {

        if (error) {
            dispatch(clearErrors())
        }

        dispatch(getProductDetails(id))
    }, [error])

    const handleChange = (e) => {

    }

    if (loading === undefined) return <Loader />

    return (<>
        {loading ? <Loader /> :
            (<>
                <div className='ProductDetails'>
                    {/* <div className='ProductDetails-container'> */}
                    <div className='product-carousel'>
                        <Carousel>
                            <div className='image-wrapper'>
                                <img src={pro1} className="product-images" />
                                {/* <p className="legend">front 1</p> */}
                            </div>
                            <div className='image-wrapper'>
                                <img src={pro2} className="product-images" />
                                {/* <p className="legend">back 2</p> */}
                            </div>
                            <div className='image-wrapper'>
                                <img src={pro3} className="product-images" />
                                {/* <p className="legend">side 3</p> */}
                            </div>
                        </Carousel>
                    </div>
                    <div className='product-details'>
                        <div className='product-details-name'>
                            <p>Verified </p>
                            <h2> {product.name}</h2>
                        </div>
                        <div className='product-details-status'>Status &nbsp;
                            <b className={product.Stock < 1 ? "color-red" : "color-green"}>
                                {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                        </div>
                        <div className='product-details-rating'>
                            <p>Rating </p>
                            <h2> {product.ratings}</h2>
                        </div>
                        <div className='product-details-price'>
                            <h2>Rs {product.price}</h2>
                        </div>
                        <div className='product-details-btn'>
                            <button onClick={() => setQuantity(prev => prev < 1 ? 0 : prev - 1)}>-</button>
                            <input readOnly onChange={(e) => handleChange(e)} value={quantity} type="number" />
                            <button onClick={() => setQuantity(prev => prev >= product.Stock ? prev : prev + 1)}>+</button>
                        </div>
                        <div className='product-details-addToCart'>
                            <button onClick={addtoCartHandler}>Add to Cart</button>
                        </div>
                        <div className='product-details-description'>
                            <b>Description</b> : <p>{product.description}</p>
                        </div>

                        <button className='btn-review'>Add Review</button>

                    </div>

                    {/* </div> */}
                </div>
                <div className='product-reviews'>
                    Product Reviews
                    <div>
                        {product.reviews && product.reviews[0] ?
                            product.reviews.map((review) => <ReviewCard review={review} />)
                            :
                            <div>No Reviews Yet</div>
                        }
                    </div>
                </div>
            </>)
        }
    </>
    )
}

export default ProductDetails