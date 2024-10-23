import { CheckoutCard } from "./components/checkout";

function Checkout({ selectLength, cartData, itemCount, allCartItems }) {
    return (
        <>
            <CheckoutCard
                selectLength={selectLength}
                cartData={cartData}
                itemCount={itemCount}
                allCartItems={allCartItems} />
        </>
    );
}
export default Checkout;