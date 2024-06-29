import { IoMdSearch } from "react-icons/io";
import React, { useState, useEffect, useRef } from 'react';
import { RxCross2 } from "react-icons/rx";
import { Btnone } from "../../button";

import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import productcard from "../../../../../data/productcard";
import { Paragraph } from "../../title";


function NavSearchIcon() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const searchInputRef = useRef(null);


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
                        <div className="fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50"
                            onClick={toggleSearch}
                        />

                        <div className="fixed left-1/2 search_zindex md:w-[700px] w-11/12 lg:mt-[180px] md:mt-[120px] mt-[150px]
                        transform -translate-x-1/2  z-50 bg-white 
                        p-8 rounded-lg">



                            <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                                <h2 className={`font-dm text-2xl capitalize  font-medium  text-left  text-[#072320]`} >What Are You Looking For?</h2>

                                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#072320] cursor-pointer " onClick={toggleSearch}>
                                    <RxCross2 className='text-xl cursor-pointer text-white' />
                                </div>
                            </div>

                            <div className="md:py-10 py-4">
                                <input
                                    ref={searchInputRef}
                                    className='input_box w-full '
                                    type="text"
                                    id="username"
                                    placeholder='Start typing...'
                                />
                            </div>

                            <div className="md:max-h-[250px] max-h-[158px] overflow-y-auto ">
                                {productcard.map((item, index) => (
                                    <div className="py-2 px-2 flex relative h-full items-center rounded-lg shadow-md"
                                        key={index} >


                                        <div key={index} className="flex items-center w-[150px]  justify-content rounded-md bg-[#00a762b0] sm:block hidden">
                                            <img
                                                src={item.image}
                                                alt='product_img'
                                                className="w-full h-full"
                                            />
                                        </div>



                                        <div class="flex justify-center flex-col sm:ml-3 ml-0">
                                            <h2 class="text-[#00A762] md:text-left text-center
                                                 font-dm text-lg capitalize font-medium
                                                 ">{item.title}</h2>

                                            <Paragraph title={item.subtitle} textAlign='left' />

                                            <h2 class="text-[#00A762] md:text-left text-center
                                                     font-dm text-lg capitalize font-medium
                                                      ">${item.price}</h2>
                                        </div>

                                        <div className="absolute inset-0 flex items-center right-0 top-0 left-0 bottom-0
                                          justify-center rounded-lg opacity-0 bg-[#00000040] hover:opacity-100 transition-opacity duration-300">
                                            <div className="text-white text-center flex justify-center items-center gap-2">
                                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer '>
                                                    <FaRegHeart className='text-white text-[22px]' />
                                                </div>
                                                <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                                                    <HiOutlineShoppingBag className='text-white text-[22px]' />
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                ))
                                }


                            </div>

                            <div className="flex justify-center mt-4">
                                <Btnone title="view all result"
                                    bgColor="#072320" />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default NavSearchIcon;
