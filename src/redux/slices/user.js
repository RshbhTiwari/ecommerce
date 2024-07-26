import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    oneuser: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};


const userSlice = createSlice({
    name: "user",
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

        getuserSuccess(state, action) {
            state.isLoading = false;
            state.oneuser = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getuserSuccess,
} = userSlice.actions;

export default userSlice.reducer;


export const getOneUser = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get('/getUser', { headers });
        dispatch(getuserSuccess(response?.data?.user));
    } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};


export const putUser = (payload,toast) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.put("/userUpdate", payload, { headers: headers });
        if (response?.data?.status == true) {
            toast.success(response?.data?.message);
        }
    } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};

