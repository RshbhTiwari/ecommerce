import BreadCrum from "../basic/BreadCrum";
import { useNavigate, Link } from "react-router-dom";
import { HeadingTitle, Paragraph } from "../basic/title";
import { Btnone } from "../basic/button";
import { AccountSideNav } from "./sidenav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMyccount } from "../../../redux/slices/user";

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

function Useramyccount({ customer_id, oneuser }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading: userIsLoading, error: userError, myccountdata } = useSelector(
        (state) => state.user
    );

    useEffect(() => {
        dispatch(getMyccount(customer_id));
    }, [dispatch, customer_id]);

    console.log("myccountdata", myccountdata)


    if (userError) {
        return <div>Error: {userError.message}</div>;
    }

    const handleEditRow = (id) => {
        navigate(`/my-account/edit-address/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleorderdetailsRow = (id) => {
        navigate(`/my-account/orders/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    console.log("myccountdata?.orders?", myccountdata?.orders)

    const scrollToClick = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <BreadCrum componentName="my account" link="/my-account" />

            <div className="container mx-auto flex flex-col items-center justify-center max-w-7xl px-2 sm:px-6 lg:px-8">

                <div className="grid grid-cols-12 md:gap-4 gap-0 my-10 ">

                    <div className='lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>
                        <AccountSideNav />
                    </div>

                    <div className='lg:col-span-8 col-span-12 w-full md:gap-4 gap-0'>
                        <HeadingTitle title="my account" textAlign='left' />

                        {oneuser ? (
                            <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                                data-aos-duration="1000">
                                <HeadingTitle title="Account Summary" textAlign='left' />

                                <div className="grid grid-cols-12 md:gap-4 gap-0 mt-4">

                                    <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                        <h3 className='block  text-[#072320] 
                         font-dm text-lg capitalize font-medium'><span className="text-[#00A762]">customer Name : </span>
                                            <br />{oneuser?.name}</h3>
                                    </div>

                                    <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                        <h3 className='block  text-[#072320] 
                         font-dm text-lg capitalize font-medium'>
                                            <span className="text-[#00A762]">Email : </span> <br />{oneuser?.email}</h3>
                                    </div>



                                    <div className='md:col-span-6 lg:col-span-4 col-span-12 w-full md:gap-4 gap-0'>

                                        <h3 className='block  text-[#072320] 
                        font-dm text-lg capitalize font-medium'><span className="text-[#00A762]">Password   : </span> <br />
                                            *********
                                        </h3>
                                    </div>



                                    <div className='col-span-12'>

                                        <div className="w-full sm:gap-4 gap-2 flex  items-center justify-between sm:justify-start ">
                                            <div>
                                                <Btnone title="edit" bgColor="#00A762" handleClick={() => scrollToClick('/my-account/update-profile')} />
                                            </div>

                                            <div>
                                                <Btnone title="Password Recovery" bgColor="#072320" handleClick={() => scrollToClick('/forgotpassword')} />
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ) : (
                            null
                        )}


                        <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                            data-aos-duration="1000">
                            <HeadingTitle title="address information" textAlign='left' />

                            <div className="grid grid-cols-12 gap-4 mt-4">
                                {myccountdata?.billing_address ? (
                                    <div className='md:col-span-6 col-span-12 w-full gap-4 '>
                                        <h3 className='block  text-[#072320] sm:text-left text-center
                                     font-dm text-lg capitalize font-medium'>default billing address</h3>

                                        <div className="flex flex-col w-full mt-4">
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Addressname : </span>{myccountdata?.billing_address?.addressname}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Landmarkname : </span>{myccountdata?.billing_address?.landmarkname}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">City : </span>{myccountdata?.billing_address?.city}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Pincode : </span>{myccountdata?.billing_address?.pincode}
                                            </p>

                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Address Type : </span>{myccountdata?.billing_address?.addresstype}
                                            </p>
                                        </div>


                                        <div className="mt-4 sm:text-left text-center">
                                            <Btnone title="edit" bgColor="#00A762" handleClick={() => handleEditRow(myccountdata?.billing_address?.id)} />
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}

                                {myccountdata?.shipping_address ? (
                                    <div className='md:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                                        <h3 className='block  text-[#072320] 
                                     font-dm text-lg capitalize font-medium sm:text-left text-center'>default shipping address</h3>



                                        <div className="flex flex-col w-full mt-4">
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Addressname : </span>{myccountdata?.shipping_address?.addressname}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Landmarkname : </span>{myccountdata?.shipping_address?.landmarkname}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">City : </span>{myccountdata?.shipping_address?.city}
                                            </p>
                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Pincode : </span>{myccountdata?.shipping_address?.pincode}
                                            </p>

                                            <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                                <span className="text-[#00A762]">Address Type : </span>{myccountdata?.shipping_address?.addresstype}
                                            </p>
                                        </div>

                                        <div className="mt-4 sm:text-left text-center">
                                            <Btnone title="edit" bgColor="#00A762" handleClick={() => handleEditRow(myccountdata?.shipping_address?.id)} />
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}
                            </div>

                        </div>

                        {myccountdata?.orders && myccountdata?.orders?.length > 0 ? (
                            <div className="border-[2px] mt-8 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto" data-aos="fade-up"
                                data-aos-duration="1000">
                                <HeadingTitle title="orders" textAlign='left' />

                                <div className="grid grid-cols-12 md:gap-4 gap-0 mt-4 w-full">

                                    {myccountdata?.orders?.map((item, index) => (
                                        <div className="md:col-span-6 col-span-12 w-full md:gap-4 gap-0
                                        flex shadow-md rounded-lg justify-between relative my-4" key={index}>

                                            <div className="flex items-center py-4 px-4 gap-4">


                                                <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden overflow-hidden cursor-pointer'
                                                    onClick={() => handleorderdetailsRow(item?.id)}>
                                                    <img
                                                        src={BASE_IMAGE_URL + item?.items[0]?.product_image}
                                                        alt='product_img'
                                                        className='h-full w-full rounded-md m-1 hover:scale-110 transition-all duration-500'
                                                    />
                                                </div>


                                                <div className="flex justify-center flex-col">


                                                    <h2 className="text-[#00A762] cursor-pointer text-left font-dm text-lg capitalize font-medium"
                                                        onClick={() => handleorderdetailsRow(item?.id)}>
                                                        {item?.items[0]?.product_name}
                                                    </h2>

                                                    <Paragraph
                                                        title={`Delivered on 
                                                            ${new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(item?.created_at))}`}
                                                        textAlign='onyleft'
                                                    />

                                                </div>


                                            </div>

                                        </div>
                                    ))}
                                </div>

                            </div>
                        ) : (
                            null
                        )}

                    </div>
                </div>
            </div>
        </>

    );
}

export default Useramyccount;