import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    oneuser: {},
};

const userSlice = createSlice({
    name: "user",
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
        getUserSuccess(state, action) {
            state.isLoading = false;
            state.oneuser = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;

const getHeaders = () => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
};

export const getOneUser = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get('/getUser', { headers: getHeaders() });
        dispatch(getUserSuccess(response?.data?.user));
    } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to fetch user"));
    }
};

export const putUser = (payload, toast) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.put("/userUpdate", payload, { headers: getHeaders() });
        if (response?.data?.status === true) {
            toast.success(response?.data?.message);
        }
    } catch (error) {
        console.error("Error updating user:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to update user"));
    }
};
