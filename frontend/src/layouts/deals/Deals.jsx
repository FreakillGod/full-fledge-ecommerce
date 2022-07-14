import React, { useEffect } from 'react'
import ProductCard from './ProductCard'
import './deals.css'
import { getProduct } from '../../redux/actions/productAction'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import Loader from '../../layouts/Loader/Loader'

const Deals = () => {
    const { loading, error, products, productsCount } = useSelector(state => state.products)
    console.log(products)
    return (
        <>
            <h3 className="heading-tertiary u-margin-bottom-small u-center-text u-margin-top-medium">
                Join our Exclusive PRO membership to get access to the premium deals
            </h3>
            {loading ? <Loader /> :
                <div className='deals' id='Todays-deals'>
                    {products && products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            }
        </>
    )
}

export default Deals