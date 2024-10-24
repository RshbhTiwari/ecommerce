import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    oneuser: {},
    myccountdata:{}
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
        getMyccountSuccess(state, action) {
            state.isLoading = false;
            state.myccountdata = action.payload;
        },

        putUserSuccess(state, action) {
            state.isLoading = false;
            state.oneuser = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getUserSuccess,
    getMyccountSuccess,
    putUserSuccess
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

export const getMyccount = (customer_id) => async (dispatch) => { 
    try {
        dispatch(startLoading()); 
        const response = await axios.get(`/my-account/${customer_id}`, { headers: getHeaders() });
        dispatch(getMyccountSuccess(response?.data?.data));
    } catch (error) {
        console.error("Error fetching user:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to fetch user"));
    }
};

export const putUser = (payload, toast, navigate) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.put("/userUpdate", payload, { headers: getHeaders() });
        console.log("responseresponse",response)
        if (response?.data?.status === true) {
            dispatch(putUserSuccess(response?.data?.user));

            navigate('/my-account')
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            toast.success(response?.data?.message);
        }
    } catch (error) {
        console.error("Error updating user:", error.response?.data?.message || error.message);
        dispatch(hasError(error.response?.data?.message || "Failed to update user"));
    }
};
