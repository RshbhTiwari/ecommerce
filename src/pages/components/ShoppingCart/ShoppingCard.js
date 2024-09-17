import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle, Paragraph } from '../basic/title';
import { Btnone } from '../basic/button';
import { useNavigate } from 'react-router-dom';
import ShoppingCartTable from './ShoppingCartTable';
import CartEmpty from '../basic/ErrorPages/cartempty';
import { MdOutlineArrowBackIos } from "react-icons/md";

export default function ShoppingCard({ cartData, itemCount, allCartItems, cartIsLoading, cartErorr }) {
    const navigate = useNavigate();

    const scrollToClick = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            <BreadCrum componentName="Cart" link="/shop" />

            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='py-10'>

                    <div className="grid grid-cols-12 md:gap-8 gap-6 sm:p-8 p-0 shadow-md rounded-lg">
                        <div className='lg:col-span-8 col-span-12'>

                            <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                                <h2 className={`font-dm text-2xl capitalize font-medium text-left text-[#072320]`} >Shopping Cart</h2>
                                <div className='font-dm  text-[#072320] flex items-center justify-start cursor-pointer'
                                    onClick={() => scrollToClick('/shop')} >
                                    <MdOutlineArrowBackIos className='font-xl text-[#072320]' />
                                    <h1 className='capitalize font-medium'>continue shopping</h1>
                                </div>
                            </div>



                            {cartData?.length > 0 ? (
                                <>
                                    <div className='mt-2'>
                                        <Paragraph title={`You have ${itemCount} items in your cart`} textAlign='left' />
                                    </div>
                                    <div className="overflow-x-auto mt-6">
                                        <ShoppingCartTable shoppingcart={cartData} itemCount={itemCount} cartIsLoading={cartIsLoading} cartErorr={cartErorr} />
                                    </div>
                                </>
                            ) : (
                                <CartEmpty height="200px" />
                            )}

                        </div>

                        <div className='lg:col-span-4 col-span-12'>
                            <div className='shadow-md rounded-lg bg-[#072320] p-4'>
                                <HeadingTitle title="Card details" textAlign='left' color='white' border='white' />

                                <div className='flex items-center justify-between pt-4 gap-4'>
                                    <div className='w-full'>
                                        <input className='code_input w-full bg-[#072320]' placeholder='Code' type="text" id="code" />
                                    </div>

                                    <div className='w-full'>
                                        <Btnone title="Apply Code" bgColor="#00A762" borderColor="#00A762" width="100%" />
                                    </div>
                                </div>

                                <table className='w-full my-4'>
                                    <tbody>
                                        <tr className='w-full flex items-center justify-between py-2'>
                                            <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Subtotal</td>
                                            <td className='w-full text-base font-dm text-right text-white'>₹ {allCartItems?.subtotal}</td>
                                        </tr>
                                        <hr />
                                        {/* <tr className='w-full flex items-center justify-between py-2'>
                                            <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Shipping</td>
                                            <td className='w-full text-base font-dm text-right text-white'>$48.00</td>
                                        </tr>
                                        <hr /> */}
                                        <tr className='w-full flex items-center justify-between py-2'>
                                            <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Total (Incl. taxes)</td>
                                            <td className='w-full text-base font-dm text-right text-white'>₹ {allCartItems?.grand_total_cart}</td>
                                        </tr>
                                        <hr />
                                    </tbody>
                                </table>
                                {cartData?.length > 0 ? (
                                    <div className='w-full py-4'>
                                        <Btnone title="Proceed to Checkout" handleClick={() => scrollToClick('/checkout')} bgColor="#00A762" borderColor="#00A762" width="100%" />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

