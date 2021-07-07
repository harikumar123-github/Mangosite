import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { Link } from 'react-router-dom'
import Message from './Message'
import '../App.css'

export default function Cart(props) {

    const mangoId = props.match.params.id
    const qty = props.location.search?Number(props.location.search.split('=')[1]):1;
    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    useEffect( () => {
        if(mangoId){
            dispatch(addToCart(mangoId,qty))
        }
    } , [dispatch,mangoId,qty])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkOut = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return (
        <div>
            <h1>Shopping cart</h1>
            <div className="cont">
                <div className="mainBox">
                    { cartItems.length === 0 ? (<Message> Cart is Empty. <Link to='/'>Keep Shopping</Link> </Message>) : (
                        <ul>
                            { cartItems.map( item => (
                                <li key={item.product}>

                                    <div>
                                        <img style={ { maxWidth: '8rem' } } src={item.image} alt={item.name} />
                                    </div>

                                    <div>
                                        <Link to={`/mango/${item.product}`}>{item.name}</Link>
                                    </div>

                                    <div>
                                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                        {
                                                [...Array(item.countInStock).keys()].map( x => (
                                                    <option key={x+1} value={x+1}> {x+1} </option>
                                                ) )
                                            }
                                        </select>
                                    </div>

                                    <div><span>&#8377;</span> {item.cost}</div>

                                    <button  type='button' onClick={ () => removeFromCartHandler(item.product)}>Delete</button>

                                </li>
                            ) ) }
                        </ul>
                    ) }
                </div>

                <div className="sideBox">
                    <ul>
                        <li>
                            <h2>Total ({cartItems.reduce( (a,c) => a+c.qty,0)} Items): <span>&#8377;</span> {cartItems.reduce((a,c) => a + c.cost*c.qty,0)}</h2>
                        </li>

                        <li>
                            <button onClick={checkOut} className='primary block' disabled={cartItems.length===0}>Proceed to Checkout</button>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}
