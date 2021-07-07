import React, { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { deleteOrder, listOrders } from '../actions/orderActions'
import Loading from './Loading'
import Message from './Message'
import { ORDER_DELETE_RESET } from '../constants/orderConstants'

export default function OrderList(props) {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const orderDelete = useSelector(state => state.orderDelete)
    const { loading:loadingDelete , error:errorDelete, success:successDelete } = orderDelete

    useEffect( () => {
        dispatch( {
            type: ORDER_DELETE_RESET
        } )
        dispatch(listOrders())
    } , [dispatch,successDelete])

    const deleteHandler = order => {
        if(window.confirm('Confirm to delete?')){
            dispatch(deleteOrder(order._id))
        }
    }

    return (
        <div>
            <h1>Orders</h1>

            { loadingDelete && <Loading /> }
            { errorDelete && <Message varient="danger">{errorDelete}</Message> }

            { loading? <Loading /> : error? (<Message varient="danger">{error}</Message>): (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>Delivered</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { orders.map( order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid?order.paidAt.substring(0,10):'No'}</td>
                                <td>{order.isDelivered?order.deliveredAt.substring(0,10):'No'}</td>
                                <td>
                                    <button type="button" className="small" onClick={ () => { props.history.push(`/orders/${order._id}`) } }>Details</button>
                                    <button type="button" className="delete" onClick={() => deleteHandler(order)}>Delete</button>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            ) }
        </div>
    )
}
