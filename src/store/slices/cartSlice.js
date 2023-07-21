import {createSlice} from '@reduxjs/toolkit' 


const cart = createSlice({
    name:'cart',
    initialState: {
        products:[],
        cartId:'',
    },
    reducers:{
        setCart: (state,action)=>{
            const {items, _id} = action.payload
            const newItems = [...items]
            state.products = newItems
            state.cartId = _id
        },
        clearCart: (state)=>{
            state.products = []
            state.cartId = ''
        },
        removeItem: (state,action)=>{
            const {productId} = action.payload
            state.products = state.products.filter(prod=>prod._id !== productId)
        },
        updateCart: (state,action)=>{
            const {items} = action.payload
            const newItems = [...items]
            state.products = newItems
        }
    }
})

export const cartReducer = cart.reducer
export const {setCart,clearCart,removeItem, updateCart} = cart.actions
