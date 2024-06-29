
import productcard from '../../../data/productcard';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle, Paragraph } from '../basic/title';
import { Btnone } from '../basic/button';
import AccordionExample from './Accordion';
import OrderSummary from './Accordion/OrderSummary';

export default function CheckoutCard() {
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

                                <HeadingTitle title="Order Summary ( 1 item )" textAlign='left' color='white' border='white' />

                                <div className=''>
                                <OrderSummary />
                                </div>

                                <table className='w-full my-4'>
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full
                                                             font-dm text-lg capitalize font-medium'>Sub Total</td>

                                        <td className='w-full text-base font-dm text-right text-white'>$4800.00</td>
                                    </tr>
                                    <hr />
                                    <tr className='w-full flex items-center justify-between py-2'>
                                        <td className='text-[#00A762] text-left w-full
                                                             font-dm text-lg capitalize font-medium'>Total Payable</td>

                                        <td className='w-full text-base font-dm text-right text-white'>$4800.00</td>
                                    </tr>
                                    <hr />
                                </table>
                                
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}