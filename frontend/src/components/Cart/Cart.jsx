import React from 'react'
import CartItemCard from './CartItemCard.jsx'
import "./Cart.css";
import { useSelector, useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsfromCart } from '../../redux/actions/cartActions.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate= useNavigate()
    
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    console.log('cartItems', cartItems)

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return;
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return;
        dispatch(addItemsToCart(id, newQty))
    }

    const deleteCartItems = (id) => {
        dispatch(removeItemsfromCart(id))
    }

    const checkOutHandler=()=>{
        navigate("/login?redirect=shipping")
    }

    return (
        <>
           {cartItems.length===0?(
            <div className='emptyCart'>
                <h2>No product in Your Cart</h2>
                <Link to={"/products"}>Add Products</Link>
            </div>
           ):(
            <div className="cartPage">
            <div className="cartHeader">
                <p>Product</p>
                <p>Quantity</p>
                <p>Subtotal</p>
            </div>

            {cartItems &&
                cartItems.map((item) => (
                    <div className="cartContainer" key={item.product}>
                        <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                        <div className="cartInput">
                            <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
                                -
                            </button>
                            <input type="number" value={item.quantity} readOnly />
                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                                +
                            </button>
                        </div>
                        <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                    </div>
                ))}

            <div className="cartGrossProfit">
                <div></div>
                <div className="cartGrossProfitBox">
                    <p>Gross Total</p>
                    <p>{cartItems.reduce((acc,item)=>acc+item.quantity*item.price,0)}</p>
                </div>
                <div></div>
                <div className="checkOutBtn">
                    <button onClick={checkOutHandler} >Check Out</button>
                </div>
            </div>
        </div>
           )}
        </>
    )
}

export default Cart