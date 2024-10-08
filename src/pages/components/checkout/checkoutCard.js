import { FormProvider } from 'react-hook-form';
import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle } from '../basic/title';
import AccordionExample from './Accordion';
import OrderSummary from './Accordion/OrderSummary';
import { toast } from 'react-toastify';

export default function CheckoutCard({ cartData, itemCount, allCartItems, SelectItemcartData }) {
    const getCheckboxState = () => {
        const cartLength = cartData?.length;
        const selectLength = SelectItemcartData?.length;

        if (cartLength === selectLength && cartLength > 0) {
            return true; // All items selected
        } else if (selectLength === 0) {
            return false; // No items selected
        } else {
            return 'indeterminate'; // Some items selected
        }
    };

    const handleCheckboxChange = async (e) => {
        try {
            const isChecked = e.target.checked;
            if (isChecked) {
                // dispatch(PostAddAllSalectItems());
            } else {
            }
        } catch (error) {
            toast.error('Failed to update address.');
        }
    };

    const checkboxState = getCheckboxState();
    return (
        <>
            <BreadCrum componentName="checkout" link="/checkout" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='py-10'>
                    <div className="grid grid-cols-12 md:gap-8 gap-4 ">

                        <div className='lg:col-span-7 col-span-12'>
                            <AccordionExample cartData={cartData} />
                        </div>

                        <div className='lg:col-span-5 col-span-12'>

                            <div className='shadow-md rounded-lg bg-[#072320] p-4'>

                                <HeadingTitle title={`Order Summary(${itemCount} item)`} textAlign='left' color='white' border='white' />
                                <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start  sm:justify-between">

                                    <FormProvider>
                                        <FormContent
                                            isChecked={checkboxState === true ? true : checkboxState === 'indeterminate' ? false : false}
                                            onCheckboxChange={handleCheckboxChange}
                                            itemCount={itemCount}
                                        />
                                    </FormProvider>

                                    <p class="text-base font-dm text-left  text-white"> REMOVE </p>
                                </div>


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
                                </table>

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>

    );
}

function FormContent({ isChecked, onCheckboxChange, itemCount }) {
    return (
        <form className="w-fit">
            <label className="font-dm text-md flex justify-center items-center font-medium cursor-pointer text-white" >
                <input
                    className="mr-1 "
                    type="checkbox"
                    checked={isChecked === true}
                    onChange={onCheckboxChange}
                    ref={(checkbox) => {
                        if (checkbox) {
                            checkbox.indeterminate = isChecked === 'indeterminate';
                        }
                    }}
                />
                {itemCount}/{itemCount} Items Selected
            </label>
        </form>
    );
}