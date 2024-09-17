import React, { useState, useEffect, useRef } from 'react';
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Paragraph } from "../../title";
import { getproduct, getProducts } from "../../../../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { NoProducts } from '../../ErrorPages';
import { useNavigate } from "react-router-dom";
import { addCartItems, getAllCartItems } from '../../../../../redux/slices/addToCart';
import { toast } from 'react-toastify';
import { postWishlistUser } from '../../../../../redux/slices/wishlist';

function NavSearchIcon() {

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const searchInputRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [allProductsData, setAllProductsData] = useState([]);

    const cart_id = localStorage?.getItem('cart_id') || null;
    const customer_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
    const token = localStorage?.getItem('accessToken') || null;

    const [localCartItems, setLocalCartItems] = useState([]);
    const { allCartItems, isLoading: cartIsLoading, error: cartErorr } = useSelector(
        (state) => state.addToCart
    );

    const { isLoading: productIsLoading, error: productError, products } = useSelector(
        (state) => state.product
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
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        if (products?.length) {
            setAllProductsData(products);
        }
    }, [products]);

    useEffect(() => {
        if (isSearchOpen) {
            document.body.style.overflow = 'hidden';
            if (searchInputRef.current) {
                searchInputRef.current.focus();
            }
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isSearchOpen]);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    const filteredProducts = allProductsData.filter(item =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const handleInputChange = (event) => {
        setFilterName(event.target.value);
    };

    const productsToDisplay = filteredProducts.slice(0, 3);

    const handleRow = (filterName) => {
        navigate(`/search?filter=${encodeURIComponent(filterName)}`);
        setIsSearchOpen(false);
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
        setIsSearchOpen(false);
    };

    const handleAddWishlist = (product_id) => {
        const accessToken = localStorage.getItem('accessToken') || null;
        if (accessToken) {
            const user_id = JSON?.parse(localStorage?.getItem('user'))?.id || null;
            const payload = {
                product_id: product_id,
                ...(user_id && { user_id })
            };
            setIsSearchOpen(false);
            dispatch(postWishlistUser(payload, toast, navigate));
        } else {
            navigate('/login')
            setIsSearchOpen(false);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            toast.error("You need to log in to add to wishlist");
        }
    };


    return (
        <>
            <div className="relative">
                {/* Search icon section */}
                <div className="flex items-center cursor-pointer" onClick={toggleSearch}>
                    <IoMdSearch className="text-white text-[24px]" />
                    <h6 className="text-white font-dm text-sm ml-2 capitalize">search</h6>
                </div>

                {/* Search input section */}
                {isSearchOpen && (
                    <>
                        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50" onClick={toggleSearch} />
                        <div
                            className="fixed left-1/2 search_zindex md:w-[700px] w-11/12 lg:mt-[180px] md:mt-[120px]
                                 mt-[150px] transform -translate-x-1/2 z-50 ">

                            <div className='bg-white p-8 rounded-lg' data-aos="zoom-in" >
                                <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                                    <h2 className="font-dm text-2xl capitalize font-medium text-left text-[#072320]">What Are You Looking For?</h2>
                                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer" onClick={toggleSearch}>
                                        <RxCross2 className='text-xl cursor-pointer text-white' />
                                    </div>
                                </div>

                                <div className="md:py-6 py-4">
                                    <input
                                        ref={searchInputRef}
                                        className='input_box w-full'
                                        type="text"
                                        id="username"
                                        placeholder='Start typing...'
                                        value={filterName}
                                        onChange={handleInputChange}
                                    />
                                </div>


                                {filterName && filteredProducts.length === 0 ? (
                                    <div className="flex justify-center ">
                                        <NoProducts massage="Sorry, no products found!" height='200px' />
                                    </div>
                                ) : (
                                    <>
                                        {filterName && filteredProducts.length > 0 && (
                                            <>
                                                <div className="grid grid-cols-12 gap-4">
                                                    {/* PRODUCT VIEW BOX */}
                                                    {productsToDisplay.map((item, index) => (
                                                        <div className='xl:col-span-4 md:col-span-6 col-span-12 relative 
                                                    rounded-lg border-2 border-[#072320] shadow-md p-2' key={index}>

                                                            <div className="flex items-center h-[150px] w-full justify-content rounded-md bg-[#00A762] p-3 image-container">
                                                                {item.additional_images && item.additional_images.length > 0 ? (
                                                                    <img
                                                                        src={BASE_IMAGE_URL + item.additional_images[0]}
                                                                        alt='product_img zoom-image'
                                                                        className="w-full h-full object-cover rounded-md"
                                                                    />
                                                                ) : (
                                                                    <div className="w-full h-full bg-gray-200 rounded-md" />
                                                                )}
                                                            </div>

                                                            <h2 className="text-[#00A762] mt-2 text-center font-dm text-lg capitalize font-medium">{item.name}</h2>

                                                            <div className='my-2'><Paragraph title={item.short_description} shortDescription='true' lineclamp="2" /> </div>

                                                            <div className='flex w-full text-center justify-center'>
                                                                {item?.discount_price ? (
                                                                    <>
                                                                        <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                                                                            <span className="block text-xs line-through">₹{item?.price}</span>
                                                                            <span className="block">₹{item?.discount_price}</span>
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">₹{item?.price}</h2>
                                                                )}
                                                            </div>

                                                            <div className="absolute inset-0 flex items-center right-0 top-0 left-0 bottom-0 justify-center rounded-lg opacity-0 bg-[#00000040] hover:opacity-100 transition-opacity duration-300">
                                                                <div className="text-white text-center flex justify-center items-center gap-2">
                                                                    <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer' onClick={() => {
                                                                        handleAddWishlist(item?.id);
                                                                    }}>
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
                                                        </div>




                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                )}

                                {filterName && filteredProducts.length > 3 && (
                                    <div className="flex justify-center mt-4">
                                        <button className={`text-white rounded-lg shadow-md font-dm px-3 py-2 
                                    capitalize nowarp bg-[#072320]`} onClick={() => {
                                                handleRow(filterName);
                                            }} >
                                            view all result
                                        </button>
                                    </div>
                                )}
                            </div>

                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default NavSearchIcon;