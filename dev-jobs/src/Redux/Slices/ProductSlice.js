import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from '../../Axios';

//Products
export const fetchProducts = createAsyncThunk('/products/fetchProducts', async () => {
    const {data} = await axios.get('/products');
    return data;
});

export const fetchRemoveProducts = createAsyncThunk('/products/fetchRemoveProducts', async (id) => {
    const {data} = await axios.delete(`/products/${id}`);
    return data;
});

//Posts
export const fetchPosts = createAsyncThunk('/post/fetchPosts', async () => {
    const {data} = await axios.get('/post/all');
    return data;
});

export const fetchRemovePost = createAsyncThunk('/post/fetchRemovePost', async (id) => {
    const {data} = await axios.delete(`/post/delete/${id}`);
    return data;
});

const initialState = {
    products: {
        items: [],
        status: 'loading',
    },
    post: {
        items: [],
        status: 'loading',
    },
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => { // Use builder callback notation
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products.items = [];
                state.products.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.products.items = action.payload;
                state.products.status = 'loaded';
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.products.items = [];
                state.products.status = 'error';
            })
            .addCase(fetchRemoveProducts.pending, (state, action) => {
                state.products.items = state.products.items.filter((obj) => obj._id !== action.meta.arg)
            })

            .addCase(fetchPosts.pending, (state) => {
                state.post.items = [];
                state.post.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.post.items = action.payload;
                state.post.status = 'loaded';
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.post.items = [];
                state.post.status = 'error';
            })
            .addCase(fetchRemovePost.pending, (state, action) => {
                state.post.items = state.post.items.filter((obj) => obj._id !== action.meta.arg)
            });
    },
})

export const ProductReducer = productSlice.reducer;