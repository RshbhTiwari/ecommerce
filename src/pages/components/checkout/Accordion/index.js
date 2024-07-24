// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { IoMdAdd } from 'react-icons/io';
// import { getAddress } from '../../../../redux/slices/address';
// import { Paragraph, LoginForm, Btnone } from '../../basic';
// import PaymentOptions from './PaymentOptions';
// import DefultAddress from '../../myaccount/address/DefultAddress';
// import { Checkoutuseraddress, GuestAddress } from '../../myaccount/address';

// const AccordionExample = () => {
//     const dispatch = useDispatch();
//     const { allAddress } = useSelector(state => state.address);
//     const accessToken = localStorage.getItem('accessToken');
//     const userName = JSON.parse(localStorage.getItem('user'))?.name;
//     const customer_id = JSON.parse(localStorage.getItem('user'))?.id;

//     const [isOpen, setIsOpen] = useState(true);
//     const [activeSection, setActiveSection] = useState('billing');
//     const [isNewOpen, setIsNewOpen] = useState(false);

//     useEffect(() => {
//         dispatch(getAddress(customer_id));
//     }, [dispatch, customer_id]);

//     const handleAccordionToggle = (section) => {
//         setIsOpen(false);
//         setActiveSection(section);
//     };

//     const handleAddNewAddress = () => {
//         setIsNewOpen(prevState => !prevState);
//     };

//     const handleSectionDelete = (id) => {
//         if (activeSection === 'billing') {
//             setAllAddressData(allAddressData.filter(address => address.id !== id));
//         } else if (activeSection === 'shipping') {
//             setFiltereAllAddressData(filtereAllAddressData.filter(address => address.id !== id));
//         }
//     };

//     const handleContinueTo = (section) => {
//         setActiveSection(section);
//         setTrigger(true);
//     };

