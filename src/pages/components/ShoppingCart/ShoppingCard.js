import BreadCrum from '../basic/BreadCrum';
import { HeadingTitle, Paragraph } from '../basic/title';
import { Btnone } from '../basic/button';
import { useNavigate } from 'react-router-dom';
import ShoppingCartTable from './ShoppingCartTable';
import CartEmpty from '../basic/ErrorPages/cartempty';
import { MdOutlineArrowBackIos } from "react-icons/md";
import { FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { PostAddAllSalectItems, RemoveAllCartItems } from '../../../redux/slices/addToCart';


export default function ShoppingCard({ selectLength, cartData, itemCount, allCartItems, cartIsLoading, cartErorr }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getCheckboxState = () => {
        const cartLength = cartData?.length;
        const SelectItemcartData = selectLength;

        if (cartLength === SelectItemcartData && cartLength > 0) {
            return true; // All items selected
        } else if (SelectItemcartData === 0) {
            return false; // No items selected
        } else {
            return 'indeterminate'; // Some items selected 
        }
    };

    const handleCheckboxChange = async (e) => {
        try {
            const isChecked = e.target.checked;
            console.log("isChecked", isChecked)
            const cart_id = localStorage?.getItem('cart_id') || null;
            const payload = {
                selected: isChecked,
            };
            dispatch(PostAddAllSalectItems(payload, cart_id, toast));
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleAllCartRemove = async () => {
        try {
            const cart_id = localStorage?.getItem('cart_id') || null;
            dispatch(RemoveAllCartItems(cart_id, toast));
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const checkboxState = getCheckboxState();

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

                                    <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start  sm:justify-between">

                                        <FormProvider>
                                            <FormContent
                                                isChecked={checkboxState === true ? true : checkboxState === 'indeterminate' ? false : false}
                                                onCheckboxChange={(e) => handleCheckboxChange(e)}
                                                itemCount={itemCount}
                                                selectLength={selectLength}
                                                checkboxState={checkboxState}
                                            />
                                        </FormProvider>

                                        <p class="text-base font-dm text-left cursor-pointer text-[#072320]"
                                          onClick={() => handleAllCartRemove()}>Remove All Items</p>
                                    </div>


                                    <div className="overflow-x-auto mt-6">
                                        <ShoppingCartTable
                                            shoppingcart={cartData}
                                            itemCount={itemCount} cartIsLoading={cartIsLoading}
                                            cartErorr={cartErorr}
                                        /> 
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

function FormContent({ isChecked, onCheckboxChange, itemCount, selectLength, checkboxState }) {
    console.log("checkboxState", checkboxState)
    return (
        <form className="w-fit flex items-center justify-center">
            <label className="custom-checkbox">
                <input
                    id="myCheckbox"
                    type="checkbox"
                    checked={isChecked === true}
                    onChange={onCheckboxChange}
                    ref={(checkbox) => {
                        if (checkbox) {
                            checkbox.indeterminate = isChecked === 'indeterminate';
                        }
                    }}
                />
                {checkboxState === 'indeterminate' ? (
                    <span className="checkmark text-[38px] text-[#072320]"
                        style={{
                            paddingBottom: "9px"
                        }}>-</span>
                ) : (
                    <span className="checkmark"></span>
                )}

            </label>
            <div className='ml-2' htmlFor="myCheckbox">{selectLength}/{itemCount} Items Selected</div>
        </form>
    );
}

//  how to achive react js if cart cartData.lenght and
//  SelectItemcartData.lenght equel equal than checkbox
//  true else SelectItemcartData.lenght xero than checkbox false and middele value checkbox design -
//   how to possible this type code

// import React from 'react';
// import { FormProvider } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// export default function ShoppingCard({ cartData, itemCount, selectLength }) {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const getCheckboxState = () => {
//         const cartLength = cartData?.length;
//         const selectLength = SelectItemcartData?.length;

//         if (cartLength === selectLength && cartLength > 0) {
//             return true; // All items selected
//         } else if (selectLength === 0) {
//             return false; // No items selected
//         } else {
//             return 'indeterminate'; // Some items selected
//         }
//     };

//     const handleCheckboxChange = async (e) => {
//         try {
//             const isChecked = e.target.checked;
//             console.log("isChecked",isChecked)
//             const cart_id = localStorage?.getItem('cart_id') || null;
//             const payload = {
//                 selected: isChecked,
//             };
//             dispatch(PostAddAllSalectItems(payload, cart_id, toast));
//         } catch (error) {
//             toast.error('An error occurred');
//         }
//     };

//     const checkboxState = getCheckboxState();

//     return (
//         <>
//             <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-start sm:justify-between">
//             <FormProvider>
//                                             <FormContent
//                                                 isChecked={checkboxState === true ? true : checkboxState === 'indeterminate' ? false : false}
//                                                 onCheckboxChange={(e) => handleCheckboxChange(e)}
//                                                 itemCount={itemCount}
//                                                 selectLength={selectLength}
//                                             />
//                                         </FormProvider>
//                 <p className="text-base font-dm text-left text-[#000000]"> REMOVE </p>
//             </div>
//         </>
//     );
// }


// function FormContent({ isChecked, onCheckboxChange, itemCount, selectLength }) {
//     return (
//         <form className="w-fit">
//             <label className="font-dm text-md flex justify-center items-center font-medium cursor-pointer" >
//                 <input
//                     className="mr-1 "
//                     type="checkbox"
//                     checked={isChecked === true}
//                     onChange={onCheckboxChange}
//                     ref={(checkbox) => {
//                         if (checkbox) {
//                             checkbox.indeterminate = isChecked === 'indeterminate';
//                         }
//                     }}
//                 />
//                 {selectLength}/{itemCount} Items Selected
//             </label>
//         </form>
//     );
// }