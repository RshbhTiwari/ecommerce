import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    products: [],
    oneproduct: {},
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null; // Reset error state on loading start
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getproductsSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload;
        },

        getOneproductsSuccess(state, action) {
            state.isLoading = false;
            state.oneproduct = action.payload;
            
        },
    },
});

export const {
    startLoading,
    hasError,
    getproductsSuccess,
    getOneproductsSuccess,
} = productSlice.actions;

export default productSlice.reducer;

// Thunk action to fetch all Product
export const getproduct = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/products");
        dispatch(getproductsSuccess(response?.data?.products));
    
    } catch (error) {
        console.error("Error fetching product:", error?.response?.data?.message);
        dispatch(hasError(error?.response?.data?.message));
    }
};

// Thunk action to fetch one Product by id
export const getOneProduct = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/product/${id}`);
        dispatch(getOneproductsSuccess(response?.data?.product));
    
    } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};


