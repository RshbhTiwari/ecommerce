import { useNavigate, useParams } from "react-router-dom";
import cod from '../../../assets/home/approved.png';
import { Paragraph } from "../basic/title";
import accept from "../../../assets/myaccount/accept.png";
import { Btnone } from "../basic/button";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Thank({ id, oneOrderData }) {

    const navigate = useNavigate();

    const [hasAccessToken, setHasAccessToken] = useState(false);

    const { loginUser, userAccessToken } = useSelector(
        (state) => state.loginRegister
    );

    useEffect(() => {
        if (userAccessToken) {
            setHasAccessToken(true);
        } else {
            const token = localStorage.getItem('accessToken');
            setHasAccessToken(token);
        }
    }, [userAccessToken]);

    const scrollToClick = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const itemCount = oneOrderData?.items?.length;

    const showPaymentInfo = oneOrderData?.transaction && oneOrderData?.transaction?.status === 'captured';

    return (
        <>
            <div className="container mx-auto flex flex-col items-center justify-center
             max-w-7xl px-2 sm:px-6 lg:px-8  py-10">

                <div className='w-full md:gap-4 gap-0'>
                    <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                        data-aos-duration="1000">

                        <div className='h-24 w-24 mx-auto mb-2'>
                            <img src={cod} alt="cod" height="100%" width="100%" />
                        </div>

                        <div className="flex items-center justify-center border-b-2 pb-2 border-[#072320]">
                            <h2 className="font-dm text-xl capitalize font-bold text-center text-[#072320]">Thank You for Your Order!</h2>
                        </div>

                        <div className='my-4'>
                            <Paragraph title="Your order has been successfully placed. We’re preparing it and will update you with more information soon." />
                        </div>
                    </div>
                </div>

                <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                    data-aos-duration="1000">

                    <p className={`font-dm text-lg capitalize font-medium sm:text-left text-center text-[#072320]`}>
                        <span className="text-[#00A762]">order </span>{id}
                    </p>

                    <div className="grid grid-cols-12 gap-2 my-2">

                        <div className='lg:col-span-4 md:col-span-6 col-span-12'>

                            <h3 className='block  text-[#072320] 
                                     font-dm text-xl capitalize font-medium sm:text-left text-center'>
                                shipping address
                            </h3>

                            <div className="flex flex-col w-full mt-4 mb-4 sm:items-start items-center">
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Addressname : </span>{oneOrderData?.shipping_address?.addressname}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Landmarkname : </span>{oneOrderData?.shipping_address?.landmarkname}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">City : </span>{oneOrderData?.shipping_address?.city}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Pincode : </span>{oneOrderData?.shipping_address?.postal_code}
                                </p>

                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Address Type : </span>{oneOrderData?.shipping_address?.addrestype}
                                </p>
                            </div>

                            <h3 className='block  text-[#072320] 
                                     font-dm text-xl capitalize font-medium sm:text-left text-center'>
                                Billing address
                            </h3>

                            <div className="flex flex-col w-full mt-4 sm:items-start items-center">
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Addressname : </span>{oneOrderData?.billing_address?.addressname}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Landmarkname : </span>{oneOrderData?.billing_address?.landmarkname}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">City : </span>{oneOrderData?.billing_address?.city}
                                </p>
                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Pincode : </span>{oneOrderData?.billing_address?.postal_code}
                                </p>

                                <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                    <span className="text-[#00A762]">Address Type : </span>{oneOrderData?.billing_address?.addrestype}
                                </p>
                            </div>

                        </div>

                        <div className='lg:col-span-4 md:col-span-6 col-span-12'>
                            <h3 className='block  text-[#072320] 
                                     font-dm text-xl capitalize font-medium sm:text-left text-center'>
                                payment information
                            </h3>

                            <div className="flex flex-col w-full mt-4">
                                <p class="text-base font-dm sm:text-left text-center text-[#000000]">Payment Method : {oneOrderData?.transaction?.payment_method}</p>
                                <p class="text-base font-dm sm:text-left text-center text-[#000000]">Amount : ₹ {oneOrderData?.transaction?.amount}</p>
                                <p class="text-base font-dm sm:text-left text-center text-[#000000]">Purchase Date : {oneOrderData?.transaction?.transaction_date} </p>
                                {showPaymentInfo ? (
                                    <div className="flex items-center justify-center sm:justify-start mt-2">
                                        <div className="h-4 w-4 mr-2">
                                            <img
                                                src={accept}
                                                alt='product_img'
                                                className='h-full w-full'
                                            />
                                        </div>
                                        <h2 className="text-[#00A762] text-center md:text-left font-dm text-lg capitalize font-medium">
                                            done
                                        </h2>
                                    </div>
                                ) : null}
                            </div>
                        </div>


                        <div className='lg:col-span-4 md:col-span-6 col-span-12 sm:mt-0 mt-4'>

                            <h3 className='block  text-[#072320] 
                                     font-dm text-xl capitalize font-medium sm:text-left text-center'>
                                Order Summary
                            </h3>

                            <table className='w-full mt-4'>
                                <tbody>
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Items ({itemCount})</td>
                                        <td className='w-full text-base font-dm text-right'>₹ {oneOrderData?.subtotal}</td>
                                    </tr>
                                    <hr />
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Shipping</td>
                                        <td className='w-full text-base font-dm text-right '>₹ {oneOrderData?.shipping}</td>
                                    </tr>
                                    <hr />
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>taxes</td>
                                        <td className='w-full text-base font-dm text-right '>₹ {oneOrderData?.tax}</td>
                                    </tr>
                                    <hr />
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Total (Incl. taxes)</td>
                                        <td className='w-full text-base font-dm text-right '>₹ {oneOrderData?.total}</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>


                    <div className="sm:flex w-full block mt-8 sm:space-x-4 space-x-0 sm:space-y-0 space-y-3">

                        {hasAccessToken ? (
                            <div className='w-full'>
                                <Btnone
                                    title='My Account'
                                    bgColor="#072320"
                                    width="100%"
                                    handleClick={() => scrollToClick('/my-account')}
                                />
                            </div>
                        ) : null}

                        <div className='w-full'>
                            <Btnone
                                title='continue shopping'
                                bgColor="#072320"
                                width="100%"
                                handleClick={() => scrollToClick('/shop')}
                            />
                        </div>

                    </div>


                </div>



            </div>
        </>
    );
}

export default Thank;

// <tr className='w-full flex items-center justify-between py-2'>
//                                             <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Subtotal</td>
//                                             <td className='w-full text-base font-dm text-right text-white'>₹ {allCartItems?.subtotal}</td>
//                                         </tr>