import { ShoppingCard } from "./components/ShoppingCart";

function Cart({cartData, itemCount, allCartItems,cartIsLoading,cartErorr}) {
    return (
        <>
            <ShoppingCard cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}  cartIsLoading={cartIsLoading} cartErorr={cartErorr}/>
        </>
    );
}
export default Cart;