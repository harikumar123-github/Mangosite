import React, { useEffect } from 'react'
import '../App.css'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import Message from './Message'
import { createProduct, deleteProduct, listData } from '../actions/dataActions'
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/dataConstants'

export default function ProductList(props) {
    
    const productList = useSelector(state => state.dataList)
    const { loading, error, data } = productList

    const dispatch = useDispatch()

    const productCreate = useSelector(state => state.productCreate)
    const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate
    
    const productDelete = useSelector(state => state.productDelete)
    const {  loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

    useEffect( () => {
        if(successCreate){
            dispatch({
                type: PRODUCT_CREATE_RESET
            })
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        
        if(successDelete){
            dispatch( {
                type: PRODUCT_DELETE_RESET
            } )
        }

        dispatch(listData())

    }, [dispatch,successCreate,props.history,createdProduct, successDelete])


    const createHandler = () => {
        dispatch(createProduct())
    }

    const deleteHandler = product => {
        if(window.confirm('Confirm to delete the product?')){
            dispatch(deleteProduct(product._id))
        }
    }

    return (
        <div>

            <div className="cont">
                <h1>Products</h1>
                <button type="button" id="createProduct" className='primary' onClick={createHandler}>Create Product</button>
            </div>

            { loadingDelete && <Loading /> }
            {errorDelete && <Message varient='danger'>{errorDelete}</Message>}

            { loadingCreate && <Loading /> }
            {errorCreate && <Message varient='danger'>{errorCreate}</Message>}

            { loading? <Loading /> : error?(<Message varient="danger">{error}</Message>) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { data.map( product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.cost}</td>
                                <td>{product.category}</td>
                                <td>{product.type}</td>
                                <td>
                                    <button type="button" onClick={() => props.history.push(`/product/${product._id}/edit`)}>Edit</button>
                                    <button type="button" className="delete" onClick={() => deleteHandler(product)}>Delete</button>
                                </td>
                            </tr>
                        ) ) }
                    </tbody>
                </table>
            ) }
        </div>
    )
}
