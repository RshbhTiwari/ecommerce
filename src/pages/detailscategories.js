import { DetailsCategoriesPages } from "./components/categories";
import { useParams } from "react-router-dom";

function DetailsCategories({
    allProductsData,
    productIsLoading,
    productError,

    allCategoriesData,
    categoryIsLoading,
    categoryError,

    cartData,
    wishlist,
}) {
    const { id } = useParams();
    return (
        <>
            <DetailsCategoriesPages id={id}
                products={allProductsData}
                productIsLoading={productIsLoading}
                productError={productError}
                categoriesData={allCategoriesData}

                wishlist={wishlist}
                localCartItems={cartData}

            />
        </>
    );
}

export default DetailsCategories;