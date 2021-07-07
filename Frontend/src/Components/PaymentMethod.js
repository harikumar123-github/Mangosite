import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
import '../App.css'
import CheckoutSteps from './CheckoutSteps'

export default function PaymentMethod(props) {
    
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch()


    if(!shippingAddress.address){
        props.history.push('/shipping')
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3/>

            <form onSubmit={submitHandler} className="form">
                <h1>Payment method</h1>

                <div>
                    <input style={ { cursor: 'pointer' } } type="radio" id="paypal" required checked onChange={e => setPaymentMethod(e.target.value)} value="PayPal" name="paymentMethod"/>
                    <label style={ { cursor: 'pointer' } } htmlFor="paypal">PayPal</label>
                </div>

                <div >
                    <input style={ { cursor: 'pointer' } } type="radio" id="phonepay" required onChange={e => setPaymentMethod(e.target.value)} value="PhonePay" name="paymentMethod"/>
                    <label style={ { cursor: 'pointer' } } htmlFor="phonepay">PhonePay</label>
                </div>

                <div>
                    <button type='submit'>Continue</button>
                </div>
            </form>

        </div>
    )
}
