import { DetailsCategoriesPages } from "./components/categories";
import {
    fetchOneCategory,
    startLoading,
    hasError,
} from "../redux/slices/category";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function DetailsCategories() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { isLoading, error, oneCategory } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        dispatch(fetchOneCategory(id)); // Dispatch action to fetch category based on id
    }, [dispatch, id]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error....</p>;
    }

    return (
        <>
            <DetailsCategoriesPages categoriesData={oneCategory} />
        </>
    );
}

export default DetailsCategories;