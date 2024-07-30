import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    wishlist: [],
    deleteStatus: false,
};

const getHeaders = () => {
    const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";
    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
};

const wishlistSlice = createSlice({
    name: "wishlist",
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
        getWishlistSuccess(state, action) {
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
    getWishlistSuccess,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

export const getWishlist = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get('/getWishlist', { headers: getHeaders() });
        dispatch(getWishlistSuccess(response?.data?.wishlistItems || []));
    } catch (error) {
        dispatch(hasError(error?.response?.data?.message || "Failed to fetch wishlist"));
    }
};

export function postWishlistUser(payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/addWishlist", payload, { headers: getHeaders() });
            toast.success(response?.data?.message || "Item added to wishlist");
            navigate('/my-account/wishlist');
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message || "Failed to add item to wishlist"));
            toast.error(error?.message || "An error occurred");
        }
    };
}

export function postMoveCartItem(payload, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/wishlist/move-to-cart", payload, { headers: getHeaders() });
            toast.success(response?.data?.message || "Item moved to cart");
            navigate('/cart');
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message || "Failed to move item to cart"));
            toast.error(error?.message || "An error occurred");
        }
    };
}

export function deleteWishlistCartItem(itemId, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.delete(`/wishlist/${itemId}`, { headers: getHeaders() });
            dispatch(deleteCartSuccess(response?.data?.status || false));
            toast.success(response?.data?.message || "Item removed from wishlist");
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message || "Failed to delete item from wishlist"));
            toast.error(error?.message || "An error occurred");
        }
    };
}
