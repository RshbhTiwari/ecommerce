import { useNavigate } from 'react-router-dom';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle } from '../basic/title';
import AccordionExample from './Accordion';
import OrderSummary from './Accordion/OrderSummary';
import { Btnone } from '../basic/button';

export default function CheckoutCard({ cartData, itemCount, allCartItems }) {
    const navigate = useNavigate();
    return (
        <>
            <BreadCrum componentName="checkout" link="/checkout" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='py-10'>
                    <div className="grid grid-cols-12 md:gap-8 gap-4 ">

                        <div className='lg:col-span-7 col-span-12'>
                            <AccordionExample />
                        </div>

                        <div className='lg:col-span-5 col-span-12'>

                            <div className='shadow-md rounded-lg bg-[#072320] p-4'>

                                <HeadingTitle title={`Order Summary(${itemCount} item)`} textAlign='left' color='white' border='white' />

                                <div className=''>
                                    <OrderSummary cartData={cartData} />
                                </div>

                                <table className='w-full my-4'>
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full
                                                             font-dm text-lg capitalize font-medium'>Sub Total</td>

                                        <td className='w-full text-base font-dm text-right text-white'>₹ {allCartItems?.subtotal}</td>
                                    </tr>
                                    <hr />
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full
                                                             font-dm text-lg capitalize font-medium'>Total Payable</td>

                                        <td className='w-full text-base font-dm text-right text-white'>₹ {allCartItems?.grand_total_cart}</td>
                                    </tr>
                                    <hr />

                                    <div className='w-full mt-6'>
                                        <Btnone title="Confirm Order" handleClick={() => navigate('/checkout')} bgColor="#00A762" borderColor="#00A762" width="100%" />
                                    </div>

                                </table>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}