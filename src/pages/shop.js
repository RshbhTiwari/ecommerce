import { ProductPage } from "./components/shop";

function Shop({

    cartData,
    wishlist,

    allProductsData,
    productIsLoading,
    productError,

    allCategoriesData,
    categoryIsLoading,
    categoryError,
}) {

    return (
        <>
            <ProductPage
                localCartItems={cartData}
                wishlist={wishlist}

                allProductsData={allProductsData}
                productIsLoading={productIsLoading}
                productError={productError}

                allCategoriesData={allCategoriesData}
                categoryIsLoading={categoryIsLoading}
                categoryError={categoryError} />
        </>

    );
}

export default Shop;