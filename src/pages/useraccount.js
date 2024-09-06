import { Useramyccount } from "./components/myaccount";

function Useraccount() {
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
    console.log("customer_id", customer_id)
    return (
        <>
            <Useramyccount customer_id={customer_id} />
        </>
    );
}

export default Useraccount;