import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    reviews: [],
    addReviews: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

const reviewsSlice = createSlice({
    name: "reviews",
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
        postReviewsSuccess(state, action) {
            state.isLoading = false;
            state.reviews = action.payload;
        },
        getAllReviewsSuccess(state, action) {
            state.isLoading = false;
            state.reviews = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllReviewsSuccess,
    postReviewsSuccess,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;


export const getReviews = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/products/${id}/reviews`);
        console.log("response123",response.data)
        dispatch(getAllReviewsSuccess(response?.data?.data));
    } catch (error) {
        console.error("Unable to retrieve address list. Please try again later", error);
        dispatch(hasError(error.message || "Error retrieving address list"));
    }
};

export function postReviews(payload, toast, reset, setIsOpen) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/reviews', payload); 
            console.log("response", response?.data?.status)
            reset()
            setIsOpen(false)
            toast.success(response?.data?.message);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch (error) {
            console.error("Address Linking Failed", error);
            toast.error("Address Linking Failed");
            dispatch(hasError(error.message || "Error linking address"));
        }
    };
}




