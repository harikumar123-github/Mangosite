import React, { useState } from 'react'
import CheckoutSteps from './CheckoutSteps'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'

export default function ShippingAddress(props) {

    const dispatch = useDispatch()

    const userSignin = useSelector( state => state.userSignin )
    const { userInfo } = userSignin
    
    if(!userInfo){
        props.history.push('/signin')
    }

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [fullName,setFullName] = useState(shippingAddress.fullName)
    const [address,setAddress] = useState(shippingAddress.address)
    const [postalCode,setPostalCode] = useState(shippingAddress.postalCode)
    const [city,setCity] = useState(shippingAddress.city)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler = e => {
        e.preventDefault()
        dispatch( saveShippingAddress( {fullName, address, city ,postalCode,country} ) )
        props.history.push('/payment')
    }

    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <form className="form" onSubmit={submitHandler}>
                <h1>Shipping Address</h1>

                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Full name" value={fullName} onChange={ e => setFullName(e.target.value) } required/>
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Address" value={address} onChange={ e => setAddress(e.target.value) } required/>
                </div>

                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="City" value={city} onChange={ e => setCity(e.target.value) } required/>
                </div>

                <div>
                    <label htmlFor="postalCode">Pincode</label>
                    <input type="text" id="postalCode" placeholder="Pincode" value={postalCode} onChange={ e => setPostalCode(e.target.value) } required/>
                </div>

                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Country" value={country} onChange={ e => setCountry(e.target.value) } required/>
                </div>


                <div>
                    <button type="submit">Continue</button>
                </div>

            </form>


        </div>
    )
}
