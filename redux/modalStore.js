import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";



const modalSlice = createSlice({
    name:'modal',
    initialState:{
        type: "cart",
        modalState: false
    },
    reducers:{
        toggleModal: (state, action) => {
            state.modalState = action.payload

            if(state.modalState){
                document.body.classList.add("overflow-hidden");
            }else{
                document.body.classList.remove("overflow-hidden");

            }
        }
    }

})

export const {toggleModal} = modalSlice.actions 
export default modalSlice.reducer  