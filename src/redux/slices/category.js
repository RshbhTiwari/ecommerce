import { createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
    categorys: [],
    onecategory: {},
};

const header = {
    "Content-type": "multipart/form-data",
};

const jsonheader = {
    "Content-type": "application/json",
};

const Slice = createSlice({
    name: "Category",
    initialState,
    reducers: {
        //  GET ALL Category
        getAllCategorySuccess(state, action) {
            state.categorys = action.payload;
        },

        //  GET one Category
        getOneCategoryuccess(state, action) {
            state.onecategory = action.payload;
        },
    },
});

export default Slice.reducer;

// GET ALL Category
export function getAllCategory() {
    return async (dispatch) => {
        try {
            const response = await axios.get("/products");
            dispatch(Slice.actions.getAllCategorySuccess(response.data.products));
        } catch (error) {
            console.log(error);
        }
    };
}

// GET one Category
export function getOneCategory(id) {
    return async (dispatch) => {
        try {
            const response = await axios.get("/products/" + id, {
                headers: jsonheader,
            });
            dispatch(Slice.actions.getOneCategoryuccess(response.data));
        } catch (error) {
            console.log(error);
        }
    };
}
