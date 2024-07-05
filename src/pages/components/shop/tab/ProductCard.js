import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../basic/title';



const ProductCard = ({ allProducts }) => {
    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';
    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
    };


    return (

        <div className="grid grid-cols-12 gap-4">
            {allProducts.map((item, index) => (
                <div className='md:col-span-12 sm:col-span-6 lg:col-span-4  col-span-12 flex flex-col justify-center relative h-full items-center rounded-lg 
                  border-2 border-[#072320]'
                    key={index} onClick={() => {
                        handleDetailsRow(item.id);
                    }} >

                    <div className='flex justify-center items-center bg-[#00A762] rounded-lg mb-2 mx-4 my-4 relative'>
                        <div className='w-3/4 overflow-hidden'>
                            <img
                            src={BASE_IMAGE_URL + item?.image}
                                // src={BASE_IMAGE_URL + item?.additional_images[0]}
                                alt="image"
                                className="responsive_image_card overflow-hidden hover:scale-110 transition-all duration-500 cursor-pointer"
                            />
                        </div>
                        {item.offer ? (
                            <div className='text-white font-dm flex justify-center items-center uppercase w-14 absolute
                         h-14 border-2 border-[#072320] rounded-full top-4 right-4'>
                                {item.offer}
                            </div>) : null}

                    </div>

                    <div className='flex flex-col justify-center items-center px-4 '>


                        <h2 className="text-[#00A762] text-center 
                                  font-dm text-lg capitalize font-medium 
                                   ">{item.name}</h2>

                        <div className='pb-2'>
                            <Paragraph title={item.description} />
                        </div>


                        {item.discount_price ? (
                            <>
                                <div className="flex items-center gap-2 text-[#00A762] text-center font-dm text-lg capitalize font-medium pb-2">
                                    <span className="block text-xs line-through">₹{item?.price}</span>
                                    <span className="block">₹{item?.discount_price}</span>

                                </div>
                            </>
                        ) : (
                            <h2 className="text-[#00A762] font-dm text-lg capitalize font-medium pb-2">
                                ₹{item?.price}
                            </h2>
                        )}

                    </div>
                    <div className='flex justify-center items-center px-2 py-2 gap-2'>

                        <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                            <FaRegHeart className='text-white text-[22px]' />
                        </div>

                        <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                            <HiOutlineShoppingBag className='text-white text-[22px]' />
                        </div>

                    </div>
                </div>
            ))
            }


        </div>

    );
};

export default ProductCard;