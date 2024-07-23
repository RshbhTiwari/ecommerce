import { CheckoutCard } from "./components/checkout";

function Checkout({cartData, itemCount, allCartItems}) {
    return (
        <>
            <CheckoutCard cartData={cartData} itemCount={itemCount} allCartItems={allCartItems}/>
        </>
    );
}
export default Checkout;