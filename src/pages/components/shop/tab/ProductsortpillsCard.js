import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { Paragraph } from '../../basic/title';

const ProductsortpillsCard = ({ allProducts }) => {

    const navigate = useNavigate();

    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
    };

    return (

        <div className=" ">

            {allProducts.map((item, index) => (
                <div className="grid grid-cols-12 gap-4 mb-2 py-2 px-2 flex relative h-full items-center rounded-lg shadow-md
                  "  key={index} onClick={() => {
                        handleDetailsRow(item.id);
                    }}>


                    <div key={index} className="lg:col-span-3 sm:col-span-4  col-span-12
                        flex items-center h-[150px] w-full justify-content rounded-md bg-[#00a762b0] 
                    sm:block hidden">
                        <img
                            src={item.image}
                            alt='product_img'
                            className="w-full h-full"
                        />
                    </div>



                    <div className="col-span-12 sm:col-span-8 lg:col-span-9   flex justify-center flex-col">
                        <h2 className="text-[#00A762] text-left
                         font-dm text-lg capitalize font-medium
                        ">{item.title}</h2>

                        <Paragraph title={item.subtitle} textAlign='onyleft' />

                        <h2 className="text-[#00A762] text-left
                         font-dm text-lg capitalize font-medium
                         ">${item.price}</h2>
                    </div>


                    <div className="absolute inset-0 flex items-center right-0 top-0 left-0 bottom-0
                        justify-center rounded-lg opacity-0 bg-[#00000040] hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center flex justify-center items-center gap-2">
                            <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer '>
                                <FaRegHeart className='text-white text-[22px]' />
                            </div>
                            {/* <div className='flex justify-center w-10 h-10 rounded-lg items-center bg-[#072320] cursor-pointer'>
                                <h6 className='text-white text-[27px] mt-[-7px] flex justify-center  items-center'>+</h6>
                            </div> */}
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