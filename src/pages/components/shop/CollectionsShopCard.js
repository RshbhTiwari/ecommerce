import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paragraph } from "../basic/title";
import { Btnone } from '../basic/button';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addCartItems } from '../../../redux/slices/addToCart';
import { getWishlist, postWishlistUser } from '../../../redux/slices/wishlist';

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

const settings = {
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const CollectionsShopCard = ({ allproducts, wishlist, localCartItems }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [allProductsData, setAllProductsData] = useState([]);

    useEffect(() => {
        if (allproducts?.length) {
            setAllProductsData(allproducts);
        }
    }, [allproducts]);


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
            dispatch(postWishlistUser(payload, toast));
        } else {
            navigate('/login')
            toast.error("You need to log in to add to wishlist");
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const isItemInwishlist = (itemId) => {
        return wishlist?.some((wishlistItem) => wishlistItem.product_id === itemId);
    };

    const isItemInCart = (itemId) => {
        return localCartItems?.some((cartItem) => cartItem.item_id === itemId);
    };


    return (
        <Slider {...settings} className=''>
            {allProductsData.map((item, index) => (
                <div className='group relative h-full' key={index}
                >
                    <div className='group
                          flex flex-col justify-center relative h-full items-center rounded-br-lg rounded-tl-lg
                            border-2  border-[#072320]'
                    >

                        <div className='flex justify-center items-center cursor-pointer bg-[#00A762]
                         rounded-br-lg rounded-tl-lg m-4 p-4 relative w-full' onClick={() => {
                                handleDetailsRow(item?.id);
                            }} >

                            <div className='relative overflow-hidden h-[200px] w-full rounded-br-lg rounded-tl-lg image-container'>
                                <img
                                    src={BASE_IMAGE_URL + item?.additional_images[0]}
                                    alt="Product"
                                    className="block w-full h-full transition-all duration-300 ease-in-out h-auto group-hover:opacity-0 zoom-image"
                                />

                                <img
                                    src={BASE_IMAGE_URL + item?.additional_images[0]}
                                    alt="Product on hover"
                                    className="block w-full h-full opacity-0 absolute top-0 left-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                                />
                            </div>

                            <div className='show_box flex justify-evenly items-center absolute h-10 w-10 mx-auto rounded-full'>
                                <button
                                    onClick={() => handleAddWishlist(item?.id)}
                                    disabled={isItemInwishlist(item?.id)}
                                    className={`flex items-center justify-center h-10 w-10 rounded-full
                                         ${isItemInwishlist(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}`}
                                >
                                    <FaRegHeart className='text-white text-[20px]' />
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-col justify-center items-center mt-2 mb-4">
                            <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium cursor-pointer" onClick={() => {
                                handleDetailsRow(item?.id);
                            }}>{item?.name}</h2>
                            <div>
                                <Paragraph title={item?.short_description} shortDescription='true' lineclamp='3' />
                            </div>

                            <div className='mt-2'>
                                <button
                                    onClick={() => handleAddToCart(item?.id)}
                                    disabled={isItemInCart(item?.id)}
                                    className={`text-white rounded-lg 
                                    ${isItemInCart(item?.id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#072320] cursor-pointer'}
                                    shadow-md font-dm px-3 py-2 capitalize whitespace-nowrap flex items-center justify-center`}
                                >
                                    add to cart
                                </button>
                            </div>


                        </div>

                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default CollectionsShopCard;
