import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { getAllCartItems } from "./addToCart";

const initialState = {
    isLoading: false,
    isLoadingLogin: false,
    error: null,
    registerUser: {},
    loginUser: {},
    userAccessToken: null,
    userForgotPassword: {},
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null;
        },
        startLoadingLogin(state) {
            state.isLoadingLogin = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.isLoadingLogin = false;
            state.error = action.payload;
        },
        getRegisterSuccess(state, action) {
            state.isLoading = false;
            state.registerUser = action.payload;
        },
        getLoginSuccess(state, action) {
            state.isLoading = false;
            state.isLoadingLogin = false;
            state.loginUser = action.payload;
        },
        getLoginAccessTokenSuccess(state, action) {
            state.isLoadingLogin = false;
            state.userAccessToken = action.payload;
        },
        getForgotPasswordSuccess(state, action) {
            state.isLoading = false;
            state.userForgotPassword = action.payload;
        },
    },
});

export const {
    startLoading,
    startLoadingLogin,
    hasError,
    getRegisterSuccess,
    getLoginSuccess,
    getLoginAccessTokenSuccess,
    getForgotPasswordSuccess,
} = slice.actions;

export default slice.reducer;

export function postRegisterUser(formData, reset, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/register", formData);
            dispatch(getRegisterSuccess(response?.data));

            if (response?.data?.status === true) {
                reset();
                toast.success("Log in to get started or verify your email for full access.");
                navigate('/login');
            } else {
                toast.error("Ensure your information is correct and try registering again");
            }
        } catch (error) {
            reset();
            console.error("Error during registration:", error);
            dispatch(hasError(error.response?.data?.message || "Registration failed"));
            toast.error(error.response?.data?.message || "Ensure your information is correct and try registering again");
        }
    };
}

export function postLoginUser(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoadingLogin());
            const response = await axios.post("/login", payload);
            dispatch(getLoginSuccess(response?.data?.user));
            dispatch(getLoginAccessTokenSuccess(response?.data?.access_token));

            if (response?.data?.status === true) {
                // Remove existing cart_id from localStorage
                localStorage.removeItem("cart_id");

                // Set new values in localStorage
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                localStorage.setItem("cart_id", response?.data?.cart_id); // Save new cart_id
                localStorage.setItem("accessToken", response?.data?.access_token);

                // Reset form and show success message
                reset();
                toast.success("You’re logged in. Check out new updates or start using your account.");

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
            } else {
                toast.error("Check your credentials and try again");
            }
        } catch (error) {
            // Reset form and handle error
            reset();
            console.error("Error during login:", error);
            dispatch(hasError(error.response?.data?.message || "Login failed"));
            toast.error(error.response?.data?.message || "Check your credentials and try again");
        }
    };
}


export function postForgotPasswordUser(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/forgot-password", payload);
            dispatch(getForgotPasswordSuccess(response?.data));

            if (response?.data?.status === true) {
                toast.success("Check your email to proceed with resetting your password.");
                reset();
            } else {
                toast.error("Double-check your email address and try again");
            }
        } catch (error) {
            reset();
            console.error("Error during forgot password request:", error);
            dispatch(hasError(error.response?.data?.message || "Forgot password request failed"));
            toast.error(error.response?.data?.message || "Double-check your email address and try again");
        }
    };
}

export function postResetPasswordUser(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/reset-password", payload);

            if (response?.data?.status === true) {
                toast.success("Your password has been successfully changed. Please log in");
                reset();
            } else {
                toast.error("Ensure the link is correct and not expired, then try again.");
            }
        } catch (error) {
            reset();
            console.error("Error during reset password request:", error);
            dispatch(hasError(error.response?.data?.message || "Reset password request failed"));
            toast.error(error.response?.data?.message || "Ensure the link is correct and not expired, then try again.");
        }
    };
}


export function postLogoutUser(toast, navigate) {
    return async (dispatch) => {
        dispatch(startLoading());

        try {
            const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : '';

            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };

            const response = await axios.post('/logout', {}, { headers });

            if (response?.data?.status) { // Simplified check
                // Clear local storage
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('shipAddress');
                localStorage.removeItem('billAddress');
                localStorage.removeItem('cart_id');
                
                // Dispatch success actions
                dispatch(getLoginSuccess(null));
                dispatch(getLoginAccessTokenSuccess(null));

                // Navigate to login page
                navigate('/login');

                // Show success toast message
                toast.success("You’ve successfully logged out");

                return Promise.resolve();
            } else {
                // If the response status is not as expected
                throw new Error(response?.data?.message || "Logout failed");
            }
        } catch (error) {
            // Improved error handling
            const errorMessage = error.response?.data?.message || "Logout failed";
            console.error('Error Response:', error.response);

            // Dispatch error action
            dispatch(hasError(errorMessage));

            // Optionally show error toast message
            toast.error(errorMessage);
        }
    };
}

