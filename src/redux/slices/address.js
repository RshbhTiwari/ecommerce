import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    allAddress: [],
    oneAddress: {},

    addAddress: {},
    deleteStatus: false
};

const Slice = createSlice({
    name: "address",
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

        getAllAddressSuccess(state, action) {
            state.isLoading = false;
            state.allAddress = action.payload;
        },
        getOneAddressSuccess(state, action) {
            state.isLoading = false;
            state.oneAddress = action.payload;
        },

        postAddressSuccess(state, action) {
            state.isLoading = false;
            state.addAddress = action.payload;
        },
        deleteAddressSuccess(state, action) {
            state.isLoading = false;
            state.deleteStatus = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllAddressSuccess,
    getOneAddressSuccess,
    postAddressSuccess,
    deleteAddressSuccess
} = Slice.actions;

export default Slice.reducer;

// Thunk action to fetch all Address
export const getAddress = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/products");
        dispatch(getAllAddressSuccess(response?.data?.products));
    } catch (error) {
        console.error("Error fetching product:", error?.response?.data?.message);
        dispatch(hasError(error?.response?.data?.message));
    }
};

// Thunk action to fetch one Product by id
export const getOneAddress = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/product/${id}`);
        dispatch(getOneAddressSuccess(response?.data?.product));
    } catch (error) {
        console.error("Error fetching product:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};


// export function postTestimonials(formData, toast) {
//     return async () => {
//         dispatch(slice.actions.startLoading());
//         try {
//             const response = await axios.post('/testimonials/add', formData, { headers: jsonheader });
//             dispatch(slice.actions.postTestimonialsSuccess(response.data.testimonial));
//             toast.success(response.data.message)
//         } catch (error) {
//             toast.success(error.message)
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function putTestimonials(id, formData, toast) {
//     return async () => {
//         dispatch(slice.actions.startLoading());
//         try {
//             const response = await axios.put('/testimonials/update/' + id, formData, { headers: jsonheader });
//             dispatch(slice.actions.postTestimonialsSuccess(response.data.testimonial));
//             toast.success(response.data.message)
//         } catch (error) {
//             toast.success(error.message)
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }

// export function deleteTestimonials(id, toast) {
//     return async () => {
//         dispatch(slice.actions.startLoading());
//         try {
//             const response = await axios.delete('/testimonials/delete/' + id, { headers: header });
//             dispatch(slice.actions.deleteTestimonialSuccess(response.data.status));
//             toast.success(response.data?.message)
//         } catch (error) {
//             toast.error(error?.message)
//             dispatch(slice.actions.hasError(error));
//         }
//     };
// }