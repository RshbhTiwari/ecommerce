import React, { useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { FiMinus } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookF, FaTwitter } from 'react-icons/fa';
import { FaLink } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import ProductRatings from './ratings/ProductRatings';
import { Btnone, Btnoutline, StockBtn } from "../basic/button";
import { HeadingBanner, Paragraph } from "../basic/title";
import { useDispatch } from 'react-redux';
import { addCartItems } from '../../../redux/slices/addToCart';
import { toast } from 'react-toastify';

const ProductSingleContentPage = ({ oneproduct, singleProductIsloading, singleProductError, localCartItems }) => {

    const linkToShare = 'http://localhost:3000/shop';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const [error, setError] = useState(false);
    const [selectedValues, setSelectedValues] = useState({});
    const [loading, setLoading] = useState(true);
    const { id, name, description, discount_price, sku, price, stock_status,
        variant_name = [], variant_value = [] } = oneproduct;

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleSelectValue = (variant, value) => {
        setSelectedValues(prev => ({
            ...prev,
            [variant]: value
        }));
        setError(false);
    };

    const handleAddToCart = () => {

        if (Object.keys(selectedValues).length === 0) {
            setError(true);
            return;
        }

        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const cart_id = cartDataid !== null ? Number(cartDataid) : null;
    
        const finalPrice = oneproduct.discount_price || oneproduct.price;
        
        const cartItem = {
            item_id: oneproduct.id,
            quantity,
            selectedVariants: selectedValues,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };


        console.log('Payload to be sent to cart:', cartItem);

        // dispatch(addCartItems(cartItem, toast, navigate));
    };


    const handleBuynow = () => {
        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const cart_id = cartDataid !== null ? Number(cartDataid) : null;

        const Buynow = true;

        const cartItem = {
            item_id: oneproduct.id,
            quantity,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(addCartItems(cartItem, toast, navigate, Buynow));
    };

    const matchingItems = localCartItems.filter(item => item.item_id === id);


    if (!oneproduct) {
        return (
            <div className="text-center text-gray-600">
                <p>No product information available.</p>
            </div>
        );
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(linkToShare).then(() => {
            alert('Link copied to clipboard!');
        });
    };

    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(linkToShare)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(linkToShare)}`, '_blank');
    };

    const handleClickCart = () => {
        navigate(`/cart`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {singleProductIsloading || loading ? (
                <>
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded mb-4"></div>

                        <div className="h-5 w-[150px] bg-gray-300 mb-4 rounded"></div>

                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded mb-2"></div>
                        <div className="h-4 w-2/4 bg-gray-300 rounded mb-4"></div>

                        <div className="h-10 w-[150px] bg-gray-300 mb-4 rounded"></div>

                        <div className="flex gap-4 mb-8">
                            <div className="h-12 w-1/2 bg-gray-300 rounded"></div>
                            <div className="h-12 w-1/2 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </>
            ) : singleProductError ? (
                <p>There was an error loading the product.</p>
            ) : (
                <>
                    <div className="mb-4">
                        <StockBtn title={stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'} />
                    </div>

                    <div className="mb-4">
                        <HeadingBanner title={name} color='#072320' />
                    </div>

                    <div className="mb-8">
                        <Paragraph title={description} textAlign='left' />
                    </div>

                    {variant_name.map((variant) => {
                        const matchedValues = variant_value.find(v => v.variant === variant.variant);
                        return (
                            <div key={variant.id} className='my-2'>

                                <h2 className="text-[#00A762] cursor-pointer font-dm text-lg capitalize font-medium ">
                                    {variant.variant}
                                </h2>
                                <ul className="mt-2">
                                    {matchedValues?.multiple_values.map((value) => (

                                        <li
                                            key={value.id}
                                            onClick={() => handleSelectValue(variant.variant, value)}
                                            className={`border  p-2 mb-2 rounded-lg
                                    cursor-pointer flex justify-between items-center
                                         ${selectedValues[variant.variant]?.id === value.id
                                                    ? 'bg-gray-100 text-white border-[#00A762]'
                                                    : ' border-[#072320]'
                                                }`}
                                        >

                                            <p className='m-0 p-0 text-sm font-dm text-[#072320]'>{value.size}</p>
                                            <div>
                                                <p className='m-0 p-0 text-sm font-dm text-[#072320]'>Price : <span className="text-[#00A762]">₹{value.price}</span></p>
                                                <p className='m-0 p-0 text-sm font-dm text-[#072320]'>Discount Price : <span className="text-[#00A762]">₹{value.discount_price}</span></p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}


                    {error && (
                        <p className='text-red-500 font-dm text-sm pb-2'>
                            Please select a value before adding to cart!
                        </p>
                    )}

                    <div className="my-8 flex items-center sm:justify-start justify-center">
                        <div className="">
                            <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium">Quantity</h2>
                        </div>

                        <div className="quantity_btn ml-4" name="quantity">
                            <button className="btn_plus hover:bg-gray-200 hover:rounded-l-lg" type="button" onClick={handleIncrement}>
                                <MdAdd className='text-[#00A762]' />
                            </button>
                            <input className="w-full focus:outline-none text-center bg-transparent" value={quantity} disabled style={{ border: "0px solid" }} />
                            <button className="btn_minus hover:bg-gray-200 hover:rounded-r-lg" type="button" onClick={handleDecrement}>
                                <FiMinus style={{ color: "#00A762" }} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-4 mb-8">

                        {matchingItems.length > 0 ? (
                            <div className='md:col-span-6 col-span-12'>
                                <Btnoutline title="go to cart" width="100%" handleClick={handleClickCart} />
                            </div>
                        ) : (
                            <div className='md:col-span-6 col-span-12'>

                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className={`flex items-center text-[#00A762] border  
                                 justify-center w-full rounded-lg shadow-md font-dm px-3 py-2 capitalize
                                    ${Object.keys(selectedValues).length === 0 ? 'cursor-not-allowed border-[#072320]' : 'cursor-pointer border-[#00A762] '}`}
                                >
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="text-[#00A762] mr-2 text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>

                                    add to cart
                                </button>



                            </div>
                        )}

                        <div className='md:col-span-6 col-span-12'>
                            <Btnone title="buy now" bgColor="#00A762" width="100%"
                                handleClick={handleBuynow} />
                        </div>
                    </div>
                </>
            )}

            <div className="flex items-center justify-between">
                <div className="">
                    <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium">Share on :</h2>
                </div>

                <div className="flex items-center justify-center sm:gap-6 gap-2">

                    <div className="rounded-full bg-[#808080] h-10 w-10 flex items-center justify-center cursor-pointer"
                        onClick={copyToClipboard}
                    >
                        <FaLink className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-[#1877F2] h-10 w-10 flex items-center justify-center cursor-pointer"
                        onClick={shareOnFacebook}>
                        <FaFacebookF className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-green-500 h-10 w-10 flex items-center justify-center cursor-pointer"
                        onClick={shareOnWhatsApp}>
                        <FaWhatsapp className="text-white text-2xl" />
                    </div>

                    <div className="rounded-full bg-[#1DA1F2] h-10 w-10 flex items-center justify-center cursor-pointer"
                        onClick={shareOnTwitter}>
                        <FaTwitter className="text-white text-xl" />
                    </div>
                </div>
            </div>

            <ProductRatings title='4' id={id}/>
        </>
    );
};

export default ProductSingleContentPage;


// import React, { useState } from 'react';
// import { HiOutlineShoppingBag } from "react-icons/hi";

// const ProductSingleContentPage = ({ oneproduct }) => {
//     const { id, variant_name = [], variant_value = [] } = oneproduct;
//     const [error, setError] = useState(false);

//     // State to hold selected values
//     const [selectedValues, setSelectedValues] = useState({});

//     const handleSelectValue = (variant, value) => {
//         setSelectedValues(prev => ({
//             ...prev,
//             [variant]: value
//         }));
//         setError(false);
//     };

//     const handleAddToCart = () => {
//         if (Object.keys(selectedValues).length === 0) {
//             setError(true);
//             return;
//         }
//         const payload = {
//             productId: id,
//             selectedVariants: selectedValues,
//         };

//         console.log('Payload to be sent to cart:', payload);
//     };

//     return (
//         <div className='p-4'>
//             {variant_name.map((variant) => {
//                 const matchedValues = variant_value.find(v => v.variant === variant.variant);
//                 return (
//                     <div key={variant.id} className='my-2'>

//                         <h2 className="text-[#00A762] cursor-pointer font-dm text-lg capitalize font-medium ">
//                             {variant.variant}
//                         </h2>
//                         <ul className="mt-2">
//                             {matchedValues?.multiple_values.map((value) => (

//                                 <li
//                                     key={value.id}
//                                     onClick={() => handleSelectValue(variant.variant, value)}
//                                     className={`border  p-2 mb-2 rounded-lg
//                                     cursor-pointer flex justify-between items-center
//                                          ${selectedValues[variant.variant]?.id === value.id
//                                             ? 'bg-gray-100 text-white border-[#00A762]'
//                                             : ' border-[#072320]'
//                                         }`}
//                                 >

//                                     <p className='m-0 p-0 text-sm font-dm text-[#072320]'>{value.size}</p>
//                                     <div>
//                                         <p className='m-0 p-0 text-sm font-dm text-[#072320]'>Price : <span className="text-[#00A762]">₹{value.price}</span></p>
//                                         <p className='m-0 p-0 text-sm font-dm text-[#072320]'>Discount Price : <span className="text-[#00A762]">₹{value.discount_price}</span></p>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 );
//             })}

//             {error && (
//                 <p className='text-red-500 font-dm text-sm pb-2'>
//                     Please select a value before adding to cart!
//                 </p>
//             )}

//             <div className='flex justify-center items-center px-2 py-2 gap-2'>
//                 <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
//                     <button
//                         onClick={handleAddToCart}
//                         className={`flex items-center justify-center w-full h-full rounded-lg bg-[#072320]
//                             ${Object.keys(selectedValues).length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '}`}

//                     >
//                         <HiOutlineShoppingBag className='text-white text-[22px]' />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductSingleContentPage;





