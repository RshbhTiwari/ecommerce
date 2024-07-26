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

const categorySlice = createSlice({
    name: "category",
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

export const fetchAllFeaturedCategories = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/categories/featured");
        dispatch(getFeaturedSuccess(response?.data?.featuredCategory));
    } catch (error) {
        console.error("Refresh the page and try again later.", error);
        dispatch(hasError(error));
    }
};

export const fetchAllCategories = () => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get("/categories");
        dispatch(getAllCategoriesSuccess(response?.data?.categories));
    } catch (error) {
        console.error("Refresh the page and try again later.", error);
        dispatch(hasError(error));
    }
};

export const fetchOneCategory = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/category/${id}`);
        dispatch(getOneCategorySuccess(response?.data?.category));
    } catch (error) {
        console.error("Verify the category details or contact support.", error);
        dispatch(hasError(error));
    }
};

export const fetchOneSubCategory = (id) => async (dispatch) => {
    try {
        dispatch(startLoading());
        const response = await axios.get(`/subcategory/${id}`);
        dispatch(getOneSubCategorySuccess(response?.data?.subcategory));
    } catch (error) {
        console.error("Please try again or check your internet connection.", error);
        dispatch(hasError(error));
    }
};