import React, { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import CheckoutSteps from './CheckoutSteps'
import Loading from './Loading'
import Message from './Message'

export default function PlaceOrder(props) {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart);
 
    if(!cart.paymentMethod){
        props.history.push('/payment')
    }

    const orderCreate = useSelector( state => state.orderCreate)
    const { loading, success , error , order} = orderCreate

    const toPrice = num => Number(num.toFixed(2))

    cart.itemsPrice = toPrice(cart.cartItems.reduce( (a,c) => a + (c.qty*c.cost),0 ))
    cart.shippingPrice = cart.itemsPrice>100?toPrice(0):toPrice(5);
    cart.taxPrice = toPrice(0.18 * cart.itemsPrice)
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = () => {
        dispatch(createOrder( {...cart,orderItems: cart.cartItems} ) )
    }

    useEffect( () => {
        if(success){
            props.history.push(`/orders/${order._id}`)
            dispatch({
                type: ORDER_CREATE_RESET
            })
        }
    }, [success, props.history, order , dispatch] )

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>

        <div className="cont">

            <div className="sideBox">
                <ul>
                    <li>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name:</strong> { cart.shippingAddress.fullName} <br />
                            <strong>Address:</strong> {cart.shippingAddress.address},
                            {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},{cart.shippingAddress.country}
                        </p>
                    </li>

                    <li>
                        <h2>Payment</h2>
                        <p> <strong>Method:</strong> { cart.paymentMethod} </p>
                    </li>
                </ul>
            </div>

            <div className="mainBox">
                <h2>Order Items</h2>
                <ul>
                    { cart.cartItems.map( item => (
                        <li key={item.product}>
                            <div>
                                <img style={ { maxWidth: '8rem' } } src={item.image} alt={item.name} />
                            </div>
                            <div>
                                <Link to={`/mango/${item.product}`}>{item.name}</Link>
                            </div>

                            <div> {item.qty} x {item.cost} = <span>&#8377;</span> {item.qty*item.cost} </div>
                        </li>
                    ) ) }
                </ul>
            </div>

            <div className="sideBox">
                    <ul>
                        <li>
                            <h2>Order Summary</h2>
                        </li>

                        <li>
                            <div>Items: <span>&#8377;</span> {cart.itemsPrice.toFixed(2)}</div>
                        </li>

                        <li>
                            <div>Shipping: <span>&#8377;</span> {cart.shippingPrice.toFixed(2)}</div>
                        </li>

                        <li>
                            <div>Tax: <span>&#8377;</span> {cart.taxPrice.toFixed(2)}</div>
                        </li>

                        <li>
                            <strong>
                                <div>Order Total: <span>&#8377;</span> {cart.totalPrice.toFixed(2)}</div>
                            </strong>
                        </li>

                        <li>
                            <button type="button" disabled={cart.cartItems.length === 0} onClick={placeOrderHandler} className="block">Place Order</button>
                        </li>

                        {loading && <Loading />}
                        {error && <Message varient='danger' />}
                    </ul>
               
            </div>

        </div>
        </>
    )
}
