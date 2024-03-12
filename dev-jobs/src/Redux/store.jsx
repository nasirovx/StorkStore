import {configureStore} from '@reduxjs/toolkit';
import { ProductReducer} from './Slices/ProductSlice'
import { authReducer } from './Slices/auth'
import cartReducer from '../Redux/Slices/cartSlice'

const store = configureStore({
    reducer: {
        products: ProductReducer,
        auth: authReducer,
        allCart: cartReducer
    }
});

export default store