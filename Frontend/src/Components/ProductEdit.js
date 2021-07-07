import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { detailsMango, updateProduct } from '../actions/dataActions'
import '../App.css'
import { PRODUCT_UPDATE_RESET } from '../constants/dataConstants'
import Loading from './Loading'
import Message from './Message'

export default function ProductEdit(props) {

    const dispatch = useDispatch()

    const productId = props.match.params.id
    const [name, setName] = useState('')
    const [cost, setCost] = useState(0)
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [type, setType] = useState('')
    const [description, setDescription] = useState('')
    // const [instock, setInstock] = useState(true)
    const [countInStock, setCountInStock] = useState(1)
    const [loadingUpload, setLoadingUpload] = useState(false)
    const [errorUpload, setErrorUpload] = useState(false)

    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    const produtDetails = useSelector(state => state.mangodetails)
    const { loading, error, mango:data } = produtDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading:loadingUpdate , error:errorUpdate, success:successUpdate } = productUpdate

    useEffect( () => {

        if(successUpdate){
            props.history.push('/productlist')
        }

        if(!data || (data._id !== productId) || successUpdate){
            dispatch( {
                type: PRODUCT_UPDATE_RESET
            } )
            dispatch(detailsMango(productId))
        }
        else{
            setName(data.name)
            setCost(data.cost)
            setImage(data.image)
            setCategory(data.category)
            setType(data.type)
            setDescription(data.description)
            setCountInStock(data.countInStock)
        }

    }, [data, dispatch, productId , props.history,successUpdate])

    const submitHandler = e => {
        e.preventDefault()
        dispatch(updateProduct( { 
            _id:productId,
            name, cost , image, category, type, countInStock, description, instock: (countInStock>0)
        } ))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const bodyFormData = new FormData()
        bodyFormData.append('image', file)
        setLoadingUpload(true)
        try {

            const { data } = await Axios.post('/api/uploads', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            })

            setImage(data)
            setLoadingUpload(false)
        } catch(error) {
            setErrorUpload(error.message)
            setLoadingUpload(false)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} className="form">
                <h1>Edit Product {productId}</h1>

                { loadingUpdate && <Loading /> }
                { errorUpdate && <Message varient='danger'>{errorUpdate.substring(0,6)==='E11000'?'Product name should be unique':errorUpdate}</Message> }

                { loading? <Loading />:error?(<Message varient='danger'>{error}</Message>) : (
                    <>
                    
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id='name' placeholder="Name" value={name} onChange={ e => setName(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="price">Cost</label>
                        <input type="number" id='price' min={0} placeholder="Cost" value={cost} onChange={ e => setCost(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="image">Image</label>
                        <input type="text" id='image' placeholder="Image" value={image} onChange={ e => setImage(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="imageFile">Image file</label>
                        <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler} />
                    </div>

                    { loadingUpload && <Loading /> }
                    { errorUpload && <Message varient="danger">{errorUpload}</Message> }

                    <div>
                        <label htmlFor="category">Category</label>
                        <input type="text" id='category' placeholder="Category" value={category} onChange={ e => setCategory(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="type">Type</label>
                        <input type="text" id='type' placeholder="Type" value={type} onChange={ e => setType(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="countInStock">Count in stock</label>
                        <input type="number" min={0} id='countInStock' placeholder="Count" value={countInStock} onChange={ e => setCountInStock(e.target.value) } />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea id='description' placeholder="Description" value={description} onChange={ e => setDescription(e.target.value) } />
                    </div>

                    <div>
                        <label></label>
                        <button>Update</button>
                    </div>

                    </>
                ) }
            </form>
        </div>
    )
}
