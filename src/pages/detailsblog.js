import { useParams } from "react-router-dom";
import { SingleBlogDetails } from "./components/blog";

function DetailsBlog({
    allCategoriesData,
    categoryIsLoading,
    categoryError
}) {
    const { id } = useParams();
    return (
        <>
            <SingleBlogDetails id={id} allCategoriesData={allCategoriesData}
                categoryIsLoading={categoryIsLoading}
                categoryError={categoryError} />
        </>
    );
}

export default DetailsBlog;