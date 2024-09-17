import { Useramyccount } from "./components/myaccount";

function Useraccount() {
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

    return (
        <>
            <Useramyccount customer_id={customer_id} />
        </>
    );
}

export default Useraccount;