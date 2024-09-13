import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allOrders: [],
    oneOrders: {},
};

// Create the slice
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        getAllOrdersSuccess(state, action) {
            state.isLoading = false;
            state.allOrders = action.payload;
        },

        getOneOrdersSuccess(state, action) {
            state.isLoading = false;
            state.oneOrders = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllOrdersSuccess,
    getOneOrdersSuccess
} = ordersSlice.actions;

export default ordersSlice.reducer;

const getHeaders = () => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
};

export const getOrders = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/my-orders-list/${id}`, { headers: getHeaders() });
        dispatch(getAllOrdersSuccess(response?.data?.orders));
    } catch (error) {
        console.error("Unable to retrieve address list. Please try again later", error);
        dispatch(hasError(error.message || "Error retrieving address list"));
    }
};

export const getOneOrders = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/my-orders-details/${id}`,{ headers: getHeaders() });
        dispatch(getOneOrdersSuccess(response?.data?.order_details));
    } catch (error) {
        console.error("Failed to load address details. Please try again later", error);
        dispatch(hasError(error.message || "Error loading address details"));
    }
};

