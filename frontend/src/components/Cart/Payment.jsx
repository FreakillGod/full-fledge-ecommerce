import React from 'react'
import PaymentProvider from "./PaymentProver"
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const Payment = ({stkey}) => {
    console.log('stkey', stkey)
  return (
    <Elements  stripe={loadStripe(stkey)}>
        <PaymentProvider/>
    </Elements>
  )
}

export default Payment