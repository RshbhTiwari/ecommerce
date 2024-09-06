import { useParams } from "react-router-dom";
import { SingleBlogDetails } from "./components/blog";

function DetailsBlog() {
    const { id } = useParams();
    return (
        <>
           <SingleBlogDetails id={id} />
        </>
    );
}

export default DetailsBlog;