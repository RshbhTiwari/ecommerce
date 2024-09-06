import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    addContact: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

// Create the slice
const contactSlice = createSlice({
    name: "contactfrom",
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

        postContactSuccess(state, action) {
            state.isLoading = false;
            state.addContact = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    postContactSuccess
} = contactSlice.actions;

export default contactSlice.reducer;

export function postContact(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/contact/save', payload);
            console.log("response", response?.data?.status)
            reset()
            if (response?.data?.status === true) {
                toast.success(response?.data?.message);
            } else {
                toast.error("Address Linking Failed");
            }
        } catch (error) {
            console.error("Address Linking Failed", error);
            toast.error("Address Linking Failed");
            dispatch(hasError(error.message || "Error linking address"));
        }
    };
}




