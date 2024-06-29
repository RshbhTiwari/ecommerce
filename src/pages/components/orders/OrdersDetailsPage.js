import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle } from "../basic/title";
import { AccountSideNav } from "../myaccount/sidenav";
import DetailsPage from "./DetailsPage";

function OrdersDetailsPage({ ordersitem }) {

    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName={ordersitem?.title} />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <DetailsPage ordersitem={ordersitem} />
                    </div>
                </div>
            </div>
        </>

    );
}

export default OrdersDetailsPage;