import { HeadingTitle, Paragraph } from "../basic/title";
import accept from "../../../assets/myaccount/accept.png";
import OrderDetailsList from "./OrderDetailsList";

function DetailsPage({ ordersitem }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options);
    };

    const showPaymentInfo = ordersitem?.transaction && ordersitem?.transaction?.status === 'captured';
    const showAddressInfo = ordersitem?.billing_address && ordersitem?.shipping_address;

    return (
        <>
            <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                <div className="grid grid-cols-12 gap-4 ">

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>


                        <div className=''>
                            <HeadingTitle title='order details' textAlign='left' />
                        </div>


                        <div className='mt-2'>

                            <h2 className="text-[#00A762] text-center md:text-left
                             font-dm text-lg capitalize font-medium">
                                Order Placement:
                            </h2>
                            <Paragraph title={`${formatDate(ordersitem?.created_at)}`} textAlign='left' />

                            {/* <div className="flex items-center justify-center md:justify-start mt-2">
                                <div className="h-4 w-4 mr-2">
                                    <img
                                        src={accept}
                                        alt='product_img'
                                        className='h-full w-full'
                                    />
                                </div>
                                <Paragraph title='Delivered' textAlign='left' />
                            </div> */}

                        </div>
                    </div>

                    {showPaymentInfo ? (
                        <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                            <div className='col-span-12'>
                                <HeadingTitle title='payment information' textAlign='left' />
                            </div>
                            <div className='col-span-12 mt-4'>
                                <h2 className="text-[#00A762] text-center md:text-left font-dm text-lg capitalize font-medium">
                                    {ordersitem?.user?.name}
                                </h2>
                                <Paragraph title={`Payment Method : ${ordersitem?.transaction?.payment_method}`} textAlign='left' />
                                <Paragraph title={`Amount : ₹ ${ordersitem?.transaction?.amount}`} textAlign='left' />
                                <Paragraph title={`Purchase Date : ${ordersitem?.transaction?.transaction_date}`} textAlign='left' />
                                <div className="flex items-center justify-center md:justify-start mt-2">
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
                            </div>
                        </div>
                    ) : null}

                </div>
            </div>

            {showAddressInfo ? (
                <div className="border-[2px] mt-4 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                    <div className="grid grid-cols-12 gap-4 ">
                        {ordersitem?.shipping_address ? (
                            <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                                <HeadingTitle title='shipping address' textAlign='left' />
                                <div className="mt-2">
                                    <div className="">
                                        <Paragraph textAlign='onyleft' title={ordersitem?.shipping_address?.email} />
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">+91 </span>{ordersitem?.shipping_address?.contact}
                                        </p>
                                    </div>

                                    <div className="flex flex-col w-full mt-4">
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Addressname : </span>{ordersitem?.shipping_address?.addressname}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Landmarkname : </span>{ordersitem?.shipping_address?.landmarkname}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">City : </span>{ordersitem?.shipping_address?.city}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Pincode : </span>{ordersitem?.shipping_address?.postal_code}
                                        </p>

                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Address Type : </span>{ordersitem?.shipping_address?.addrestype}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        ) : null}

                        {ordersitem?.billing_address ? (
                            <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                                <HeadingTitle title='Billing address' textAlign='left' />
                                <div className="mt-2">
                                    <div className="">
                                        <Paragraph textAlign='onyleft' title={ordersitem?.billing_address?.email} />
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">+91 </span>{ordersitem?.billing_address?.contact}
                                        </p>
                                    </div>

                                    <div className="flex flex-col w-full mt-4">
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Addressname : </span>{ordersitem?.billing_address?.addressname}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Landmarkname : </span>{ordersitem?.billing_address?.landmarkname}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">City : </span>{ordersitem?.billing_address?.city}
                                        </p>
                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Pincode : </span>{ordersitem?.billing_address?.postal_code}
                                        </p>

                                        <p className={`font-dm text-md capitalize font-medium text-left text-[#072320]`}>
                                            <span className="text-[#00A762]">Address Type : </span>{ordersitem?.billing_address?.addrestype}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            ) : null}

            {ordersitem?.items?.length > 0 ? (
                <div className="border-[2px] mt-4 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                    <HeadingTitle title='order details' textAlign='left' />
                    <OrderDetailsList ordersitem={ordersitem} />
                </div>
            ) : null}
        </>

    );
}

export default DetailsPage;

{/* <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
<div className='col-span-12'>
    <HeadingTitle title='payment information' textAlign='left' />
</div>
<div className='col-span-12 mt-4'>
<Paragraph title='Delivering to' textAlign='left' />
<h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
    rishabh tiwari
</h2>

</div>
</div> */}