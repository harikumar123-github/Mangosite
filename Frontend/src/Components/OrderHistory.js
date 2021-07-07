import React, { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import { listOrderMine } from '../actions/orderActions'
import Loading from './Loading'
import Message from './Message'

export default function OrderHistory(props) {

    const dispatch = useDispatch()

    const orderMineList = useSelector(state => state.orderMineList)
    const { loading, error, orders } = orderMineList

    useEffect( () => {
        dispatch(listOrderMine())
    } , [dispatch] )

    return (
        <div>
            <h1>Order History</h1>

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
                                </td>
                            </tr>
                         ) ) }
                    </tbody>
                </table>
            ) }

        </div>
    )
}
