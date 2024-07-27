import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    paymentData: {},
};

const initiaterazorpaySlice = createSlice({
    name: "initiaterazorpay",
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
        getInitiateRazorpaySuccess(state, action) {
            state.isLoading = false;
            state.paymentData = action.payload;
        },
    },
});

export const { startLoading, hasError, getInitiateRazorpaySuccess } = initiaterazorpaySlice.actions;

export default initiaterazorpaySlice.reducer;

export const initiateRazorpayPayment = (paymentOption, upiSubOption, cart_id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.post("/order/create", { paymentOption, upiSubOption, cart_id });
        dispatch(getInitiateRazorpaySuccess(response?.data?.data));
        console.log("response123",response)
    } catch (error) {
        console.error("Refresh the page and try again later.", error);

        dispatch(hasError(error));
    }
};
