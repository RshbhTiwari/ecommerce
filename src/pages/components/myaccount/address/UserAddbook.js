import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import BreadCrum from "../../basic/BreadCrum";
import { AccountSideNav } from "../sidenav";
import { Paragraph } from "../../basic/title";
import { Btnone } from "../../basic/button";
import DefultAddress from "./DefultAddress";

function UserAddbook() {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" componentSecondName="My Addresses" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <div className="flex sm:flex-row flex-col space-y-4 sm:items-center  items-start justify-between border-b-2 pb-2 w-full  border-[#072320]">
                            <h2 className={`font-dm text-2xl capitalize  font-medium  text-left  text-[#072320]`} onClick={() =>
                                navigate('/my-account')
                            }>my account</h2>


                            <div className={`font-dm text-lg cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                      font-medium  text-left  text-[#00A762]`} onClick={() =>
                        navigate('/my-account/add-address')
                    }>
                                <IoMdAdd className="mr-2 text-2xl" />Add New Address</div>
                        </div>


                        <DefultAddress />
                    </div>
                </div>
            </div>




        </>

    );
}

export default UserAddbook;