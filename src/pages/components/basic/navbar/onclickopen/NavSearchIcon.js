import React, { useState, useEffect, useRef } from 'react';
import { IoMdSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Btnone } from "../../button";
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Paragraph } from "../../title";
import { getproduct } from "../../../../../redux/slices/product";
import { useDispatch, useSelector } from "react-redux";
import { NoProducts } from '../../ErrorPages';

function NavSearchIcon() {

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const searchInputRef = useRef(null);

    const dispatch = useDispatch();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [filterName, setFilterName] = useState('');
    const [allProductsData, setAllProductsData] = useState([]);

    const { isLoading: productIsLoading, error: productError, products } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getproduct());
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

    // Filter products based on input value
    const filteredProducts = allProductsData.filter(item =>
        item.name.toLowerCase().includes(filterName.toLowerCase())
    );

    const handleInputChange = (event) => {
        setFilterName(event.target.value);
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

                        <div className="fixed left-1/2 search_zindex md:w-[700px] w-11/12 lg:mt-[180px] md:mt-[120px] mt-[150px] transform -translate-x-1/2  z-50 bg-white p-8 rounded-lg">

                            <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                                <h2 className="font-dm text-2xl capitalize font-medium text-left text-[#072320]">What Are You Looking For?</h2>
                                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer" onClick={toggleSearch}>
                                    <RxCross2 className='text-xl cursor-pointer text-white' />
                                </div>
                            </div>

                            <div className="md:py-10 py-4">
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
                                <div className="flex justify-center md:max-h-[250px] max-h-[158px]">
                                    <NoProducts massage="Sorry, no products found!" height='200px' />
                                </div>
                            ) : (
                                <div className="md:max-h-[250px] max-h-[158px] overflow-y-auto">
                                    {filterName && filteredProducts.length > 0 && (
                                        <>
                                            {/* PRODUCT VIEW BOX */}
                                            {filteredProducts.map((item, index) => (
                                                <a key={index} href={`/shop/${item?.id}`}>
                                                    <div className={`grid grid-cols-12 gap-4 mb-2 py-2 px-2 flex relative h-full items-center rounded-lg shadow-md ${index % 2 === 0 ? '' : 'bg-gray-200'}`}>

                                                        <div className="lg:col-span-3 sm:col-span-4 col-span-12 flex items-center h-[150px] w-full justify-content rounded-md bg-[#00A762] p-3 sm:block hidden">
                                                            {item.additional_images && item.additional_images.length > 0 ? (
                                                                <img
                                                                    src={BASE_IMAGE_URL + item.additional_images[0]}
                                                                    alt='product_img'
                                                                    className="w-full h-full object-cover rounded-md"
                                                                />
                                                            ) : (
                                                                <div className="w-full h-full bg-gray-200 rounded-md" />
                                                            )}
                                                        </div>

                                                        <div className="col-span-12 sm:col-span-8 lg:col-span-9 flex justify-center flex-col">
                                                            <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">{item.name}</h2>
                                                            <Paragraph title={item.short_description} textAlign='onyleft' />
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
                                                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                                                                    <FaRegHeart className='text-white text-[22px]' />
                                                                </div>
                                                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                                                                    <HiOutlineShoppingBag className='text-white text-[22px]' />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </>
                                    )}
                                </div>
                            )}

                            {filterName && filteredProducts.length > 0 && (
                                <div className="flex justify-center mt-4">
                                    <button className={`text-white rounded-lg shadow-md font-dm px-3 py-2 
                                    capitalize nowarp bg-[#072320]`}>
                                        view all result
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default NavSearchIcon;