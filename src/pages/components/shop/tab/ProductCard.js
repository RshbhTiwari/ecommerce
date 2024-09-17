import React, { useState, useEffect } from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useLocation, useNavigate } from 'react-router-dom';
import { Paragraph } from '../../basic/title';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems, getAllCartItems } from '../../../../redux/slices/addToCart';
import { postWishlistUser } from '../../../../redux/slices/wishlist';

const ProductCard = ({ allProducts, productIsLoading, productError, skeletonCount }) => {

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const isHomePath = location.pathname === '/';
    const [loading, setLoading] = useState(true);

    const cart_id = localStorage?.getItem('cart_id') || null;
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
    const token = localStorage?.getItem('accessToken') || null;

    const [localCartItems, setLocalCartItems] = useState([]);
    const { allCartItems, isLoading: cartIsLoading, error: cartErorr } = useSelector(
        (state) => state.addToCart
    );

    useEffect(() => {
        if (allCartItems?.items) {
            setLocalCartItems(allCartItems?.items);
        }
    }, [allCartItems]);

    useEffect(() => {
        if (token) {
            const payload = {
                status: true,
            };
            dispatch(getAllCartItems(customer_id, payload));
        } else {
            const payload = {
                status: false,
            };
            dispatch(getAllCartItems(cart_id, payload));
        }
    }, [dispatch, cart_id, customer_id, token]);

    const isItemInCart = (itemId) => {
        return localCartItems.some((cartItem) => cartItem.item_id === itemId);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

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
            toast.error("You need to log in to add to wishlist");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    if (loading || productIsLoading) {
        return (
            <div className="grid grid-cols-12 gap-4">
                {Array.from({ length: skeletonCount }, (_, index) => (
                    <div
                        key={index}
                        className={`md:col-span-6 ${isHomePath ? 'lg:col-span-3' : 'lg:col-span-4'} col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg animate-pulse border-2`}
                    >
                        <div className="flex justify-center items-center bg-gray-300 p-4 rounded-lg mt-3 mb-2 mx-6 relative">
                            <div className="w-[200px] h-[200px] bg-gray-400 rounded-lg"></div>
                        </div>
                        <div className="flex flex-col justify-center items-center px-4 w-full">
                            <div className="w-1/4 h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div>
                        </div>
                        <div className="flex justify-center items-center px-2 py-2 gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gray-300"></div>
                            <div className="w-10 h-10 rounded-lg bg-gray-300"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (productError) {
        return (
            <div className="text-center text-red-500">
                <p>Oops! Something went wrong. Please try again later.</p>
            </div>
        );
    }

    return (

        <div className="grid grid-cols-12 gap-4">
            {allProducts?.map((item, index) => (
                <div
                    className={`md:col-span-6 ${isHomePath ? 'lg:col-span-3' : 'lg:col-span-4'} col-span-12 flex flex-col justify-between relative h-full items-center rounded-lg border-2 border-[#072320]`}
                    key={index}
                >
                    <div
                        className='flex justify-center items-center bg-[#00A762] cursor-pointer p-4 rounded-lg mt-3 mb-2 mx-6 relative'
                        onClick={() => handleDetailsRow(item?.id)}
                    >
                        <div className='overflow-hidden rounded-lg h-[200px] relative image-container'>
                            <img
                                src={BASE_IMAGE_URL + item?.additional_images[0]}
                                alt="image"
                                className="zoom-image w-full h-full object-cover rounded-lg hover:scale-110 transition-all duration-500 cursor-pointer"
                            />
                        </div>
                        {item?.offer && (
                            <div className='text-white font-dm flex justify-center items-center uppercase w-14 absolute h-14 border-2 border-[#072320] rounded-full top-4 right-4'>
                                {item?.offer}
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col justify-center items-center px-4'>
                        <h2
                            className="text-[#00A762] text-center cursor-pointer font-dm text-lg capitalize font-medium"
                            onClick={() => handleDetailsRow(item?.id)}
                        >
                            {item?.name}
                        </h2>
                        <div className='pb-2'>
                            <Paragraph title={item?.short_description} shortDescription='true' />
                        </div>
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
                    <div className='flex justify-center items-center px-2 py-2 gap-2'>
                        <div
                            className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'
                            onClick={() => handleAddWishlist(item?.id)}
                        >
                            <FaRegHeart className='text-white text-[22px]' />
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
            ))}
        </div>
    );
};

export default ProductCard;
