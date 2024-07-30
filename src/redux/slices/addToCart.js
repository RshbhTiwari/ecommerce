import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allCartItems: {},
    cartId: null,
    cartItem: {},
    deleteStatus: false,
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
};

const cartSlice = createSlice({
    name: "addToCart",
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
        addToCartSuccess(state, action) {
            state.isLoading = false;
            state.cartItem = action.payload;
        },
        getAllCartItemsSuccess(state, action) {
            state.isLoading = false;
            state.allCartItems = action.payload;
        },
        getCartIdSuccess(state, action) {
            state.isLoading = false;
            state.cartId = action.payload;
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
    addToCartSuccess,
    getAllCartItemsSuccess,
    getCartIdSuccess,
    deleteCartSuccess,
} = cartSlice.actions;

export default cartSlice.reducer;

export function getAllCartItems(cart_id, payload) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.get(`/cart/${cart_id}`, {
                params: payload,
                headers
            });
            dispatch(getAllCartItemsSuccess(response?.data?.cart));
        } catch (error) {
            console.error("Error fetching cart items. Please refresh the page and try again.", error);
            dispatch(hasError(error.message || "Error fetching cart items"));
        }
    };
}

export function addCartItems(cartItem, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/addtocart", cartItem, { headers });
            dispatch(addToCartSuccess(response?.data));
            dispatch(getCartIdSuccess(response?.data?.cart_id));
            if (response?.data?.status === true) {
                navigate('/cart');
                toast.success("Continue shopping or view your cart.");
                localStorage.setItem("cart_id", response?.data?.cart_id);
            } else {
                toast.error("Ensure the item is available and try again later");
            }
        } catch (error) {
            console.error("Error adding item to cart. Ensure the item is available and try again later.", error);
            toast.error("Ensure the item is available and try again later.");
            dispatch(hasError(error.message || "Error adding item to cart"));
        }
    };
}

export function putCartItem(itemId, payload, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/cart/updateItem/${itemId}`, payload, { headers });
            if (response?.data?.status === true) {
                toast.success("View your updated cart or explore more products.");
            } else {
                toast.error("Retry the update or check your internet connection.");
            }
        } catch (error) {
            console.error("Error updating cart item. Retry the update or check your internet connection.", error);
            toast.error("Retry the update or check your internet connection.");
            dispatch(hasError(error.message || "Error updating cart item"));
        }
    };
}

export function deleteCartItem(itemId, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.delete(`/cart/removeItem/${itemId}`, { headers });
            dispatch(deleteCartSuccess(response?.data?.status));
            if (response?.data?.status === true) {
                toast.success("See your updated cart or add more items.");
            } else {
                toast.error("Verify the item and try deleting it again.");
            }
        } catch (error) {
            console.error("Error deleting cart item. Verify the item and try deleting it again.", error);
            toast.error("Verify the item and try deleting it again.");
            dispatch(hasError(error.message || "Error deleting cart item"));
        }
    };
}
