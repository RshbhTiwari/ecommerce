import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

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

const jsonheader = {
    "Content-Type": "application/json",
    "x-access-token": accessToken,
};

const header = {
    "Content-type": "multipart/form-data",
};

const Slice = createSlice({
    name: "LoginRegister",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null; // Reset error state on loading start
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
        // ACCESS TOKEN
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
export function postRegisterUser(formData, reset, toast,navigate) {
    return async (dispatch) => {
        try {
          
            dispatch(startLoading());
            const response = await axios.post("/register", formData);
            dispatch(getRegisterSuccess(response?.data));
            if (response?.data?.status == true) {
                reset();
                toast.success(response?.data?.message);
                navigate('/login');
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            reset();
            console.error("Error fetching Register:", error?.response?.data);
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.message);
            if (error?.response?.data?.status == false) {
                toast.error(error?.response?.data?.message);
                toast.error(error?.response?.data?.errors?.email[0]);
                toast.error(error?.response?.data?.errors?.contact[0]);
            }
        }
    };
}

// LOGIN RAGISTER
export function postLoginUser(payload, toast, reset,navigate,setLoading) {
    return async (dispatch) => {
        try {
            dispatch(startLoadingLogin());
            const response = await axios.post("/login", payload);
            dispatch(getLoginSuccess(response?.data));
            dispatch(
                getLoginAccessTokenSuccess(response?.data?.access_token)
            );
            if (response.data.status == true) {
                reset();
                navigate('/');
                toast.success(response?.data?.message);
                console.log("response.data.user", response.data.user)
                localStorage.setItem("user", JSON.stringify(response?.data?.user));
                localStorage.setItem("accessToken", response?.data?.access_token);
                setLoading(false);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            reset();
            console.error("Error fetching login:", error?.response?.data?.status);
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.response?.data?.message);
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
            const response = await axios.post("/forgot-password", payload, { headers: jsonheader });
            dispatch(getForgotPassworSuccess(response?.data));
            console.log("datadatadatadatadata response", response);
            toast.success(response?.data?.message);
            reset();
        } catch (error) {
            reset();
            console.error("Error fetching Forgot Password:", error?.response?.data);
            dispatch(hasError(error?.response?.data?.message));
            toast.error(error?.message);
        }
    };
}


// USER LOG OUT
export function postLogoutUser() {
    return async (dispatch) => {
        try {
            dispatch(startLoading());
            dispatch(getLoginSuccess(null));
            dispatch(getLoginAccessTokenSuccess(null));
            localStorage.removeItem("user");
            localStorage.removeItem("accessToken");
        } catch (error) {
            dispatch(hasError(error));
        }
    };
}