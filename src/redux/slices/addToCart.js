import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allCartItems: {},
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
      
        deleteCartSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },

        updateCartItemSuccess(state, action) {
            state.isLoading = false;
            const updatedItem = action.payload;
            if (state.allCartItems[updatedItem.item_id]) {
                state.allCartItems[updatedItem.item_id] = updatedItem;
            }
        },
    },
});

export const {
    startLoading,
    hasError,
    addToCartSuccess,
    getAllCartItemsSuccess,
    deleteCartSuccess,
    updateCartItemSuccess,
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
            if (response?.data?.cart) {
                dispatch(getAllCartItemsSuccess(response.data.cart));
            } else {
                dispatch(getAllCartItemsSuccess([])); // Handle empty cart scenario
            }
        } catch (error) {
            console.error("Error fetching cart items. Please refresh the page and try again.", error);
            dispatch(hasError(error.message || "Error fetching cart items"));
        }
    };
}

export function addCartItems(cartItem, toast, navigate,Buynow) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/addtocart", cartItem, { headers });
            dispatch(addToCartSuccess(response?.data));
            console.log(response?.data?.cart_id)
            localStorage.setItem("cart_id", response?.data?.cart_id);
            if (response?.data?.status === true) {
                
                const cart_id = localStorage?.getItem('cart_id') || null;
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                const token = localStorage?.getItem('accessToken') || null;
                if (token) {
                    const payload = {
                        status: true,
                    };
                    dispatch(getAllCartItems(customer_id, payload));
                } else {
                    const payload = {
                        status: false,
                    };
                    dispatch(getAllCartItems(cart_id, payload));
                }

                if (Buynow) {
                    navigate('/checkout');
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                } 
                // else {
                //     navigate('/cart');
                //     window.scrollTo({
                //         top: 0,
                //         behavior: 'smooth'
                //     });
                // }
               
                toast.success("Continue shopping or view your cart.");
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
            console.log("responseput", response)
            if (response?.data?.status === true) {
                const cart_id = localStorage?.getItem('cart_id') || null;
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                const token = localStorage?.getItem('accessToken') || null;
                if (token) {
                    const payload = {
                        status: true,
                    };
                    dispatch(getAllCartItems(customer_id, payload));
                } else {
                    const payload = {
                        status: false,
                    };
                    dispatch(getAllCartItems(cart_id, payload));
                }
                toast.success("Cart updated successfully.");
            } else {
                toast.error("Failed to update the cart. Please try again.");
            }
        } catch (error) {
            console.error("Error updating cart item:", error);
            toast.error("Error updating cart item. Please try again.");
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
                const cart_id = localStorage?.getItem('cart_id') || null;
                const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
                const token = localStorage?.getItem('accessToken') || null;
                if (token) {
                    const payload = {
                        status: true,
                    };
                    dispatch(getAllCartItems(customer_id, payload));
                } else {
                    const payload = {
                        status: false,
                    };
                    dispatch(getAllCartItems(cart_id, payload));
                }
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
