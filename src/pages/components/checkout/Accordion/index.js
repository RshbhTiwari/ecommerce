import { useState } from 'react';
import { HeadingTitle, Paragraph } from '../../basic/title';
import { LoginForm } from '../../basic/auth';
import { Btnone } from '../../basic/button';
import AddEditAddressFrom from '../../myaccount/address/AddEditAddressFrom';
import PaymentOptions from './PaymentOptions';
import { useNavigate } from 'react-router-dom';
import { IoMdAdd } from "react-icons/io";
import DefultAddress from '../../myaccount/address/DefultAddress';

const AccordionExample = () => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isNewOpen, setisNewIsOpen] = useState(false);

    const accessToken = localStorage?.getItem('accessToken') || null;
    const userMame = JSON?.parse(localStorage?.getItem('user'))?.name || null;



    const togglelogincontinue = () => {
        setIsOpen(false);
        setIsBillingOpen(true)
    };

    const togglelogin = () => {
        setIsOpen(!isOpen);
        setIsBillingOpen(false)
        setIsShippingOpen(false)
        setIsPaymentOpen(false)
    };

    const toggleBilling = () => {
        setIsBillingOpen(!isBillingOpen);
        setIsOpen(false);
        setIsShippingOpen(false)
        setIsPaymentOpen(false)
    };

    const toggleShipping = () => {
        setIsShippingOpen(!isShippingOpen);
        setIsBillingOpen(false)
        setIsPaymentOpen(false)
        setIsOpen(false);
    };

    const toggleisPaymen = () => {
        setIsPaymentOpen(!isPaymentOpen);
        setIsBillingOpen(false)
        setIsShippingOpen(false)
        setIsOpen(false);
    };

    const handleAddNewAddress = () => {
        setisNewIsOpen(!isNewOpen);
    };

    return (
        <>
            <>
                <div className='shadow-md rounded-lg'>
                    <div className=' rounded-t-lg p-3 bg-gray-100'>
                        <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">

                            {accessToken ? (
                                <>
                                    <h2 className={`font-dm text-xl capitalize  font-medium text-left  text-[#072320]`}>
                                        Welcome back,{userMame}!

                                    </h2>
                                </>
                            ) : (
                                <>
                                    <h2 className={`font-dm text-xl capitalize  font-medium text-left  text-[#072320]`} >
                                        Guest Checkout Or login
                                    </h2>
                                </>
                            )}

                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={togglelogin}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 text-white w-6 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {isOpen && (
                        <div className='py-6 px-4'>
                            {accessToken ? (
                                <div className='flex flex-col items-center w-full'>
                                    {/* ${user?.name} */}
                                    <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
                                        <Paragraph color='white'
                                            title={`Welcome back ${userMame},  Ready to complete your grocery shopping?`} />
                                    </div>
                                    <div className='flex flex-col items-start w-full pt-4'>
                                        <Btnone title="continue" handleClick={togglelogincontinue}
                                            bgColor="#00A762" />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-12 md:gap-8 gap-4">

                                    <div className='lg:col-span-6 col-span-12'>
                                        <h2 className={`font-dm border-b-2 pb-1 border-[#072320] text-lg capitalize  font-medium text-center  text-[#072320]`}>Guest Checkout</h2>
                                        <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                            <Paragraph color='white'
                                                title='Save time by skipping the account creation process. Just fill in your shipping and payment details, and youre done' />
                                        </div>
                                        <Btnone title="continue as guest"
                                            handleClick={togglelogincontinue}
                                            bgColor="#00A762" width="100%" />
                                    </div>
                                    <div className='lg:col-span-6 col-span-12'>
                                        <h2 className={`font-dm text-lg capitalize border-b-2 pb-1 border-[#072320] font-medium text-center  text-[#072320]`}>have an account? login</h2>
                                        <LoginForm />
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div>
            </>

            <>
                <div className='shadow-md rounded-lg mt-8'>
                    <div className=' rounded-t-lg p-3 bg-gray-100'>
                        <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                            <h2 className={`font-dm text-xl capitalize  font-medium text-left  text-[#072320]`}>Billing Address</h2>

                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={toggleBilling}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 text-white w-6 ${isBillingOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {isBillingOpen && (
                        <div className='p-3'>

                            <div className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                                    font-medium  text-left  text-[#00A762]`} onClick={handleAddNewAddress}>
                                <IoMdAdd className="mr-2 text-2xl" />Add New Address</div>

                            <DefultAddress />

                            {isNewOpen && <AddEditAddressFrom />}

                        </div>
                    )}
                </div>
            </>

            <>
                <div className='shadow-md rounded-lg mt-8'>
                    <div className=' rounded-t-lg p-3 bg-gray-100'>
                        <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                            <h2 className={`font-dm text-xl capitalize  font-medium text-left  text-[#072320]`}>shipping Address</h2>

                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={toggleShipping}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 text-white w-6 ${isShippingOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {isShippingOpen && (
                        <div className='p-3'>
                            <div className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                                    font-medium  text-left  text-[#00A762]`} onClick={handleAddNewAddress} >
                                <IoMdAdd className="mr-2 text-2xl" />Add New Address</div>

                            <DefultAddress />

                            {isNewOpen && <AddEditAddressFrom />}

                        </div>
                    )}
                </div>
            </>

            <>
                <div className='shadow-md rounded-lg mt-8'>
                    <div className=' rounded-t-lg p-3 bg-gray-100'>
                        <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                            <h2 className={`font-dm text-xl capitalize  font-medium text-left  text-[#072320]`}>Payment option</h2>

                            <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={toggleisPaymen}>
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 text-white w-6 ${isPaymentOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>


                    {isPaymentOpen && (
                        <PaymentOptions />
                    )}
                </div>
            </>

        </>
    );
};

export default AccordionExample;
