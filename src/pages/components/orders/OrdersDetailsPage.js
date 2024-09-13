import { useDispatch, useSelector } from "react-redux";
import BreadCrum from "../basic/BreadCrum";
import { AccountSideNav } from "../myaccount/sidenav";
import DetailsPage from "./DetailsPage";
import { getOneOrders } from "../../../redux/slices/orders";
import { useEffect, useState } from "react";

function OrdersDetailsPage({ id }) {

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
            <BreadCrum componentName="my account" link="/my-account" componentSecondName={oneOrderData?.title} />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <DetailsPage id={id} ordersitem={oneOrderData} />
                    </div>

                </div>
            </div>
        </>

    );
}

export default OrdersDetailsPage;