import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { getAllCartItems } from "./addToCart";

const initialState = {
    isLoadingLogin: false,
    isLoading: false,
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

const Slice = createSlice({
    name: "LoginRegister",
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
            state.error = action.payload;
        },

        // POST RAGISTER
        getRegisterSuccess(state, action) {
            state.isLoading = false;
            state.registerUser = action.payload;
        },

        // LOGIN RAGISTER
        getLoginSuccess(state, action) {
            state.isLoading = false;
            state.isLoadingLogin = false;
            state.loginUser = action.payload;
        },

        // ACCESS TOKEN
        getLoginAccessTokenSuccess(state, action) {
            state.isLoadingLogin = false;
            state.userAccessToken = action.payload;
        },
        
        getForgotPassworSuccess(state, action) {
            state.isLoading = false;
            state.userForgotPassword = action.payload;
        },
    },
});

export const {
    startLoadingLogin,
    startLoading,
    hasError,
    getRegisterSuccess,
    getLoginAccessTokenSuccess,
    getForgotPassworSuccess,
    getLoginSuccess,
} = Slice.actions;

export default Slice.reducer;


// POST RAGISTER
export function postRegisterUser(formData, reset, toast, navigate) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/register", formData);
            dispatch(getRegisterSuccess(response?.data));

            if (response?.data?.status == true) {
                reset();
                toast.success("Log in to get started or verify your email for full access.");
                navigate('/login');
            } else {
                toast.error("Ensure your information is correct and try registering again");
            }
        } catch (error) {
            reset();
            console.error("Ensure your information is correct and try registering again.", error);
            dispatch(hasError(error));
            toast.error("Ensure your information is correct and try registering again");
            if (error?.response?.data?.status == false) {
                toast.error(error?.response?.data?.message);
                toast.error(error?.response?.data?.errors?.email[0]);
                toast.error(error?.response?.data?.errors?.contact[0]);
            }
        }
    };
}

// LOGIN RAGISTER
export function postLoginUser(payload, toast, reset, navigate, handleClick) {
    return async (dispatch) => {
        try {
            dispatch(startLoadingLogin());
            const response = await axios.post("/login", payload);
            dispatch(getLoginSuccess(response?.data?.user));
            dispatch(
                getLoginAccessTokenSuccess(response?.data?.access_token)
            );
            if (response.data.status == true) {
                reset();
                if (handleClick) {
                    handleClick()
                }else {
                    navigate('/');
                }
                window.location.reload();
                toast.success("You’re logged in. Check out new updates or start using your account.");
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                localStorage.setItem("cartid", response?.data?.cart_id);
                localStorage.setItem("accessToken", response?.data?.access_token);
            } else {
                toast.error("Check your credentials and try again");
            }
        } catch (error) {
            reset();
            console.error("Check your credentials and try again", error);
            dispatch(hasError(error));
            toast.error("Check your credentials and try again");
            if (error?.response?.data?.status == false) {
                dispatch(getLoginSuccess(null));
                dispatch(getLoginAccessTokenSuccess(null));
            }
        }
    };
}

// POST Forgot Password
export function postForgotPasswordUser(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/forgot-password", payload, { headers });
            dispatch(getForgotPassworSuccess(response?.data));
            if (response?.data?.status == true) {
                toast.success("Check your email to proceed with resetting your password.");
                reset();
            } else {
                toast.error("Double-check your email address and try again");
            }
        } catch (error) {
            reset();
            console.error("Double-check your email address and try again", error);
            toast.error("Double-check your email address and try again");
            dispatch(hasError(error));
        }
    };
}

// POST Reset Password
export function postResetPasswordUser(payload, toast, reset) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post("/reset-password", payload, { headers });
            if (response?.data?.status == true) {
                toast.success("Your password has been successfully changed. Please log in");
                reset();
            } else {
                toast.error("Ensure the link is correct and not expired, then try again.");
            }
        } catch (error) {
            reset();
            console.error("Ensure the link is correct and not expired, then try again.", error);
            dispatch(hasError(error));
            toast.error(error?.message);
        }
    };
}


// USER LOG OUT
export function postLogoutUser({ toast, navigate }) {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            const response = await axios.post('/logout', {}, { headers });
            if (response?.data?.status == true) {
                localStorage.removeItem('user');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('cart_id');
                localStorage.removeItem('shipAddress');
                localStorage.removeItem('billAddress');
                window.location.reload();
                dispatch(getLoginSuccess(null));
                dispatch(getLoginAccessTokenSuccess(null));
                navigate('/login');
                toast.success("You’ve Successfully Logged Out");
            } else {
                toast.error("Try again or reach out for support if the issue persists");
            }
        } catch (error) {
            dispatch(hasError(error));
            toast.error("Try again or reach out for support if the issue persists");
        }
    };
}