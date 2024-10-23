import { ShoppingCard } from "./components/ShoppingCart";

function Cart({selectLength, cartData, itemCount, allCartItems,cartIsLoading,cartErorr}) {
    return (
        <>
            <ShoppingCard selectLength={selectLength} cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}  cartIsLoading={cartIsLoading} cartErorr={cartErorr}/>
        </>
    );
}
export default Cart; 