import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import modalReducer from "./modalStore"
import userReducer from './userStore'


export default configureStore({
    reducer:{
        cart: cartReducer,
        modal: modalReducer,
        user: userReducer
    },
})

