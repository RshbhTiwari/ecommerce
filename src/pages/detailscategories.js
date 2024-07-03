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
  
    return (
        <>
            <DetailsCategoriesPages  id={id}/>
        </>
    );
}

export default DetailsCategories;