import Axios from "axios"
import  * as constants from "../constants/cartConstants"

export const addToCart = (mangoId, qty) => async (dispatch, getState) => {
    const { data } = await Axios.get(`/api/products/${mangoId}`)

    dispatch(  {
        type: constants.CART_ADD_ITEM,
        payload: {
            name: data.name,
            image: data.image,
            cost: data.cost,
            countInStock: data.countInStock,
            product: data._id,
            qty
        }
    })

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))

}

export const removeFromCart = mangoId => async (dispatch, getState) => {

    dispatch( {
        type: constants.CART_REMOVE_ITEM,
        payload: mangoId
    } )

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saveShippingAddress = (data) => dispatch => {
    dispatch( {
        type: constants.CART_SAVE_SHIPPING_ADDRESS, 
        payload: data
    } )
    localStorage.setItem('shippingAddress',JSON.stringify(data))
}

export const savePaymentMethod = data => dispatch => {
    dispatch( {
        type: constants.CART_SAVE_PAYMENT_METHOD,
        payload: data
    } )
}
