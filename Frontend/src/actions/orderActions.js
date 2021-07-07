import * as constants from "../constants/orderConstants"
import Axios from 'axios'
import { CART_EMPTY } from "../constants/cartConstants"

export const createOrder = (order) => async (dispatch,getState) => {
    dispatch( {
        type: constants.ORDER_CREATE_REQUEST,
        payload: order
    } )

    try {

        const { userSignin: {userInfo} } = getState()

        const { data } = await Axios.post('/api/orders', order , {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch( {
            type: constants.ORDER_CREATE_SUCCESS,
            payload: data.order
        } )
        dispatch( {
            type: CART_EMPTY,
        } )
        localStorage.removeItem('cartItems');

    } catch(error) {
        dispatch({ 
            type: constants.ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message?error.response.data.message:error.message
         })
    }

}

export const detailsOrder = orderId => async (dispatch,getState) => {
    dispatch( {
        type: constants.ORDER_DETAILS_REQUEST,
        payload: orderId
    } )

    try {

        const { userSignin: {userInfo} } = getState()

        const { data } = await Axios.get(`/api/orders/${orderId}` , {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        })

        dispatch({
            type: constants.ORDER_DETAILS_SUCCESS,
            payload: data
        })

    } catch(error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ORDER_DETAILS_FAIL,
            payload: message
        })
    }

}

export const payOrder = (order, paymentResult) => async ( dispatch, getState ) => {
    dispatch( {
        type: constants.ORDER_PAY_REQUEST,
        payload: {
            order, paymentResult
        }
    } )

    const { userSignin: {userInfo} } = getState()

    try {

        const { data } = await Axios.put(`/api/orders/${order._id}/pay`,paymentResult, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } )

        dispatch( {
            type: constants.ORDER_PAY_SUCCESS,
            payload: data
        } )

    } catch (error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ORDER_PAY_FAIL,
            payload: message
        })
    }

}

export const listOrderMine = () => async (dispatch, getState) => {
    dispatch( {
        type: constants.ORDERS_LIST_REQUEST
    } )

    const { userSignin: {userInfo} } = getState()

    try {

        const { data } = await Axios.get(`/api/orders/mine`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } )

        dispatch( {
            type: constants.ORDERS_LIST_SUCCESS,
            payload: data
        } )

    } catch (error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ORDERS_LIST_FAIL,
            payload: message
        })
    }

}

export const listOrders = () => async (dispatch, getState) => {
    dispatch( {
        type: constants.ALL_ORDERS_LIST_REQUEST
    } )

    const { userSignin: {userInfo} } = getState()

    try {
        const { data } = await Axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } )

        dispatch( {
            type: constants.ALL_ORDERS_LIST_SUCCESS,
            payload: data
        } )

    } catch (error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ALL_ORDERS_LIST_FAIL,
            payload: message
        })
    }

}

export const deleteOrder = (orderId) => async (dispatch, getState) => {
    dispatch( {
        type: constants.ORDER_DELETE_REQUEST,
        payload: orderId
    } )

    const { userSignin: {userInfo} } = getState()

    try {

        const { data } = await Axios.delete(`/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } )

        dispatch( {
            type: constants.ORDER_DELETE_SUCCESS,
            payload: data
        } )

    } catch (error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ORDER_DELETE_FAIL,
            payload: message
        })
    }

}

export const deliverOrder = (orderId) => async ( dispatch, getState ) => {
    dispatch( {
        type: constants.ORDER_DELIVER_REQUEST,
        payload: orderId
    } )

    const { userSignin: {userInfo} } = getState()

    try {

        const { data } = await Axios.put(`/api/orders/${orderId}/deliver`, {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        } )

        dispatch( {
            type: constants.ORDER_DELIVER_SUCCESS,
            payload: data
        } )

    } catch (error) {
        const message = error.response && error.response.data.message?error.response.data.message:error.message
        dispatch( {
            type: constants.ORDER_DELIVER_FAIL,
            payload: message
        })
    }

}

