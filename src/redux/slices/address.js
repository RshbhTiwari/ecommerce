import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allAddress: [],
    oneAddress: {},
    addAddress: {},
    deleteStatus: false
};


const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const jsonheader = {
    "Content-Type": "application/json",
    "access_token": accessToken,
};

const headers = {
    'Authorization': `Bearer ${accessToken}`, 
    'Content-Type': 'application/json'
};

const Slice = createSlice({
    name: "address",
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
        getAllAddressSuccess(state, action) {
            state.isLoading = false;
            state.allAddress = action.payload;
        },
        getOneAddressSuccess(state, action) {
            state.isLoading = false;
            state.oneAddress = action.payload;
        },
        postAddressSuccess(state, action) {
            state.isLoading = false;
            state.addAddress = action.payload;
        },
        deleteAddressSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllAddressSuccess,
    getOneAddressSuccess,
    postAddressSuccess,
    deleteAddressSuccess
} = Slice.actions;

export default Slice.reducer;

// Thunk action to fetch all Address
export const getAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/addresses/${id}`);
        dispatch(getAllAddressSuccess(response?.data?.addresses));
    } catch (error) {
        console.error("Error fetching product:", error?.response?.data?.message);
        dispatch(hasError(error?.response?.data?.message));
    }
};

// Thunk action to fetch one Address by id
export const getOneAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/getAddresses/${id}`);
        console.log("response",response)
        dispatch(getOneAddressSuccess(response?.data?.address));
    } catch (error) {
        console.error("Error fetching :", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};

export function postAddress(payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/storeAddresses', payload);
            dispatch(postAddressSuccess(response.data.testimonial));
            toast.success(response.data.message)
        } catch (error) {
            toast.success(error?.message)
            dispatch(hasError(error));
        }
    };
}

export function putAddress(id, payload, toast,navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/updateAddresses/${id}`, payload);
            console.log("responseresponse",response)
            dispatch(postAddressSuccess(response?.data));
            toast.success(response.data.message)
            navigate('/my-account/address-book')
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}

export function deleteAddress(id, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.delete(`/deleteAddresses/${id}`);
            dispatch(deleteAddressSuccess(response.data.status));
            toast.success(response.data?.message)
        } catch (error) {
            toast.error(error?.message)
            dispatch(hasError(error));
        }
    };
}