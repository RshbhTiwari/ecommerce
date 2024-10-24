import { Useramyccount } from "./components/myaccount";

function Useraccount({oneuser}) {
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

    return (
        <>
            <Useramyccount customer_id={customer_id} oneuser={oneuser} />
        </>
    );
}

export default Useraccount;