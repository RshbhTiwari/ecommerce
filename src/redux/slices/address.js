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

export const getAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/addresses/${id}`);
        dispatch(getAllAddressSuccess(response?.data?.addresses));
    } catch (error) {
        console.error("Unable to retrieve address list. Please try again later", error);
        dispatch(hasError(error));
    }
};

export const getOneAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/getAddresses/${id}`);
        dispatch(getOneAddressSuccess(response?.data?.address));
    } catch (error) {
        console.error("Failed to load address details. Please try again later", error);
        dispatch(hasError(error));
    }
};

export function postAddress(payload, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/storeAddresses', payload);
            if (response?.data?.status == true) {
                toast.success("Address added successfully!");
            } else {
                toast.error('Unable to add address. Please try again later');
            }
        } catch (error) {
            console.error("Unable to add address. Please try again later", error);
            toast.error('Unable to add address. Please try again later');
            dispatch(hasError(error));
        }
    };
}

export function postCheckboxAddress(payload, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/cart/attach-address', payload);
            if (response?.data?.status == true) {
                toast.success(response?.data?.message)
            } else {
                toast.error("Address Linking Failed")
            }
        } catch (error) {
            console.error("Address Linking Failed", error);
            toast.error("Address Linking Failed")
            dispatch(hasError(error));
        }
    };
}

export function putAddress(id, payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/updateAddresses/${id}`, payload);
            dispatch(postAddressSuccess(response?.data));

            if (response?.data?.status == true) {
                toast.success("Address updated successfully!")
                navigate('/my-account/address-book')
            } else {
                toast.error("Please check your input and try again.")
            }
        } catch (error) {
            dispatch(hasError(error));
            toast.error("Please check your input and try again.")
            console.error("Please check your input and try again.", error);
        }
    };
}

export function deleteAddress(id, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.delete(`/deleteAddresses/${id}`);
            dispatch(deleteAddressSuccess(response.data.status));
            if (response?.data?.status == true) {
                toast.success(response.data?.message)
            } else {
                toast.error("Unable to remove address. It might be in use.")
            }
        } catch (error) {
            dispatch(hasError(error));
            toast.error("Unable to remove address. It might be in use.")
            console.error("Unable to remove address. It might be in use.", error);
        }
    };
}