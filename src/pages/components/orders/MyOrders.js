import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle } from "../basic/title";
import { AccountSideNav } from "../myaccount/sidenav";
import OrdersPagination from "./OrdersPagination";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getOrders } from "../../../redux/slices/orders";

function MyOrders() {
    const dispatch = useDispatch();
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

    const [allOrdersData, setAllOrdersData] = useState([]);

    const { isLoading: ordersIsLoading, error: ordersError, allOrders } = useSelector(
        (state) => state.orders
    );

    useEffect(() => {
        dispatch(getOrders(customer_id));
    }, [dispatch]);

    useEffect(() => {
        if (allOrders?.length) {
            setAllOrdersData(allOrders);
        }
    }, [allOrders]);


    console.log("ordersitems",allOrders,allOrdersData)
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName="My Orders" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                            data-aos-duration="1000">
                            <HeadingTitle title="My Orders" textAlign='left' /> 

                            <div className="">
                              <OrdersPagination Ordersdata={allOrdersData}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default MyOrders;