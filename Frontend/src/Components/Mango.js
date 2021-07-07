import React, { useEffect, useState } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Message from './Message'
import { detailsMango } from '../actions/dataActions'
import Button from '@material-ui/core/Button'
import Rating from '@material-ui/lab/Rating'
import ShoppingCart from '@material-ui/icons/ShoppingCartTwoTone'
import NotInterestedIcon from '@material-ui/icons/NotInterested';

export default function Mango(props) {

    const [qty,setQty] = useState(1)
    const dispatch = useDispatch()
    const mangoId = props.match.params.id
    const mangodetails = useSelector( state => state.mangodetails)

    const { loading, error, mango } = mangodetails

    useEffect( () => {
      dispatch(detailsMango(mangoId))
    }, [dispatch, mangoId] )

    const addToCart = () => {
        props.history.push(`/cart/${mangoId}?qty=${qty}`)
    }

    return (
        <>
        {
            loading? <Loading /> :
                    error?<Message varient='danger'>{error}</Message>
                : (
            <div className="cont">

                <img style={ { maxWidth: '20em' } } src={mango.image} alt={mango.name}/>
            
                <div className="mainBox">
                    <h2>{mango.name}</h2>
                    <p>category: {mango.category} | Type: {mango.type}</p>

                    <Rating precision={0.1} value={mango.rating} readOnly={true}  />

                    <hr />

                    <p>Price: <span>&#8377;</span> {mango.cost} </p>

                    <p>Free delivery on purchase of above <span>&#8377;</span>499</p>

                    <strong>About:</strong>
                    <p style={ { marginLeft: '2em' } }> {mango.description}</p>

                    {mango.instock && (
                            <div>
                                <div>
                                    <strong>Qty</strong>
                                    <select style={ { marginLeft: '1em' } } value={qty} onChange={e => setQty(e.target.value)} >
                                        {
                                            [...Array(mango.countInStock).keys()].map( x => (
                                                <option key={x+1} value={x+1}> {x+1} </option>
                                            ) )
                                        }
                                    </select>
                                    <Button
                                        startIcon={<ShoppingCart/>} 
                                        style={ { color: 'white',
                                        backgroundColor: 'yellowgreen' , width: '50%', marginLeft: "2%" }  } varient="contained"
                                        onClick={addToCart} >
                                            Add
                                    </Button>
                                </div>
                            </div>
                    )
                    }

                    {!mango.instock && (<Button
                        disabled
                        startIcon={<NotInterestedIcon/>}
                        style={ { 
                            width:'90%',
                            backgroundColor: 'lightgray',
                            color: 'black',
                        }
                        } varient="outlined">
                        Out of Stock
                    </Button>)}
                </div>

                <div style={ { width: '12%'} } className="sideBox">
                    <ul>
                        <li  style={ { border: 'none' } }>
                            <h5>Quantity
                            <select style={ { fontSize: '0.6em' , marginLeft: '1em' } } value={qty} onChange={e => setQty(e.target.value)} >
                                {
                                    [...Array(mango.countInStock).keys()].map( x => (
                                        <option key={x+1} value={x+1}> {x+1} </option>
                                    ) )
                                }
                            </select>
                            </h5>
                        </li>

                        { mango.instock && (
                        <li>
                            <button style={ { width: '100%' , marginTop: '0.6em', 
                                    color: 'white',backgroundColor: 'yellowgreen' , 
                                    border: 'none' } } disabled={mango.countInStock===0} 
                                onClick={addToCart}> Add to cart
                            </button>
                        </li>
                        )}

                        { !mango.instock && (<Button
                            disabled
                            startIcon={<NotInterestedIcon/>}
                            style={ { 
                                width:'100%',
                                backgroundColor: 'lightgray',
                                color: 'black',
                                border: 'none'
                            }} varient="outlined" />
                        )}
                    </ul>
                </div>

            </div>)
        }

        </>

    )
}
