import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import Loading from './Loading'
import Message from './Message'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function Orders(props) {

    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderId = props.match.params.id

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading , error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { error:errorPay, success:successPay, loading:loadingPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { error:errorDeliver, success:successDeliver, loading:loadingDeliver } = orderDeliver

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin


    useEffect( () => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal')

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            script.async = true;
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || successPay || successDeliver || (order && order._id !== orderId)){
            dispatch( { type: ORDER_PAY_RESET } )
            dispatch( { type: ORDER_DELIVER_RESET } )
            dispatch(detailsOrder(orderId))
        }
        else{
            if(!order.isPaid){
                if(!window.paypal){
                    addPayPalScript()
                }
            }
            else{
                setSdkReady(true);
            }
        }

    }, [orderId ,sdkReady,order, successPay, dispatch, successDeliver] )

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id))
    }

    const successPaymentHandler = (paymentResult) => {
        dispatch( payOrder( order, paymentResult) )
    }

    return  loading? <Loading /> : error? (<Message varient='danger'>{error}</Message>): (

        <div>
            <h1>Order {order._id}</h1>

            <div className="cont">

                <div className="sideBox">
                    <ul>
                        <li>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Name:</strong> { order.shippingAddress.fullName} <br />
                                <strong>Address:</strong> {order.shippingAddress.address},
                                {order.shippingAddress.city}, {order.shippingAddress.postalCode},{order.shippingAddress.country}
                            </p>
                            { order.isDelivered?<Message varient='success'>Delivered at {order.deliveredAt}</Message>: <Message varient='danger'>Not delivered</Message> }
                        </li>

                        <li>
                            <h2>Payment</h2>

                            <p>
                                <strong>Method:</strong> { order.paymentMethod}
                            </p>
                            { order.isPaid?<Message varient='success'>Paid at {order.paidAt}</Message>: <Message varient='danger'>Not paid</Message> }
                        </li>
                    </ul>
                </div>

                <div className="mainBox">
                    <h2>Order Items</h2>

                    <ul>
                        { order.orderItems.map( item => (
                            <li key={item.product}>
                                <div>
                                    <img style={ { maxWidth: '8rem' } } src={item.image} alt={item.name} className='small'/>
                                </div>
                                <div className="min-30">
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
                            <div>Items: <span>&#8377;</span> {order.itemsPrice.toFixed(2)}</div>
                        </li>

                        <li>
                            <div>Shipping: <span>&#8377;</span> {order.shippingPrice.toFixed(2)}</div>
                        </li>

                        <li>
                            <div>Tax: <span>&#8377;</span> {order.taxPrice.toFixed(2)}</div>
                        </li>
                        <li>
                            <strong>
                                <div>Order Total: <span>&#8377;</span> {order.totalPrice.toFixed(2)}</div>
                            </strong>
                        </li>

                        { 
                            !order.isPaid && (
                                <li>
                                    {!sdkReady?<Loading />:(
                                        <>
                                        { errorPay && <Message varient="danger">{errorPay}</Message> }
                                        { loadingPay && <Loading /> }
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                        </>
                                    )}
                                </li>
                            )
                        }
                        { userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <li>
                                {loadingDeliver && < Loading/>}
                                {errorDeliver && <Message varient='danger'>{errorDeliver}</Message>}
                                <button type='button' onClick={deliverHandler}>Deliver order</button>
                            </li>
                        ) }
                    </ul>
                </div>

            </div>

        </div>
    )
}
 