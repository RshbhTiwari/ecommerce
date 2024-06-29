import { HeadingTitle, Paragraph } from "../basic/title";
import accept from "../../../assets/myaccount/accept.png";
import OrderDetailsList from "./OrderDetailsList";
function DetailsPage({ ordersitem }) {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className="border-[2px]  w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                <div className="grid grid-cols-12 gap-4 ">

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>


                        <div className=''>
                            <HeadingTitle title='order details' textAlign='left' />
                        </div>


                        <div className='mt-2'>

                            <h2 className="text-[#00A762] sm:text-left text-center font-dm text-lg capitalize font-medium">
                                Delivered On :
                            </h2>
                            <Paragraph title={`${formatDate(ordersitem?.date)}`} textAlign='left' />

                            <div className="flex items-center md:justify-left justify-center mt-2">
                                <div className="h-4 w-4 mr-2">
                                    <img
                                        src={accept}
                                        alt='product_img'
                                        className='h-full w-full'
                                    />
                                </div>
                                <Paragraph title='Delivered' textAlign='left' />
                            </div>

                        </div>
                    </div>

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                        <div className='col-span-12'>
                            <HeadingTitle title='payment information' textAlign='left' />
                        </div>
                        <div className='col-span-12 mt-4'>
                            <h2 className="text-[#00A762] sm:text-left text-center font-dm text-lg capitalize font-medium">
                                rishabh tiwari
                            </h2>
                            <Paragraph title='Master card : xxxx-4856' textAlign='left' />
                            <Paragraph title={`amount : $479788`} textAlign='left' />
                        </div>
                    </div>

                </div>
            </div>

            <div className="border-[2px] mt-4 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                <div className="grid grid-cols-12 gap-4 ">

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                        <HeadingTitle title='shipping address' textAlign='left' />
                        <div className="mt-2">
                            <Paragraph title=' RAIPUR, RAIPUR, undefined, Chattisgarh-22, 492004' textAlign='left' />
                            <Paragraph title={`Mobile : ${ordersitem?.phone}`} textAlign='left' />
                        </div>
                    </div>

                    <div className='lg:col-span-6 col-span-12 w-full md:gap-4 gap-0'>
                        <HeadingTitle title='shipping details' textAlign='left' />
                        <div className="mt-2">
                            <Paragraph title='Local Delivery' textAlign='left' />
                        </div>
                    </div>

                </div>
            </div>

            <div className="border-[2px] mt-4 w-full border-[#00A762] py-8 px-8  rounded-md shadow-md mx-auto">
                <HeadingTitle title='order details' textAlign='left' />

                <OrderDetailsList />
            </div>

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