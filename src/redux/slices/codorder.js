import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
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
    },
});

export const {
    startLoading,
    hasError,
} = codorderSlice.actions;

export default codorderSlice.reducer;

export function postcodorder(cartItem, setIsModalOpen) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/order/create-cod-order', cartItem);
            if (response?.data?.status === true) {
                setIsModalOpen(true);
            } 
        } catch (error) {
            console.error("Address Linking Failed", error);
            dispatch(hasError(error.message || "Error linking address"));
        }
    };
}



