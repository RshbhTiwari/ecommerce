import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle } from "../basic/title";
import { AccountSideNav } from "../myaccount/sidenav";
import productcard from '../../../data/productcard';
import OrdersPagination from "./OrdersPagination";

function MyOrders() {

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
                              <OrdersPagination Ordersdata={productcard}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default MyOrders;