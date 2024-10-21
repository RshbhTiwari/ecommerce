import { useParams } from "react-router-dom";
import { ShopSingleDetails } from "./components/ShopDetails";

function ShopDetails({allCartItems}) {
    const { id } = useParams();
    
    return (
        <>
           <ShopSingleDetails id={id} allCartItems={allCartItems} />
        </>

    );
}

export default ShopDetails;