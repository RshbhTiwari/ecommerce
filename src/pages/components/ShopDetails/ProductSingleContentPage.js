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

const ProductSingleContentPage = ({ oneproduct, singleProductIsloading, singleProductError }) => {

    const linkToShare = 'http://localhost:3000/shop';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);

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

    const handleAddToCart = () => {
        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const cart_id = cartDataid !== null ? Number(cartDataid) : null;

        const finalPrice = oneproduct.discount_price || oneproduct.price;
        const cartItem = {
            item_id: oneproduct.id,
            quantity,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(addCartItems(cartItem, toast, navigate));
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

    const { name, description, discount_price, sku, price, stock_status } = oneproduct;

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

                    <div className="mb-4">
                        {discount_price ? (
                            <div className="flex items-center sm:justify-start justify-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                                <span className="block text-xs line-through">₹{price}</span>
                                <span className="block">₹{discount_price}</span>
                            </div>
                        ) : (
                            <h2 className="text-[#00A762] font-dm text-lg sm:text-left text-center capitalize font-medium pb-2">
                                ₹{price}
                            </h2>
                        )}
                    </div>
                    <div className="mb-8">
                        <Paragraph title={description} textAlign='left' />
                    </div>
                    <div className="mb-8 flex items-center sm:justify-start justify-center">
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
                        <div className='md:col-span-6 col-span-12'>
                            <Btnoutline title="add to cart" width="100%"
                                handleClick={handleAddToCart} />
                        </div>
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

            <ProductRatings title='4' />


        </>
    );
};

export default ProductSingleContentPage;

