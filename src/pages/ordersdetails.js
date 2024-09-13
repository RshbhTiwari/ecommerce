import { OrdersDetailsPage } from "./components/orders";
import { useParams } from "react-router-dom";


function OrdersDetails() {
    const { id } = useParams();
    
    return (
        <>
            <OrdersDetailsPage  id={id}/> 
        </>

    );
}

export default OrdersDetails;