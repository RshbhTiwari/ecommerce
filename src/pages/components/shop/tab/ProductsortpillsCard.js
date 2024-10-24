import React, { useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../basic/title';
import { addCartItems, getAllCartItems } from '../../../../redux/slices/addToCart';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, postWishlistUser } from '../../../../redux/slices/wishlist';

const ProductsortpillsCard = ({ skeletonCount, allProducts, productIsLoading, productError, localCartItems, wishlist }) => {

    const [loading, setLoading] = useState(true);

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isItemInCart = (itemId) => {
        return localCartItems?.some((cartItem) => cartItem.item_id === itemId);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleAddToCart = (product_id) => {
        const cartDataid = localStorage?.getItem('cart_id') || null;
        const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;

        const cart_id = cartDataid !== null ? Number(cartDataid) : null;
        const cartItem = {
            item_id: product_id,
            ...(cart_id && { cart_id }),
            ...(customer_id && { customer_id })
        };
        dispatch(addCartItems(cartItem, toast, navigate));
    };

    const handleAddWishlist = (product_id) => {
        const accessToken = localStorage.getItem('accessToken') || null;
        if (accessToken) {
            const user_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
            const payload = {
                product_id: product_id,
                ...(user_id && { user_id })
            };
            dispatch(postWishlistUser(payload, toast, navigate));
        } else {
            navigate('/login');
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            toast.error("You need to log in to add to wishlist");
        }
    };

    if (loading || productIsLoading) {
        return (
            <div className="flex flex-col space-y-4">
                {Array.from({ length: skeletonCount }, (_, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg shadow-md bg-gray-100">
                        <div className="w-1/4 h-[150px] bg-gray-300 animate-pulse rounded-md " />
                        <div className='w-3/4 pl-2'>
                            <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md mb-2" />
                            <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md mb-2" />
                            <div className="w-full h-4 bg-gray-300 animate-pulse rounded-md mb-2" />
                            <div className="w-1/2 h-4 bg-gray-300 animate-pulse rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (productError) {
        return <div className="text-red-500">An error occurred: {productError}</div>;
    }

    const isItemInwishlist = (itemId) => {
        return wishlist?.some((wishlistItem) => wishlistItem.product_id === itemId);
    };

    return (
        <>
            {allProducts.map((item, index) => (
                <div
                    className={`grid grid-cols-12 sm:gap-4 gap-2 mb-2 sm:py-2 py-1 sm:px-2 px-1 flex relative h-full items-center rounded-lg shadow-md
                     ${index % 2 === 0 ? '' : 'bg-gray-200 '}`}
                    key={index}
                >
                    {/* sm:block hidden */}
                    <div className="lg:col-span-3 sm:col-span-4 col-span-4 flex items-center 
                    h-[150px] w-full justify-center rounded-md bg-[#00A762] sm:p-3 p-0">
                        {item.additional_images && item.additional_images.length > 0 ? (
                            <img
                                src={BASE_IMAGE_URL + item.additional_images[0]}
                                alt='product_img'
                                className="w-full zoom-image h-full object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md" />
                        )}
                    </div>

                    <div className="col-span-8 sm:col-span-8 lg:col-span-9 flex justify-center flex-col">
                        <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                            {item.name}
                        </h2>
                        <Paragraph title={item.short_description} shortDescription='true' textAlign='onyleft' readjustifytext='start' />
                        {item?.discount_price ? (
                            <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                                <span className="block text-xs line-through">₹{item?.price}</span>
                                <span className="block">₹{item?.discount_price}</span>
                            </div>
                        ) : (
                            <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">
                                ₹{item?.price}
                            </h2>
                        )}
                    </div>
                    <div className="absolute inset-0 flex items-center right-0 top-0 left-0 bottom-0 justify-center rounded-lg opacity-0 bg-[#00000040] hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center flex justify-center items-center gap-2">

                            <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
                                <button
                                    onClick={() => handleAddWishlist(item?.id)}
                                    disabled={isItemInwishlist(item?.id)}
                                    className={`flex items-center justify-center w-full h-full rounded-lg ${isItemInwishlist(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
                                >
                                    <FaRegHeart className='text-white text-[22px]' />
                                </button>
                            </div>

                            <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320]'>
                                <button
                                    onClick={() => handleAddToCart(item?.id)}
                                    disabled={isItemInCart(item?.id)}
                                    className={`flex items-center justify-center w-full h-full rounded-lg ${isItemInCart(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
                                >
                                    <HiOutlineShoppingBag className='text-white text-[22px]' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProductsortpillsCard;
