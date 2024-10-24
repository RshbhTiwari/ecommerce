import { HomePage } from "./components/home";

function Home({
    allProductsData,
    productIsLoading,
    productError,

    allCategoriesData,
    categoryIsLoading,
    categoryError,

    cartData,
    cartIsLoading,
    cartErorr,

    wishlist,
    wishlistIsLoading,
    wishlistError,
}) {
    return (
        <>
            <HomePage allProductsData={allProductsData}
                productIsLoading={productIsLoading}
                productError={productError}

                allCategoriesData={allCategoriesData}
                categoryIsLoading={categoryIsLoading}
                categoryError={categoryError} 
                
                cartData={cartData}
                cartIsLoading={cartIsLoading}
                cartErorr={cartErorr}
      
                wishlist={wishlist}
                wishlistIsLoading={wishlistIsLoading}
                wishlistError={wishlistError} />
        </>

    );
}
export default Home;