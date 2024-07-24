import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    wishlist: [],
    deleteStatus: false,
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

const wishlistSlice = createSlice({
    name: "wishlist",
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

        getwishlistSuccess(state, action) {
            state.isLoading = false;
            state.wishlist = action.payload;
        },
        deleteCartSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    deleteCartSuccess,
    getwishlistSuccess,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;


export const getwishlist = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get('/getWishlist', { headers });
        dispatch(getwishlistSuccess(response?.data?.wishlistItems));
    } catch (error) {
        dispatch(hasError(error?.response?.data?.message));
    }
}; 

export function postWishlistUser(payload, toast,navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/addWishlist", payload, { headers });
            toast.success(response?.data?.message);
            navigate('/my-account/wishlist')
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.message);
        }
    };
}

export function postMoveCartItme(payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/wishlist/move-to-cart", payload, { headers });
            toast.success(response?.data?.message);
            navigate('/cart')
            window.location.reload();
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.message);
        }
    };
}



export function deletewishlistCartItem(itemId, toast) {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`/wishlist/${itemId}`, { headers });
            dispatch(deleteCartSuccess(response?.data?.status));
            toast.success(response?.data?.message);
            window.location.reload();
        } catch (error) {
            toast.error(error?.message);
            dispatch(hasError(error));
        }
    };
}