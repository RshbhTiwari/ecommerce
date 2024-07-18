import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle, Paragraph } from '../basic/title';
import { Btnone } from '../basic/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllCartItems } from '../../../redux/slices/addToCart';
import { ToastContainer } from 'react-toastify';
import ShoppingCartTable from './ShoppingCartTable';
import CartEmpty from '../basic/ErrorPages/cartempty';

export default function ShoppingCard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart_id = localStorage?.getItem('cart_id') || null;
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

    const token = localStorage?.getItem('accessToken') || null;

    const { allCartItems, loading, error } = useSelector(
        (state) => state.addToCart
    );
    const cartData = allCartItems?.items || [];
    const itemCount = cartData.length;

    

    useEffect(() => {
        if (token) {
            dispatch(getAllCartItems(customer_id));
        } else {
            dispatch(getAllCartItems(cart_id));
        }
    }, [dispatch, cart_id, customer_id, token]);

    
    useEffect(() => {
        console.log('Item count has changed:', itemCount);
    }, [itemCount, allCartItems]);


    return (
        <>
            <ToastContainer />
            <BreadCrum componentName="Cart" link="/shop" />
            <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className='py-10'>
                    <div className="grid grid-cols-12 md:gap-8 gap-6 sm:p-8 p-0 shadow-md rounded-lg">
                        <div className='lg:col-span-8 col-span-12'>
                            <HeadingTitle title="Shopping Cart" textAlign='left' />
                            {cartData?.length > 0 ? (
                                <>
                                    <div className='mt-2'>
                                        <Paragraph title={`You have ${itemCount} items in your cart`} textAlign='left' />
                                    </div>
                                    <div className="overflow-x-auto mt-6">
                                        <ShoppingCartTable shoppingcart={cartData} />
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
                                            <td className='w-full text-base font-dm text-right text-white'>$4798.00</td>
                                        </tr>
                                        <hr />
                                        <tr className='w-full flex items-center justify-between py-2'>
                                            <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Shipping</td>
                                            <td className='w-full text-base font-dm text-right text-white'>$48.00</td>
                                        </tr>
                                        <hr />
                                        <tr className='w-full flex items-center justify-between py-2'>
                                            <td className='text-[#00A762] text-left w-full font-dm text-lg capitalize font-medium'>Total (Incl. taxes)</td>
                                            <td className='w-full text-base font-dm text-right text-white'>$4800.00</td>
                                        </tr>
                                        <hr />
                                    </tbody>
                                </table>

                                <div className='w-full py-4'>
                                    <Btnone title="Proceed to Checkout" handleClick={() => navigate('/checkout')} bgColor="#00A762" borderColor="#00A762" width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
