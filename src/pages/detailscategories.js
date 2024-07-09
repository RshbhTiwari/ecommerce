import { DetailsCategoriesPages } from "./components/categories";
import { useParams } from "react-router-dom";

function DetailsCategories() {
    const { id } = useParams();
    return (
        <>
            <DetailsCategoriesPages id={id}/>
        </>
    );
}

export default DetailsCategories;