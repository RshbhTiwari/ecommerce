import { BlogPage } from "./components/blog";

function Blog({
    allCategoriesData,
    categoryIsLoading,
    categoryError
}) {

    return (
        <>
            <BlogPage
                allCategoriesData={allCategoriesData}
                categoryIsLoading={categoryIsLoading}
                categoryError={categoryError} />
        </>

    );
}

export default Blog;