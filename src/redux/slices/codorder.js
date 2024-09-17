import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { getAllCartItems } from "./addToCart";

const initialState = {
    isLoading: false,
    error: null,
    oneId: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

// Create the slice
const codorderSlice = createSlice({
    name: "codorder",
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

        getOneIdSuccess(state, action) {
            state.isLoading = false;
            state.oneId = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getOneIdSuccess
} = codorderSlice.actions;

export default codorderSlice.reducer;

export function postcodorder(cartItem, navigate, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/order/create-cod-order', cartItem);
            dispatch(getOneIdSuccess(response?.data?.order_id));



            if (response?.data?.status === true) {
                toast.success('Order Confirmed with Cash on Delivery.');
                navigate(`/order-confirmation/${response?.data?.order_id}`);
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                const cart_id = localStorage?.getItem('cart_id') || null;
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                const token = localStorage?.getItem('accessToken') || null;
                if (token) {
                    const payload = {
                        status: true,
                    };
                    dispatch(getAllCartItems(customer_id, payload));
                } else {
                    const payload = {
                        status: false,
                    };
                    dispatch(getAllCartItems(cart_id, payload));
                }


            }
        } catch (error) {
            console.error("Address Linking Failed", error);
            dispatch(hasError(error.message || "Error linking address"));
        }
    };
}




