import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    isLoading: false,
    error: null,
    categories: [],
    featured: [],
    oneCategory: {},
    oneSubCategory: {},
};

const header = {
    "Content-type": "multipart/form-data",
};

const jsonheader = {
    "Content-type": "application/json",
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
            state.error = null; // Reset error state on loading start
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        getAllCategoriesSuccess(state, action) {
            state.isLoading = false;
            state.categories = action.payload;
        },
        getFeaturedSuccess(state, action) {
            state.isLoading = false;
            state.featured = action.payload;
        },
        getOneCategorySuccess(state, action) {
            state.isLoading = false;
            state.oneCategory = action.payload;
        },
        getOneSubCategorySuccess(state, action) {
            state.isLoading = false;
            state.oneSubCategory = action.payload;
        },
    },
});

export const {
    startLoading,
    hasError,
    getAllCategoriesSuccess,
    getFeaturedSuccess,
    getOneSubCategorySuccess,
    getOneCategorySuccess,
} = categorySlice.actions;

export default categorySlice.reducer;

// Thunk action to fetch all Featured categories
export const fetchAllFeaturedCategories = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/categories/featured");
        dispatch(getFeaturedSuccess(response?.data?.featuredCategory));
    } catch (error) {
        console.error("Error fetching categories:", error.response.data.message);
        dispatch(hasError(error?.response?.data?.message));
    }
};


// Thunk action to fetch all categories
export const fetchAllCategories = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/categories");
        dispatch(getAllCategoriesSuccess(response?.data?.categories));
    } catch (error) {
        console.error("Error fetching categories:", error.response?.data?.message);
        dispatch(hasError(error?.response?.data?.message));
    }
};

// Thunk action to fetch one category by id
export const fetchOneCategory = (id) => async (dispatch) => {
    console.log("idididid", id)
    try {
        dispatch(startLoading());
        const response = await axios.get(`/category/${id}`);
        console.log("idididid", response?.data?.category)
        dispatch(getOneCategorySuccess(response?.data?.category));
    } catch (error) {
        console.error("Error fetching category:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};

// Thunk action to fetch one sub category by id
export const fetchOneSubCategory = (id) => async (dispatch) => {
    console.log("idididid", id)
    try {
        dispatch(startLoading());
        const response = await axios.get(`/subcategory/${id}`);
        console.log("idididid", response?.data?.subcategory)
        dispatch(getOneSubCategorySuccess(response?.data?.subcategory));
    } catch (error) {
        console.error("Error fetching subcategory:", error.response?.data?.message);
        dispatch(hasError(error.response?.data?.message));
    }
};