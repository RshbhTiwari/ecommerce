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

const ProductSingleContentPage = ({ oneproduct }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const { name, description, discount_price,sku, price, stock_status, additional_images ,short_description} = oneproduct;


    const handleIncrement = () => {
        setQuantity(prev => prev + 1);
    };

    const handleDecrement = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    const handleAddToCart = () => {
        const cart_id = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const finalPrice = discount_price || price;
        const cartItem = {
            item_id: oneproduct.id,
            item_title:name,
            price,
            sku,
            quantity,
            description,
            short_description,
            discount:discount_price,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id }) 
        };
        console.log("cartItem", cartItem) 
        dispatch(addCartItems(cartItem,toast, navigate));
    };


    return (
        <>
            <div className="mb-4">
                <StockBtn title={stock_status === 'in_stock' ? 'In Stock' : 'Out of Stock'} />
            </div>

            <div className="mb-4">
                <HeadingBanner title={name} color='#072320' />
            </div>

            <div className="mb-4">
                {discount_price ? (
                    <>
                        <div className="flex items-center sm:justify-start justify-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                            <span className="block text-xs line-through">₹{price}</span>
                            <span className="block">₹{discount_price}</span>
                        </div>
                    </>
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
                        <MdAdd className='text-[#00A762]'  />
                    </button>
                    <input className="w-full focus:outline-none text-center bg-transparent" value={quantity} disabled style={{ border: "0px solid" }} />
                    <button className="btn_minus hover:bg-gray-200 hover:rounded-r-lg" type="button" onClick={handleDecrement}>
                        <FiMinus style={{ color: "#00A762" }} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 mb-8">
                <div className='md:col-span-6 col-span-12'>
                    <Btnoutline title="add to cart" width="100%" handleClick={handleAddToCart} />
                </div>
                <div className='md:col-span-6 col-span-12'>
                    <Btnone title="buy now" bgColor="#00A762" width="100%" />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="">
                    <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium">Share on :</h2>
                </div>

                <div className="flex items-center justify-center sm:gap-6 gap-2">
                    <div className="rounded-full bg-[#808080] h-10 w-10 flex items-center justify-center">
                        <FaLink className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-[#1877F2] h-10 w-10 flex items-center justify-center">
                        <FaFacebookF className="text-white text-xl" />
                    </div>

                    <div className="rounded-full bg-green-500 h-10 w-10 flex items-center justify-center">
                        <FaWhatsapp className="text-white text-2xl" />
                    </div>

                    <div className="rounded-full bg-[#1DA1F2] h-10 w-10 flex items-center justify-center">
                        <FaTwitter className="text-white text-xl" />
                    </div>
                </div>
            </div>

            <ProductRatings title='4' />
        </>
    );
};

export default ProductSingleContentPage;
