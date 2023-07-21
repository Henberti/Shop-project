import { createSlice } from "@reduxjs/toolkit";


const user = createSlice({
    name:'user',
    initialState: {
        name:null,
        email:null,
        id:null
    },
    reducers:{
        login:(state,acation)=>{
            const {name,email, _id} = acation.payload
            state.name = name;
            state.email = email;
            state.id = _id
        },
        logout: (state)=>{
            state.name = null;
            state.email = null;
            state.id = null
        }

    }
})

export const userReducer = user.reducer
export const {login, logout} = user.actions