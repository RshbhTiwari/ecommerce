import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../basic/title';

const ProductsortpillsCard = ({ allProducts }) => {

    const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
    };
    console.log("allProducts", allProducts)
    return (

        <div className=" ">

            {allProducts.map((item, index) => (
                <div className={`grid grid-cols-12 gap-4 mb-2 py-2 px-2 flex relative h-full items-center rounded-lg shadow-md
                     ${index % 2 === 0 ? '' : 'bg-gray-200 '}`} key={index} onClick={() => {
                        handleDetailsRow(item.id);
                    }}>


                    <div key={index} className="lg:col-span-3 sm:col-span-4  col-span-12
                        flex items-center h-[150px] w-full justify-content rounded-md bg-[#00A762] p-3
                    sm:block hidden">

                        {item.additional_images && item.additional_images.length > 0 ? (
                            <img
                                src={BASE_IMAGE_URL + item.additional_images[0]}
                                alt='product_img'
                                className="w-full h-full object-cover rounded-md"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 rounded-md">

                            </div>
                        )}
                    </div>



                    <div className="col-span-12 sm:col-span-8 lg:col-span-9   flex justify-center flex-col">
                        <h2 className="text-[#00A762] text-left
                         font-dm text-lg capitalize font-medium
                        ">{item.name}</h2>
                        <Paragraph title={item.short_description} shortDescription='true' textAlign='onyleft' />

                        {item?.discount_price ? (
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

    );
};

export default ProductsortpillsCard;