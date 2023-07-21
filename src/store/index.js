import {configureStore} from '@reduxjs/toolkit'
import { userReducer, login, logout } from './slices/userSlice'
import { cartReducer, setCart, clearCart, removeItem, updateCart } from './slices/cartSlice'
import {setNotification,clearNotification,notificationReducer} from './slices/notificationSlice'


const store = configureStore({
    reducer:{
        user: userReducer,
        cart:cartReducer,
        notification:notificationReducer
    }
    
})

export { 
    store,
    login,
    logout,
    setCart,
    clearCart,
    removeItem,
    updateCart,
    setNotification,
    clearNotification
    
}