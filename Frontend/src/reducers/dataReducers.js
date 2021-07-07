import * as constants from "../constants/dataConstants"

export const dataListReducer = (state={ loading:true, data: []},action) => {
    switch(action.type){
        case constants.DATA_LIST_REQUEST:
            return {loading: true}
        case constants.DATA_LIST_SUCCESS:
            return {loading: false, data: action.payload}
        case constants.DATA_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const mangoDetailsReducer = (state={ loading:true },action) => {
    switch(action.type){
        case constants.DATA_DETAILS_REQUEST:
            return {loading: true}
        case constants.DATA_DETAILS_SUCCESS:
            return {loading: false, mango: action.payload}
        case constants.DATA_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export const productCreateReducer = ( state = {} , action ) => {
    switch(action.type){
        case constants.PRODUCT_CREATE_REQUEST:
            return { loading: true }
        case constants.PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true , product: action.payload }
        case constants.PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case constants.PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = ( state = {}, action ) => {
    switch(action.type){
        case constants.PRODUCT_UPDATE_REQUEST:
            return { loading: true }
        case constants.PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true }
        case constants.PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case constants.PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}

export const productDeleteReducer = ( state = {}, action ) => {
    switch(action.type){
        case constants.PRODUCT_DELETE_REQUEST:
            return { loading: true }
        case constants.PRODUCT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case constants.PRODUCT_DELETE_FAIL :
            return { loading: false, error: action.payload }
        case constants.PRODUCT_DELETE_RESET:
            return {}
        default:
            return state
    }
}
