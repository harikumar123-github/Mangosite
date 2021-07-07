import Axios from "axios"
import * as constants from "../constants/dataConstants"

export const listData = () => async (dispatch) => {
    dispatch( {
        type: constants.DATA_LIST_REQUEST
    } )

    try {
        const { data } = await Axios.get('/api/products')
        dispatch({type: constants.DATA_LIST_SUCCESS, payload: data })
    } catch(error) {
        dispatch( {type: constants.DATA_LIST_FAIL, payload: error.message } )
    }

}

export const detailsMango = (mangoId) => async (dispatch) => {
    dispatch( {
        type: constants.DATA_DETAILS_REQUEST, payload: mangoId
    } )

    try {
        const { data } = await Axios.get(`/api/products/${mangoId}`)
        dispatch( {type: constants.DATA_DETAILS_SUCCESS, payload: data} )
    } catch (error) {
        dispatch( {type: constants.DATA_DETAILS_FAIL, payload: error.response && error.response.data.message?error.response.data.message:error.message } )
    }

}

export const createProduct = () => async (dispatch,getState) => {
    dispatch({
        type: constants.PRODUCT_CREATE_REQUEST
    })

    const { userSignin: { userInfo } } = getState()

    try {

        const { data } = await Axios.post('/api/products', {} , {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch( {
            type: constants.PRODUCT_CREATE_SUCCESS,
            payload: data.product
        } )

    } catch(error) {
        dispatch( {
            type: constants.PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        } )
    }
}

export const updateProduct = product => async (dispatch,getState) => {
    dispatch( {
        type: constants.PRODUCT_UPDATE_REQUEST,
        payload: product
    } )

    const { userSignin: { userInfo } } = getState()

    try {

        const { data } = await Axios.put(`/api/products/${product._id}`, product , {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch( {
            type: constants.PRODUCT_UPDATE_SUCCESS,
            payload: data
        } )

    }
    catch (error) {
        dispatch( {
            type: constants.PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        } )
    }

}

export const deleteProduct = productId => async (dispatch,getState) => {
    dispatch( {
        type: constants.PRODUCT_DELETE_REQUEST,
        payload: productId
    } )

    const { userSignin: { userInfo } } = getState()

    try {

        const { data } = await Axios.delete(`/api/products/${productId}` , {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch( {
            type: constants.PRODUCT_DELETE_SUCCESS,
            payload: data
        } )

    } catch (error) {
        dispatch( {
            type: constants.PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
        } )
    }
}

