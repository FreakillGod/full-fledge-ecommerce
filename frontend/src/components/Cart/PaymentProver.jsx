import { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layouts/MetaData";
import Typography from '@mui/material/Typography';
import { clearErrors } from "../../redux/actions/productAction";
// import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./payment.css";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

import { createOrder } from "../../redux/actions/orderAction";

const PaymentProvider = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const payBtn = useRef(null)
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const { shippingInfo, cartItems } = useSelector(state => state.cart)
    const { user } = useSelector(state => state.user)
    const { error } = useSelector(state => state.newOrder)

    console.log('shippingInfo, user, error', shippingInfo, user, error)

    useEffect(() => {
        if (error) {
            // alert.err 
            dispatch(clearErrors())
        }
    }, [error, dispatch])

    const order = {
        shippingInfo,
        orderItems: cartItems,
        // paymentInfo,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice) * 100,
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            };
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/payment/process`,
                paymentData,
                config
            );

            const client_secret = data.client_secret;
            if (!stripe | !elements) {
                return
            }

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false;

                // alert.error(errorz
                console.log('error', error)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    payBtn.current.disabled = true;

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }

                    dispatch(createOrder(order))

                    navigate("/order/success")
                } else {
                    // alert.error(errorz
                    console.log('error maybe with the bank ')
                }

            }

        } catch (error) {
            payBtn.current.disabled = false;
            console.log(error.response.data.message);
            // alert.error(error.response.data.message);
        }
    };

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm">
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ${orderInfo && orderInfo.totalPrice} ₹$`}
                        ref={payBtn}
                        className="paymentFormBtn"
                        onClick={submitHandler}
                    />
                </form>
            </div>
        </>
    );
};

export default PaymentProvider;
