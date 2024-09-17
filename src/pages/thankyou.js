import { useParams } from "react-router-dom";
import { Thank } from "./components/orderconfirmation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOneOrders } from "../redux/slices/orders";

function Thankyou() {
    
    const { id } = useParams();
    const dispatch = useDispatch();
 
    const [oneOrderData, setOneOrderData] = useState([]);

    const { isLoading: singleOrderIsloading, error: singleOrderError, oneOrders } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(getOneOrders(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (oneOrders) {
            setOneOrderData(oneOrders);
        }
    }, [oneOrders]);

    return (
        <>
           <Thank id={id} oneOrderData={oneOrderData}/>
        </>
    );
}

export default Thankyou;
