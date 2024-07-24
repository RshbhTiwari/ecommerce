import { useEffect, useState } from 'react';
import { Paragraph } from '../../basic/title';
import { LoginForm } from '../../basic/auth';
import { Btnone } from '../../basic/button';
import PaymentOptions from './PaymentOptions';
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../../../redux/slices/address';
import DefultAddress from '../../myaccount/address/DefultAddress';
import AddEditAddressFrom from '../../myaccount/address/AddEditAddressFrom';
import { Checkoutuseraddress, GuestAddress } from '../../myaccount/address';


const AccordionExample = () => {
    const dispatch = useDispatch();
    const [allAddressData, setAllAddressData] = useState([]);
    const [isOpen, setIsOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const [trigger, setTrigger] = useState(false);


    const [isNewOpen, setIsNewOpen] = useState(false);
    const accessToken = localStorage?.getItem('accessToken') || null;
    const userName = JSON?.parse(localStorage?.getItem('user'))?.name || null;
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
    const { allAddress } = useSelector(state => state.address);

    useEffect(() => {
        dispatch(getAddress(customer_id));
    }, [dispatch, customer_id]);

    useEffect(() => {
        if (allAddress?.length) {
            setAllAddressData(allAddress);
        }
    }, [allAddress]);

    console.log("allAddress", allAddress, customer_id)

    const handleAccordionToggle = (setter) => {
        setIsOpen(false);
        setIsBillingOpen(false);
        setIsShippingOpen(false);
        setIsPaymentOpen(false);
        setter(prev => !prev);
    };


    const handleAddNewAddress = () => {
        setIsNewOpen(prevState => !prevState);
    };

    const storedData = JSON.parse(sessionStorage.getItem('addresses')) || [];

    console.log('storedData', storedData?.length);

    const handleDeletClick = (id) => {
        setAllAddressData(allAddressData.filter(address => address.id !== id));
    };


    useEffect(() => {
        if (trigger) {
            console.log('useEffect is triggered');
            dispatch(getAddress(customer_id));
            setIsNewOpen(false);
            setTrigger(false);
        }
    }, [trigger, customer_id, dispatch]);

    const handleClick = () => {
        setTrigger(true);
    };


    const getSessionStorageData = () => {
        const sessionData = sessionStorage.getItem('addressData');
        return sessionData ? JSON.parse(sessionData) : {};
    };

    const sessionStorageData = getSessionStorageData();

    console.log("sessionStorageData", sessionStorageData)

    return (
        <>
            <div className='shadow-md rounded-lg'>
                <div className='rounded-t-lg p-3 bg-gray-100'>
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                        <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
                            {accessToken
                                ? `Welcome back, ${userName}!`
                                : 'Guest Checkout Or login'}
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 text-white w-6 ${isOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className='py-6 px-4'>
                        {accessToken ? (
                            <div className='flex flex-col items-center w-full'>
                                <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
                                    <Paragraph
                                        color='white'
                                        title={`Welcome back ${userName}, Ready to complete your grocery shopping?`}
                                    />
                                </div>
                                <div className='flex flex-col items-start w-full pt-4'>
                                    <Btnone
                                        title="continue"
                                        handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                        bgColor="#00A762"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-12 md:gap-8 gap-4">
                                <div className='lg:col-span-6 col-span-12'>
                                    <h2 className={`font-dm border-b-2 pb-1 border-[#072320] text-lg capitalize font-medium text-center text-[#072320]`}>
                                        Guest Checkout
                                    </h2>
                                    <div className="my-8 py-4 px-4 bg-[#072320] rounded-md shadow-md">
                                        <Paragraph
                                            color='white'
                                            title='Save time by skipping the account creation process. Just fill in your shipping and payment details, and you’re done'
                                        />
                                    </div>
                                    <Btnone
                                        title="continue as guest"
                                        handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                        bgColor="#00A762"
                                        width="100%"
                                    />
                                </div>
                                <div className='lg:col-span-6 col-span-12'>
                                    <h2 className={`font-dm text-lg capitalize border-b-2 pb-1 border-[#072320] font-medium text-center text-[#072320]`}>
                                        Have an account? Login
                                    </h2>
                                    <LoginForm handleClick={() => handleAccordionToggle(setIsBillingOpen)} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className='shadow-md rounded-lg mt-8'>
                <div className='rounded-t-lg p-3 bg-gray-100'>
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                        <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
                            Billing Address
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsBillingOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 text-white w-6 ${isBillingOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {isBillingOpen && (
                    <>
                        <div className='p-3'>
                            {accessToken ? (
                                <>
                                    {isNewOpen || allAddressData?.length === 0 ? (
                                        <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>

                                            <Checkoutuseraddress
                                                handleClick={() => handleClick()}

                                                // handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                            />

                                        </div>
                                    ) : null}

                                    {allAddressData?.length > 0 ? (
                                        <>
                                            <div
                                                className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1
                                                            font-medium text-left text-[#00A762]`}
                                                onClick={handleAddNewAddress}
                                            >
                                                <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                                            </div>

                                            <DefultAddress
                                                allAddressData={allAddressData}
                                                deletClick={handleDeletClick} />

                                            <div className='flex flex-col items-start w-full pt-2'>
                                                <Btnone
                                                    title="continue"
                                                    handleClick={() => handleAccordionToggle(setIsShippingOpen)}
                                                    bgColor="#00A762"
                                                />
                                            </div>

                                        </>
                                    ) : null}
                                </>
                            ) : (
                                <>
                                    <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
                                        <GuestAddress handleClick={() => handleAccordionToggle(setIsShippingOpen)} />
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>


            {/* {sessionStorageData?.is_shipping== true} */}
            <div className='shadow-md rounded-lg mt-8'>
                <div className='rounded-t-lg p-3 bg-gray-100'>
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                        <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
                            Shipping Address
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsShippingOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 text-white w-6 ${isShippingOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
                {isShippingOpen && (
                    <div className='p-3'>
                        <div
                            className={`font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]`}
                            onClick={handleAddNewAddress}
                        >
                            <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                        </div>
                        <DefultAddress />

                        {isNewOpen && <AddEditAddressFrom />}

                    </div>
                )}
            </div>



            <div className='shadow-md rounded-lg mt-8'>
                <div className='rounded-t-lg p-3 bg-gray-100'>
                    <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
                        <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
                            Payment Option
                        </h2>
                        <div
                            className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
                            onClick={() => handleAccordionToggle(setIsPaymentOpen)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-6 text-white w-6 ${isPaymentOpen ? 'transform rotate-180' : ''}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
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
    );
};

export default AccordionExample;



// import { useEffect, useState } from 'react';
// import { Paragraph } from '../../basic/title';
// import { LoginForm } from '../../basic/auth';
// import { Btnone } from '../../basic/button';
// import PaymentOptions from './PaymentOptions';
// import { IoMdAdd } from "react-icons/io";
// import { useDispatch, useSelector } from 'react-redux';
// import { getAddress } from '../../../../redux/slices/address';
// import DefultAddress from '../../myaccount/address/DefultAddress';
// import { GuestAddress } from '../../myaccount/address';
// import { AddressModal } from '../Model';


// const AccordionExample = () => {
//     const dispatch = useDispatch();
//     const [allAddressData, setAllAddressData] = useState([]);

//     const [isOpen, setIsOpen] = useState(true);
//     const [isShippingOpen, setIsShippingOpen] = useState(false);
//     const [isBillingOpen, setIsBillingOpen] = useState(false);
//     const [isPaymentOpen, setIsPaymentOpen] = useState(false);

//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isshipModalOpen, setShipIsModalOpen] = useState(false);

//     const [filtereAllAddressData, setFiltereAllAddressData] = useState([]);

//     const accessToken = localStorage?.getItem('accessToken') || null;
//     const userName = JSON?.parse(localStorage?.getItem('user'))?.name || null;
//     const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
//     const { allAddress } = useSelector(state => state.address);

//     useEffect(() => {
//         dispatch(getAddress(customer_id));
//     }, [dispatch, customer_id]);

//     useEffect(() => {
//         if (allAddress?.length) {
//             setAllAddressData(allAddress);
//         }
//     }, [allAddress]);


//     useEffect(() => {
//         if (allAddress?.length) {
//             const filteredData = allAddressData.filter(address => address?.is_shipping == 1);
//             setFiltereAllAddressData(filteredData);
//         }
//     }, [allAddress]);


//     useEffect(() => {
//         if (!isModalOpen && customer_id) {
//             console.log('Modal closed, useEffect triggered');
//             dispatch(getAddress(customer_id));
//         }
//     }, [isModalOpen, customer_id, dispatch]);

//     useEffect(() => {
//         if (!isshipModalOpen && customer_id) {
//             console.log('Modal closed, useEffect triggered');
//             dispatch(getAddress(customer_id));
//         }
//     }, [isshipModalOpen, customer_id, dispatch]);

//     const handleAccordionToggle = (setter) => {
//         setIsOpen(false);
//         setIsBillingOpen(false);
//         setIsShippingOpen(false);
//         setIsPaymentOpen(false);
//         setter(prev => !prev);
//     };

//     const handleDeletClick = (id) => {
//         setAllAddressData(allAddressData.filter(address => address.id !== id));
//     };

//     const openModal = () => setIsModalOpen(true);

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     const openshipModal = () => setShipIsModalOpen(true);

//     const closeshipModal = () => {
//         setShipIsModalOpen(false);
//     };

//     const handleshipDeletClick = (id) => {
//         setFiltereAllAddressData(filtereAllAddressData.filter(address => address.id !== id));
//     };

//     return (
//         <>
//             <div className='shadow-md rounded-lg'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             {accessToken
//                                 ? `Welcome back, ${userName}!`
//                                 : 'Guest Checkout Or login'}
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle(setIsOpen)}
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
//                                 <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
//                                     <Paragraph
//                                         color='white'
//                                         title={`Welcome back ${userName}, Ready to complete your grocery shopping?`}
//                                     />
//                                 </div>
//                                 <div className='flex flex-col items-start w-full pt-4'>
//                                     <Btnone
//                                         title="continue"
//                                         handleClick={() => handleAccordionToggle(setIsBillingOpen)}
//                                         bgColor="#00A762"
//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="grid grid-cols-12 md:gap-8 gap-4">
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
//                                         handleClick={() => handleAccordionToggle(setIsBillingOpen)}
//                                         bgColor="#00A762"
//                                         width="100%"
//                                     />
//                                 </div>
//                                 <div className='lg:col-span-6 col-span-12'>
//                                     <h2 className={`font-dm text-lg capitalize border-b-2 pb-1 border-[#072320] font-medium text-center text-[#072320]`}>
//                                         Have an account? Login
//                                     </h2>
//                                     <LoginForm handleClick={() => handleAccordionToggle(setIsBillingOpen)} />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Billing Address
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle(setIsBillingOpen)}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${isBillingOpen ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {isBillingOpen && (
//                     <>
//                         <div className='p-3'>
//                             {accessToken ? (
//                                 <>
//                                     {allAddressData?.length === 0 ? (
//                                         <>
//                                             <div
//                                                 onClick={openModal}
//                                                 className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
//                                             >
//                                                 <IoMdAdd className="mr-2 text-2xl" /> Add New Address
//                                             </div>
//                                         </>

//                                     ) : (
//                                         <>
//                                             <div
//                                                 onClick={openModal}
//                                                 className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
//                                             >
//                                                 <IoMdAdd className="mr-2 text-2xl" />Add New Address
//                                             </div>

//                                             <DefultAddress
//                                                 allAddressData={allAddressData}
//                                                 deletClick={handleDeletClick}
//                                             />

//                                             <div className='flex flex-col items-start w-full pt-2'>
//                                                 <Btnone
//                                                     title="Continue"
//                                                     handleClick={() => handleAccordionToggle(setIsShippingOpen)}
//                                                     bgColor="#00A762"
//                                                 />
//                                             </div>
//                                         </>
//                                     )}
//                                 </>
//                             ) : (
//                                 <>
//                                     <div className='shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4'>
//                                         <GuestAddress handleClick={() => handleAccordionToggle(setIsShippingOpen)} />
//                                     </div>
//                                 </>
//                             )}
//                         </div>
//                     </>
//                 )}
//             </div>


//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Shipping Address
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle(setIsShippingOpen)}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${isShippingOpen ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>

//                 {isShippingOpen && (
//                     <div className='p-3'>
//                         <>
//                             {filtereAllAddressData?.length === 0 ? (
//                                 <>
//                                     <div
//                                         onClick={openshipModal}
//                                         className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
//                                     >
//                                         <IoMdAdd className="mr-2 text-2xl" /> Add New Address
//                                     </div>
//                                 </>

//                             ) : (
//                                 <>
//                                     <div
//                                         onClick={openshipModal}
//                                         className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
//                                     >
//                                         <IoMdAdd className="mr-2 text-2xl" />Add New Address
//                                     </div>

//                                     <DefultAddress
//                                         allAddressData={filtereAllAddressData}
//                                         deletClick={handleshipDeletClick}
//                                     />

//                                     <div className='flex flex-col items-start w-full pt-2'>
//                                         <Btnone
//                                             title="Continue"
//                                             handleClick={() => handleAccordionToggle(setIsPaymentOpen)}
//                                             bgColor="#00A762"
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                         </>
//                     </div>
//                 )}
//             </div>

//             <div className='shadow-md rounded-lg mt-8'>
//                 <div className='rounded-t-lg p-3 bg-gray-100'>
//                     <div className="flex items-center justify-between border-b-2 pb-1 border-[#072320] ">
//                         <h2 className={`font-dm text-xl capitalize font-medium text-left text-[#072320]`}>
//                             Payment Option
//                         </h2>
//                         <div
//                             className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer"
//                             onClick={() => handleAccordionToggle(setIsPaymentOpen)}
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 className={`h-6 text-white w-6 ${isPaymentOpen ? 'transform rotate-180' : ''}`}
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 stroke="currentColor"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                             </svg>
//                         </div>
//                     </div>
//                 </div>
//                 {isPaymentOpen && (
//                     <PaymentOptions />
//                 )}
//             </div>

//             {isModalOpen && (
//                 <AddressModal isOpen={isModalOpen} onClose={closeModal} ship={true}/>
//             )}

//             {isshipModalOpen && (
//                 <AddressModal isOpen={isshipModalOpen} onClose={closeshipModal} ship={false} />
//             )}
//         </>
//     );
// };

// export default AccordionExample;
