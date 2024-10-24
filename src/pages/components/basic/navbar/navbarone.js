import './navbar.css';
import Nav from "./nav";
import TopHeader from "./TopHeader";

export default function Navbarone({
    itemCount,

    allProductsData,
    productIsLoading,
    productError,

    cartData,
    cartIsLoading,
    cartErorr,

    
    wishlist,
    wishlistIsLoading,
    wishlistError,

    allCategoriesData,
    categoriesIsLoading,
    categoriesErorr }) {
    return (
        <>
            <TopHeader itemCount={itemCount}

                cartData={cartData}
                cartIsLoading={cartIsLoading}
                cartErorr={cartErorr}

                
                wishlist={wishlist}
                wishlistIsLoading={wishlistIsLoading}
                wishlistError={wishlistError}

                allProductsData={allProductsData}
                productIsLoading={productIsLoading}
                productError={productError}

            />

            <Nav allCategoriesData={allCategoriesData}
                categoriesIsLoading={categoriesIsLoading}
                categoriesErorr={categoriesErorr} />
        </>
    )
}

