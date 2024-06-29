import BreadCrum from "../basic/BreadCrum";
import { HeadingTitle } from "../basic/title";
import UpdateAccountFrom from "./UpdateAccountFrom";
import { AccountSideNav } from "./sidenav";

const userData = {
    id: "1",
    username: "rishabh",
    email: "rishabh@gmail.com",
    contact: 7974842788,
    city: 'satna',
    pincode: 123456,
    dob: '2000-07-24', // Correct format: YYYY-MM-DD
    gender: 'male'
};

function Updatemyaccount() {
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName="update profile" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                            <HeadingTitle title="My Profile Page" textAlign='left' />

                            <div className="">
                                <UpdateAccountFrom isEdit userData={userData} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}

export default Updatemyaccount;