import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    isLoadingLogin: false,
    error: null,
    registerUser: {},
    loginUser: {},
    userAccessToken: null,
    userForgotPassword: {},
};

const accessToken = typeof window !== "undefined" ? localStorage.getItem("accessToken") : "";

const headers = {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json'
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
                reset();
                toast.success("You’re logged in. Check out new updates or start using your account.");
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                localStorage.setItem("cart_id", response?.data?.cart_id);
                localStorage.setItem("accessToken", response?.data?.access_token);
            } else {
                toast.error("Check your credentials and try again");
            }
        } catch (error) {
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

export function postLogoutUser({ toast, navigate }) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/logout', {}, { headers });

            if (response?.data?.status === true) {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('cart_id');
                localStorage.removeItem('shipAddress');
                localStorage.removeItem('billAddress');
                dispatch(getLoginSuccess(null));
                dispatch(getLoginAccessTokenSuccess(null));
                navigate('/login');
                toast.success("You’ve successfully logged out");
            } else {
                toast.error("Try again or reach out for support if the issue persists");
            }
        } catch (error) {
            dispatch(hasError(error.response?.data?.message || "Logout failed"));
            toast.error(error.response?.data?.message || "Try again or reach out for support if the issue persists");
        }
    };
}
