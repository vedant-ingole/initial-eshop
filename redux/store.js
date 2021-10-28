import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import modalReducer from "./modalStore";


export default configureStore({
    reducer:{
        cart: cartReducer,
        modal: modalReducer
    },
})

