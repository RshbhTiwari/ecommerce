import { ShoppingCard } from "./components/ShoppingCart";

function Cart({cartData, itemCount, allCartItems}) {
    return (
        <>
            <ShoppingCard cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}/>
        </>
    );
}
export default Cart;