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

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

// Create the slice
const addressSlice = createSlice({
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
} = addressSlice.actions;

export default addressSlice.reducer;

export const getAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/addresses/${id}`, { headers });
        dispatch(getAllAddressSuccess(response?.data?.addresses));
    } catch (error) {
        console.error("Unable to retrieve address list. Please try again later", error);
        dispatch(hasError(error.message || "Error retrieving address list"));
    }
};

export const getOneAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/getAddresses/${id}`, { headers });
        dispatch(getOneAddressSuccess(response?.data?.address));
    } catch (error) {
        console.error("Failed to load address details. Please try again later", error);
        dispatch(hasError(error.message || "Error loading address details"));
    }
};

export function postAddress(payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/storeAddresses', payload, { headers });
            if (response?.data?.status === true) {
                navigate('/my-account/address-book')
                toast.success("Address added successfully!");
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            console.error("Unable to add address. Please try again later", error);
            dispatch(hasError(error.message || "Error adding address"));
        }
    };
}


export function postAddressBillingCheckout(payload, toast, handleClick, paymentClick) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/storeAddresses', payload, { headers });
            if (response?.data?.status === true) {
                if (payload?.is_shipping === true) {
                    paymentClick()
                } else {
                    handleClick()
                }
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                dispatch(getAddress(customer_id));
                toast.success("Address added successfully!");
            }
        } catch (error) {
            console.error("Unable to add address. Please try again later", error);
            toast.error('Unable to add address. Please try again later');
            dispatch(hasError(error.message || "Error adding address"));
        }
    };
}

export function postShipingAddressCheckout(payload, toast, handleClick) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/storeAddresses', payload, { headers });
            if (response?.data?.status === true) {
                handleClick()
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                dispatch(getAddress(customer_id));
                toast.success("Address added successfully!");
            }
        } catch (error) {
            console.error("Unable to add address. Please try again later", error);
            toast.error('Unable to add address. Please try again later');
            dispatch(hasError(error.message || "Error adding address"));
        }
    };
}

export function postCheckboxAddress(payload, toast, handleClick) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/cart/attach-address', payload, { headers });
            if (response?.data?.status === true) {
                toast.success(response?.data?.message);
                handleClick()
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

export function putAddress(id, payload, toast, navigate, onClose) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/updateAddresses/${id}`, payload, { headers });
            dispatch(postAddressSuccess(response?.data));
            if (response?.data?.status === true) {
                if (navigate) { navigate('/my-account/address-book'); }
                toast.success("Address updated successfully!");
                onClose()
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        } catch (error) {
            dispatch(hasError(error.message || "Error updating address"));
            console.error("Error updating address", error);
        }
    };
}

export function putModelAddress(id, payload, toast, onClose) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/updateAddresses/${id}`, payload, { headers });
            dispatch(postAddressSuccess(response?.data));
            if (response?.data?.status === true) {
                onClose()
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                dispatch(getAddress(customer_id));
                toast.success("Address updated successfully!");
            }
        } catch (error) {
            dispatch(hasError(error.message || "Error updating address"));
            toast.error("Please check your input and try again.");
            console.error("Error updating address", error);
        }
    };
}

export function deleteAddress(id, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.delete(`/deleteAddresses/${id}`, { headers });
            dispatch(deleteAddressSuccess(response.data.status));
            if (response?.data?.status === true) {
                toast.success(response.data?.message);
            } else {
                toast.error("Unable to remove address. It might be in use.");
            }
        } catch (error) {
            dispatch(hasError(error.message || "Error removing address"));
            toast.error("Unable to remove address. It might be in use.");
            console.error("Error removing address", error);
        }
    };
}
