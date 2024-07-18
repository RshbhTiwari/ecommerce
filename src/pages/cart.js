import { ShoppingCard } from "./components/ShoppingCart";

function Cart({cartData, itemCount}) {
    return (
        <>
            <ShoppingCard cartData={cartData} itemCount={itemCount} />
        </>
    );
}
export default Cart;