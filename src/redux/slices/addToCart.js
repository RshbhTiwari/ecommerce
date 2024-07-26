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
            state.isLoadingLogin = false;
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
                params: payload
            });
            dispatch(getAllCartItemsSuccess(response?.data?.cart));
        } catch (error) {
            console.error("Please refresh the page and try again.", error);
            dispatch(hasError(error));
        }
    };
}

export function addCartItems(cartItem, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/addtocart", cartItem);
            dispatch(addToCartSuccess(response?.data));
            dispatch(
                getCartIdSuccess(response?.data?.cart_id)
            );
            if (response?.data?.status == true) {
                navigate('/cart');
                toast.success("Continue shopping or view your cart.");
                localStorage.setItem("cart_id", response?.data?.cart_id);
                window.location.reload();
            } else {
                toast.error("Ensure the item is available and try again later");
            }
        } catch (error) {
            dispatch(hasError(error));
            console.error("Ensure the item is available and try again later.", error);
            toast.error("Ensure the item is available and try again later.");
        }
    };
}

export function putCartItme(itemId, payload, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/cart/updateItem/${itemId}`, payload);
            if (response?.data?.status == true) {
                toast.success("View your updated cart or explore more products.");
                window.location.reload();
            } else {
                toast.error("Retry the update or check your internet connection.");
            }
        } catch (error) {
            dispatch(hasError(error));
            console.error("Retry the update or check your internet connection.", error);
            toast.error("Retry the update or check your internet connection.");
        }
    };
}

export function deleteCartItem(itemId, toast) {
    return async (dispatch) => {
        try {
            const response = await axios.delete('/cart/removeItem/' + itemId);
            dispatch(deleteCartSuccess(response?.data?.status));
            if (response?.data?.status == true) {
                toast.success("See your updated cart or add more items");
                window.location.reload();
            } else {
                toast.error("Verify the item and try deleting it again.");
            }
        } catch (error) {
            dispatch(hasError(error));
            console.error("Verify the item and try deleting it again.", error);
            toast.error("Verify the item and try deleting it again.");
        }
    };
}








