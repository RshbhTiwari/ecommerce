import { useParams } from "react-router-dom";
import { ShopSingleDetails } from "./components/ShopDetails";

function ShopDetails() {
    const { id } = useParams();
    
    return (
        <>
           <ShopSingleDetails id={id} />
        </>

    );
}

export default ShopDetails;