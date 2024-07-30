import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    products: [],
    oneProduct: {},
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
        getProductsSuccess(state, action) {
            state.isLoading = false;
            state.products = action.payload;
        },
        getOneProductSuccess(state, action) {
            state.isLoading = false;
            state.oneProduct = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getProductsSuccess,
    getOneProductSuccess,
} = productSlice.actions;

export default productSlice.reducer;

export const getProducts = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/products");
        dispatch(getProductsSuccess(response?.data?.products || []));
    } catch (error) {
        console.error("Error fetching products:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to fetch products"));
    }
};

export const getOneProduct = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/product/${id}`);
        dispatch(getOneProductSuccess(response?.data?.product || {}));
    } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to fetch product"));
    }
};
