import React, { useEffect, useState } from 'react';
import { Paragraph } from '../../basic/title';
import { LoginForm } from '../../basic/auth';
import { Btnone } from '../../basic/button';
import PaymentOptions from './PaymentOptions';
import { IoMdAdd } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getAddress } from '../../../../redux/slices/address';
import { CheckoutbillingAddress, CheckoutshippingAddress } from '../../myaccount/address/DefultAddress';
import { CheckoutShipingaddress } from '../../myaccount/address';
import CheckoutBillingaddress from '../../myaccount/address/CheckoutBillingaddress';
import GuestAddressBilling from '../../myaccount/address/GuestAddressBilling';
import GuestAddressShipping from '../../myaccount/address/GuestAddressShipping';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { postcodorder } from '../../../../redux/slices/codorder';

const AccordionExample = ({ cartData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allAddressData, setAllAddressData] = useState([]);
    const [shipAddress, setShipAddress] = useState([]);
    const [billAddress, setBillingAddress] = useState([]);

    const [isOpen, setIsOpen] = useState(true);
    const [isShippingOpen, setIsShippingOpen] = useState(false);
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);
    const [isNewBillingOpen, setIsNewBillingOpen] = useState(false);
    const [isNewShippingOpen, setIsNewShippingOpen] = useState(false);

    const [trigger, setTrigger] = useState(false);
    // const [isModalOpen, setIsModalOpen] = useState(false);

    const accessToken = localStorage.getItem('accessToken') || null;
    const userName = JSON.parse(localStorage.getItem('user'))?.name || null;
    const customer_id = JSON.parse(localStorage.getItem('user'))?.id || null;
    const { allAddress } = useSelector(state => state.address);


    const { oneId } = useSelector(
        (state) => state.codorder
    );

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
            const filteredDataShipping = allAddressData.filter(address => address?.is_shipping);
            setShipAddress(filteredDataShipping);
            const filteredDataBilling = allAddressData.filter(address => address?.is_billing);
            setBillingAddress(filteredDataBilling);
        }
    }, [allAddressData]);

    const handleAddNewbillingAddress = () => {
        setIsNewBillingOpen(prevState => !prevState);
    };

    const handleAddNewShippingAddress = () => {
        setIsNewShippingOpen(prevState => !prevState);
    };

    const handleAccordionToggle = setter => {
        setIsOpen(false);
        setIsBillingOpen(false);
        setIsShippingOpen(false);
        setIsPaymentOpen(false);
        setter(prev => !prev);
    };

    const handleBillingClick = () => {
        setTrigger(true);
        setIsBillingOpen(false);
        setIsShippingOpen(true);
    };

    const handlePaymentClick = () => {
        setTrigger(true);
        setIsBillingOpen(false);
        setIsPaymentOpen(true);
    };

    const handleShippingClick = () => {
        setTrigger(true);
        setIsShippingOpen(false);
        setIsPaymentOpen(true);
    };

    const handlebackBillClick = () => {
        setIsOpen(true);
        setIsBillingOpen(false);
    };

    const handlebackShipClick = () => {
        setIsBillingOpen(true);
        setIsShippingOpen(false);
        setIsNewBillingOpen(false);
    };

    const handlebackPayClick = () => {
        setIsPaymentOpen(false);
        setIsShippingOpen(true);
        setIsNewShippingOpen(false);
    };


    const handleConfirmOrder = () => {
        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
        const cart_id = cartDataid !== null ? Number(cartDataid) : null;

        const cartItem = {
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(postcodorder(cartItem, navigate,toast));
    };

    // const closeModal = () => {
    //     setIsModalOpen(false);
    //     navigate(`/my-account/orders/${oneId}`);
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // };

    // const handlecontinueshopping = () => {
    //     navigate(`/shop`);
    //     setIsModalOpen(false);
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // };

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
                        // onClick={() => handleAccordionToggle(setIsOpen)}
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
                    <div className="py-6 px-4">
                        {accessToken ? (
                            <div className="flex flex-col items-center w-full">
                                <div className="py-4 px-4 bg-[#072320] rounded-md shadow-md w-full">
                                    <Paragraph
                                        color="white"
                                        title={`Welcome back ${userName}, Ready to complete your grocery shopping?`}
                                    />
                                </div>
                                {cartData?.length > 0 ? (
                                    <div className="flex flex-col items-start w-full pt-4">
                                        <Btnone
                                            title="continue"
                                            handleClick={() => handleAccordionToggle(setIsBillingOpen)}
                                            bgColor="#00A762"
                                        />
                                    </div>
                                ) : null}
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
                        <div className="p-3">
                            {accessToken ? (
                                <>
                                    {isNewBillingOpen || billAddress.length === 0 ? (
                                        <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                            <CheckoutBillingaddress
                                                backCLick={() => handlebackBillClick()}
                                                checkbil={true}
                                                handleClick={handleBillingClick}
                                                paymentClick={handlePaymentClick}
                                            />
                                        </div>
                                    ) : null}

                                    {billAddress.length > 0 && (
                                        <>
                                            <div
                                                className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
                                                onClick={handleAddNewbillingAddress}
                                            >
                                                <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                                            </div>

                                            <CheckoutbillingAddress
                                                allAddressData={billAddress}
                                                handleClick={() => handleAccordionToggle(setIsShippingOpen)}
                                                handlebackClick={() => handlebackBillClick()}
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                        <GuestAddressBilling
                                            backCLick={() => handlebackBillClick()}
                                            handleClick={() => handleAccordionToggle(setIsShippingOpen)}
                                            paymentClick={() => handleAccordionToggle(setIsPaymentOpen)} />
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
                    <>
                        <div className="p-3">
                            {accessToken ? (
                                <>
                                    {isNewShippingOpen || shipAddress.length === 0 ? (
                                        <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                            <CheckoutShipingaddress
                                                backCLick={() => handlebackShipClick()}
                                                checkship={true}
                                                handleClick={handleShippingClick}
                                            />
                                        </div>
                                    ) : null}

                                    {shipAddress.length > 0 && (
                                        <>
                                            <div
                                                className="font-dm text-lg my-2 w-fit cursor-pointer capitalize flex items-center justify-end rounded-lg shadow-md border-[#00A762] border-[2px] px-3 py-1 font-medium text-left text-[#00A762]"
                                                onClick={handleAddNewShippingAddress}
                                            >
                                                <IoMdAdd className="mr-2 text-2xl" /> Add New Address
                                            </div>

                                            <CheckoutshippingAddress
                                                allAddressData={shipAddress}
                                                handleClick={() => handleAccordionToggle(setIsPaymentOpen)}
                                                handlebackClick={() => handlebackShipClick()}
                                            />
                                        </>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="shadow-md rounded-lg border-[#00A762] border-2 p-4 my-4">
                                        <GuestAddressShipping
                                            backCLick={() => handlebackShipClick()}
                                            handleClick={() => handleAccordionToggle(setIsPaymentOpen)}
                                        />
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
                    <>
                        <PaymentOptions onConfirmOrder={handleConfirmOrder} backCLick={handlebackPayClick} />
                    </>
                )}
            </div>

            {/* <ModelCashonDelivery
                isOpen={isModalOpen}
                onClose={closeModal}
                oncontinueshopping={handlecontinueshopping}
            /> */}
        </>
    );
};

export default AccordionExample;
