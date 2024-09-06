import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allblog: [],
    oneblog: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

// Create the slice
const blogSlice = createSlice({
    name: "blog",
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
        getAllblogSuccess(state, action) {
            state.isLoading = false;
            state.allblog = action.payload;
        },
        getOneblogSuccess(state, action) {
            state.isLoading = false;
            state.oneblog = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllblogSuccess,
    getOneblogSuccess
} = blogSlice.actions;

export default blogSlice.reducer;

export const getBlog = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/addresses`, { headers });
        dispatch(getAllblogSuccess(response?.data?.addresses));
    } catch (error) {
        console.error("Unable to retrieve address list. Please try again later", error);
        dispatch(hasError(error.message || "Error retrieving address list"));
    }
};

export const getOnebLog = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/getAddresses/${id}`, { headers });
        dispatch(getOneblogSuccess(response?.data?.address));
    } catch (error) {
        console.error("Failed to load address details. Please try again later", error);
        dispatch(hasError(error.message || "Error loading address details"));
    }
};