//     return (
//         <>
//             <div className='shadow-md rounded-lg'>
//                 {/* Welcome Back or Guest Checkout/Login Section */}
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320]">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             {accessToken
//                                 ? `Welcome back, ${userName}!`
//                                 : 'Guest Checkout Or login'}
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle('welcome')}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${isOpen ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {isOpen && (
//                     <div className='py-6 px-4'>
//                         {accessToken ? (
//                             <div className='flex flex-col items-center w-full'>
//                                 {/* Welcome Back Content */}
//                                 <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
//                                     <Paragraph
//                                         color='white'
//                                         title={`Welcome back ${userName}, Ready to complete your grocery shopping?`}
//                                     />
//                                 </div>
//                                 <div className='flex flex-col items-start w-full pt-4'>
//                                     <Btnone
//                                         title="continue"
//                                         handleClick={() => handleAccordionToggle('billing')}
//                                         bgColor="#00A762"
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-12 md:gap-8 gap-4">
//                                 {/* Guest Checkout Section */}
//                                 <div className='lg:col-span-6 col-span-12'>
//                                     <h2 className={`font-dm border-b-2 pb-1 border-[#072320] text-lg capitalize font-medium text-center text-[#072320]`}>
//                                         Guest Checkout
//                                     </h2>
//                                     <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
//                                         <Paragraph
//                                             color='white'
//                                             title='Save time by skipping the account creation process. Just fill in your shipping and payment details, and you’re done'
//                                         />
//                                     </div>
//                                     <Btnone
//                                         title="continue as guest"
//                                         handleClick={() => handleAccordionToggle('billing')}
//                                         bgColor="#00A762"
//                                         width="100%"
//                                     />
//                                 </div>
//                                 {/* Login Section */}
//                                 <div className='lg:col-span-6 col-span-12'>
//                                     <h2 className={`font-dm text-lg capitalize border-b-2 pb-1 border-[#072320] font-medium text-center text-[#072320]`}>
//                                         Have an account? Login
//                                     </h2>
//                                     <LoginForm handleClick={() => handleAccordionToggle('billing')} />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             {/* Billing Address Section */}
//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Billing Address
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle('billing')}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${activeSection === 'billing' ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {activeSection === 'billing' && (
//                     <>
//                         <div className='p-3'>
//                             {accessToken ? (
//                                 <>
//                                     {/* Display based on conditions */}
//                                     {isNewOpen || allAddressData?.length === 0 ? (
//                                         <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
//                                             <Checkoutuseraddress ship={true} handleClick={() => handleContinueTo('shipping')} />
//                                         </div>
//                                     ) : null}
//                                     {allAddressData?.length > 0 && (
//                                         <>
//                                             <div className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]`}
//                                                 onClick={handleAddNewAddress}
//                                             >
//                                                 <IoMdAdd className="mr-2 text-2xl" /> Add New Address
//                                             </div>
//                                             <DefultAddress
//                                                 allAddressData={allAddressData}
//                                                 deletClick={handleSectionDelete}
//                                             />
//                                             <div className='flex flex-col items-start w-full pt-2'>
//                                                 <Btnone
//                                                     title="continue"
//                                                     handleClick={() => handleAccordionToggle('shipping')}
//                                                     bgColor="#00A762"
//                                                 />
//                                             </div>
//                                         </>
//                                     )}
//                                 </>
//                             ) : (
//                                 <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
//                                     <GuestAddress ship={true} handleClick={() => handleContinueTo('shipping')} />
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Shipping Address Section */}
//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Shipping Address
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle('shipping')}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${activeSection === 'shipping' ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {activeSection === 'shipping' && (
//                     <>
//                         <div className='p-3'>
//                             {accessToken ? (
//                                 <>
//                                     {/* Display based on conditions */}
//                                     {isNewOpen || filtereAllAddressData?.length === 0 ? (
//                                         <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
//                                             <Checkoutuseraddress handleClick={() => handleContinueTo('payment')} />
//                                         </div>
//                                     ) : null}
//                                     {filtereAllAddressData?.length > 0 && (
//                                         <>
//                                             <div className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]`}
//                                                 onClick={handleAddNewAddress}
//                                             >
//                                                 <IoMdAdd className="mr-2 text-2xl" /> Add New Address
//                                             </div>
//                                             <DefultAddress
//                                                 allAddressData={filtereAllAddressData}
//                                                 deletClick={handleSectionDelete}
//                                             />
//                                             <div className='flex flex-col items-start w-full pt-2'>
//                                                 <Btnone
//                                                     title="continue"
//                                                     handleClick={() => handleAccordionToggle('payment')}
//                                                     bgColor="#00A762"
//                                                 />
//                                             </div>
//                                         </>
//                                     )}
//                                 </>
//                             ) : (
//                                 <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
//                                     <GuestAddress ship={false} handleClick={() => handleAccordionToggle('payment')} />
//                                 </div>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>

//             {/* Payment Options Section */}
//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Payment Option
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle('payment')}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${activeSection === 'payment' ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 {activeSection === 'payment' && <PaymentOptions />}
//             </div>
//         </>
//     );
// };

// export default AccordionExample;


import React, { useEffect, useState } from 'react';
import { Paragraph } from '../../basic/title';
import { LoginForm } from '../../basic/auth';
import { Btnone } from '../../basic/button';
import PaymentOptions from './PaymentOptions';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../../../redux/slices/address';
import DefultAddress from '../../myaccount/address/DefultAddress';
import { Checkoutuseraddress, GuestAddress } from '../../myaccount/address';

const AccordionExample = () => {
    const dispatch = useDispatch();
    const [allAddressData, setAllAddressData] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isNewOpen, setIsNewOpen] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [filteredAllAddressData, setFilteredAllAddressData] = useState([]);

    const accessToken = localStorage.getItem('accessToken') || null;
    const userName = JSON.parse(localStorage.getItem('user'))?.name || null;
    const customer_id = JSON.parse(localStorage.getItem('user'))?.id || null;
    const { allAddress } = useSelector(state => state.address);

    useEffect(() => {
        dispatch(getAddress(customer_id));
    }, [dispatch, customer_id]);

    useEffect(() => {
        if (allAddress?.length > 0) {
            setAllAddressData(allAddress);
        }
    }, [allAddress]);

    useEffect(() => {
        if (allAddressData?.length > 0) {
            const filteredData = allAddressData.filter(address => address.is_shipping);
            setFilteredAllAddressData(filteredData);
        }
    }, [allAddressData]);

    const handleAddNewAddress = () => {
        setIsNewOpen(prevState => !prevState);
    };

    const handleAccordionToggle = setter => {
        setIsOpen(false);
        setIsBillingOpen(false);
        setIsShippingOpen(false);
        setIsPaymentOpen(false);
        setter(prev => !prev);
    };

    const handleDeleteClick = id => {
        setAllAddressData(prevAddresses => prevAddresses.filter(address => address.id !== id));
    };

    useEffect(() => {
        if (trigger) {
            dispatch(getAddress(customer_id));
            setTrigger(false);
        }
    }, [trigger, customer_id, dispatch]);

    const handleBillingClick = () => {
        setTrigger(true);
        setIsBillingOpen(false);
        setIsShippingOpen(true);
    };

    const handleShippingClick = () => {
        setTrigger(true);
        setIsShippingOpen(false);
        setIsPaymentOpen(true);
    };

    const handleShippingDeleteClick = id => {
        setFilteredAllAddressData(prevAddresses => prevAddresses.filter(address => address.id !== id));
    };

    return (
        <>
            <div className="shadow-md rounded-lg">
                <div className="rounded-t-lg p-3 bg-gray-100">
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320]">
                        <h2 className="font-dm text-xl capitalize font-medium text-left text-[#072320]">
                            {accessToken ? `Welcome back, ${userName}!` : 'Guest Checkout Or login'}
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsOpen)}
                        >
                            <IoMdAdd
                                className={`h-6 text-white w-6 ${isOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </IoMdAdd>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="py-6 px-4">
                        {accessToken ? (
                            <div className="flex flex-col items-center w-full">
                                <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
                                    <Paragraph
                                        color="white"
                                        title={`Welcome back ${userName}, Ready to complete your grocery shopping?`}
                                    />
                                </div>
                                <div className="flex flex-col items-start w-full pt-4">
                                    <Btnone
                                        title="continue"
                                        handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                        bgColor="#00A762"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-12 md:gap-8 gap-4">
                                <div className="lg:col-span-6 col-span-12">
                                    <h2 className="font-dm border-b-2 pb-1 border-[#072320] text-lg capitalize font-medium text-center text-[#072320]">
                                        Guest Checkout
                                    </h2>
                                    <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                        <Paragraph
                                            color="white"
                                            title="Save time by skipping the account creation process. Just fill in your shipping and payment details, and you’re done"
                                        />
                                    </div>
                                    <Btnone
                                        title="continue as guest"
                                        handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                        bgColor="#00A762"
                                        width="100%"
                                    />
                                </div>
                                <div className="lg:col-span-6 col-span-12">
                                    <h2 className="font-dm text-lg capitalize border-b-2 pb-1 border-[#072320] font-medium text-center text-[#072320]">
                                        Have an account? Login
                                    </h2>
                                    <LoginForm handleClick={() => handleAccordionToggle(setIsBillingOpen)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="shadow-md rounded-lg mt-8">
                <div className="rounded-t-lg p-3 bg-gray-100">
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320]">
                        <h2 className="font-dm text-xl capitalize font-medium text-left text-[#072320]">
                            Billing Address
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsBillingOpen)}
                        >
                            <IoMdAdd
                                className={`h-6 text-white w-6 ${isBillingOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </IoMdAdd>
                        </div>
                    </div>
                </div>

                {isBillingOpen && (
                    <>
                        <div className="p-3">
                            {accessToken ? (
                                <>
                                    {isNewOpen || allAddressData.length === 0 ? (
                                        <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                            <Checkoutuseraddress ship={true} handleClick={handleBillingClick} />
                                        </div>
                                    ) : null}
                                    {allAddressData.length > 0 && (
                                        <>
                                            <div
                                                className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
                                                onClick={handleAddNewAddress}
                                            >
                                                <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                                            </div>

                                            <DefultAddress allAddressData={allAddressData} deletClick={handleDeleteClick} />

                                            <div className="flex flex-col items-start w-full pt-2">
                                                <Btnone
                                                    title="continue"
                                                    handleClick={() => handleAccordionToggle(setIsShippingOpen)}
                                                    bgColor="#00A762"
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                        <GuestAddress ship={true} handleClick={() => handleAccordionToggle(setIsShippingOpen)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="shadow-md rounded-lg mt-8">
                <div className="rounded-t-lg p-3 bg-gray-100">
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320]">
                        <h2 className="font-dm text-xl capitalize font-medium text-left text-[#072320]">
                            Shipping Address
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsShippingOpen)}
                        >
                            <IoMdAdd
                                className={`h-6 text-white w-6 ${isShippingOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </IoMdAdd>
                        </div>
                    </div>
                </div>

                {isShippingOpen && (
                    <>
                        <div className="p-3">
                            {accessToken ? (
                                <>
                                    {isNewOpen || filteredAllAddressData.length === 0 ? (
                                        <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                            <Checkoutuseraddress handleClick={handleShippingClick} />
                                        </div>
                                    ) : null}

                                    {filteredAllAddressData.length > 0 && (
                                        <>
                                            <div
                                                className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
                                                onClick={handleAddNewAddress}
                                            >
                                                <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                                            </div>

                                            <DefultAddress
                                                allAddressData={filteredAllAddressData}
                                                deletClick={handleShippingDeleteClick}
                                            />

                                            <div className="flex flex-col items-start w-full pt-2">
                                                <Btnone
                                                    title="continue"
                                                    handleClick={() => handleAccordionToggle(setIsPaymentOpen)}
                                                    bgColor="#00A762"
                                                />
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                        <GuestAddress ship={false} handleClick={() => handleAccordionToggle(setIsPaymentOpen)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>

            <div className="shadow-md rounded-lg mt-8">
                <div className="rounded-t-lg p-3 bg-gray-100">
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320]">
                        <h2 className="font-dm text-xl capitalize font-medium text-left text-[#072320]">
                            Payment Option
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsPaymentOpen)}
                        >
                            <IoMdAdd
                                className={`h-6 text-white w-6 ${isPaymentOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </IoMdAdd>
                        </div>
                    </div>
                </div>
                {isPaymentOpen && <PaymentOptions />}
            </div>
        </>
    );
};

export default AccordionExample;
