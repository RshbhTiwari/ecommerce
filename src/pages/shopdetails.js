import { useParams } from "react-router-dom";
import { ShopSingleDetails } from "./components/ShopDetails";

function ShopDetails({
    cartData,
    wishlist,

    allProductsData,
    productIsLoading,
    productError, }) {
    const { id } = useParams();

    return (
        <>
            <ShopSingleDetails id={id}
                localCartItems={cartData}
                wishlist={wishlist}
                allProductsData={allProductsData}
                productIsLoading={productIsLoading}
                productError={productError} />
        </>

    );
}

export default ShopDetails;