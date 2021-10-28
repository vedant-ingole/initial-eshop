import { createSlice } from "@reduxjs/toolkit";
import getCommerce from '../lib/commerce'

const commerce = getCommerce()


const cartSlice = createSlice({
    name: "cart",
    initialState:{
        // carts: null,
        carts: {},
        pending: null,
        error:false
    },
    reducers: {
        updateStart: (state) => {
            state.pending = true
        },
        getCart: (state, action) => {
            state.pending = false
            state.carts = action.payload  // send cart object and add/update it with cart:{} state,  // state.carts = action.payload.commerceCart
        },
    }
})


export const { getCart, updateStart } = cartSlice.actions 
export default cartSlice.reducer