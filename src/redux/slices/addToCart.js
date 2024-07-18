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
        // ACCESS Cart Id
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

// get all cart
export function getAllCartItems(cart_id,payload) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.get(`/cart/${cart_id}`, {
                params: payload 
            });
            dispatch(getAllCartItemsSuccess(response?.data?.cart));
        } catch (error) {
            dispatch(hasError(error?.response?.data?.message));
        }
    };
}

// POST add to cart
export function addCartItems(cartItem, toast, navigate) {
    return async (dispatch) => {
        try {

            dispatch(startLoading());
            console.log("response", cartItem)
            const response = await axios.post("/addtocart", cartItem);
            dispatch(addToCartSuccess(response?.data));
            console.log("response", response)
            dispatch(
                getCartIdSuccess(response?.data?.cart_id)
            );
            if (response.data.status == true) {
                navigate('/cart');
                toast.success(response?.data?.message);
                localStorage.setItem("cart_id", response?.data?.cart_id);
                window.location.reload();
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error("Error fetching Forgot Password:", error?.response?.data);
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.message);
        }
    };
}

// update cart
export function putCartItme(itemId, payload, toast) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.put(`/cart/updateItem/${itemId}`, payload);
            if (response.data?.status == true) {
                // toast.success(response.data?.message);
                window.location.reload();
            } else {
                toast.error(response.data?.message);
            }
        } catch (error) {
        }
    };
}

export function deleteCartItem(itemId, toast) {
    return async (dispatch) => {
        try {
            const response = await axios.delete('/cart/removeItem/' + itemId);
            dispatch(deleteCartSuccess(response?.data?.status));
            toast.success(response?.data?.message);
            window.location.reload();
        } catch (error) {
            toast.error(error?.message);
            dispatch(hasError(error));
        }
    };
}








