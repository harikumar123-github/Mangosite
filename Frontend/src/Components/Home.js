import React, { useEffect } from 'react'
import '../App.css'
import Rating from '@material-ui/lab/Rating' 
import Loading from './Loading'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { listData } from '../actions/dataActions'
import { Link } from 'react-router-dom';

export default function Home(props) {

    const dispatch = useDispatch()

    const dataList = useSelector( state => state.dataList)
    const { loading, error, data } = dataList

    useEffect( () => {
        dispatch(listData())
    }, [dispatch])

    return (
    <>
        <div className="heading">
            <h1>Mangoes</h1>
        </div>

        <div className="underline">
            <div></div>
        </div>

        { loading? <Loading /> : error?<Message varient='danger'>{error}</Message>:(

        <div className="mangoes">
            {data.map( (mango,ind) => {
                return (
                    <div key={mango._id} className='box'>
                            <div className="mango">

                                <Link to={`/mango/${mango._id}`}> <img src={mango.image} alt={mango.name}/> </Link>

                                <div className="description">
                                    <Link to={`/mango/${mango._id}`}>
                                        <h4>{mango.name} {!mango.instock && <div style={{display: 'inline', color: 'red'}}>&#8709;</div> }</h4>
                                        <div className="content" style={ {display: 'flex' , justifyContent: 'space-between'}} >
                                            <Rating precision={0.1} value={mango.rating} readOnly={true}  />
                                            <h6 style={ {paddingRight : '0.8em', fontSize: '1.1em'} }> 
                                                <p> <span>&#8377;</span> {mango.cost}</p> 
                                            </h6>
                                        </div>
                                        <p>{mango.description}</p>
                                    </Link>
                                </div>

                            </div>
                        
                    </div>
                )
            } )
            }
        </div>
        )}  
    </>
    )
}
