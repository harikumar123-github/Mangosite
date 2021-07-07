import * as constants from "../constants/orderConstants";

export const orderCreateReducer = ( state = {} , action ) => {
    switch(action.type){
        case constants.ORDER_CREATE_REQUEST:
            return { loading: true }
        case constants.ORDER_CREATE_SUCCESS:
            return { loading: false, success: true , order: action.payload }
        case constants.ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case constants.ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetailsReducer = ( state = { loading: true }, action ) => {
    switch(action.type){
        case constants.ORDER_DETAILS_REQUEST:
            return { loading: true }
        case constants.ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case constants.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default: 
            return state
    }
}

export const orderPayReducer = ( state = {} ,action ) => {
    switch(action.type){
        case constants.ORDER_PAY_REQUEST:
            return { loading: true }
        case constants.ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case constants.ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case constants.ORDER_PAY_RESET:
            return { }
        default:
            return state
    }
}

export const orderMineListReducer = ( state = { orders: [] } ,action ) => {
    switch(action.type){
        case constants.ORDERS_LIST_REQUEST:
            return { loading: true }
        case constants.ORDERS_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case constants.ORDERS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderListReducer = ( state = { orders: [] } ,action ) => {
    switch(action.type){
        case constants.ALL_ORDERS_LIST_REQUEST:
            return { loading: true }
        case constants.ALL_ORDERS_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case constants.ALL_ORDERS_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDeleteReducer = ( state = {} ,action ) => {
    switch(action.type){
        case constants.ORDER_DELETE_REQUEST:
            return { loading: true }
        case constants.ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case constants.ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case constants.ORDER_DELETE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDeliverReducer = ( state = {} ,action ) => {
    switch(action.type){
        case constants.ORDER_DELIVER_REQUEST:
            return { loading: true }
        case constants.ORDER_DELIVER_SUCCESS:
            return { loading: false, success: true }
        case constants.ORDER_DELIVER_FAIL:
            return { loading: false, error: action.payload }
        case constants.ORDER_DELIVER_RESET:
            return { }
        default:
            return state
    }
}

