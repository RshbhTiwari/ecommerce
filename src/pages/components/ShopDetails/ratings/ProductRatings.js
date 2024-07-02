import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { HeadingTitle, Paragraph } from "../../basic/title";
import ReviewsSidebar from './ReviewsSidebar';
import SubmitReviewsfrom from './SubmitReviewsfrom';
import { useState } from 'react';
import { RxCross2 } from "react-icons/rx";

const ProductRatings = ({ title }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };
    return (

        <div className="border-[2px] mt-8 w-full border-[#00A762] py-5 px-5  rounded-md shadow-md mx-auto">

            <div className="flex sm:flex-row flex-col gap-3 items-center justify-between border-b-2 pb-2 border-[#00A762]">
                <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#00A762]`} >Product Ratings & Reviews</h2>

                <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#00A762] cursor-pointer`}
                    onClick={toggleSection}>Submit your Reviews</h2>
            </div>

            {isOpen && (
                <div className="p-6 bg-gray-100 rounded-md mt-4 ">

                    <div className="pb-2 border-b-2 border-b-[#00A762] flex items-center justify-between cursor-pointer" >
                        <h2 className={`font-dm text-xl capitalize  font-medium  text-left  text-[#00A762]`} >Reviews</h2>
                        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#00A762] cursor-pointer"
                            onClick={toggleSection}>
                            <RxCross2 className='text-xl cursor-pointer text-white' />
                        </div>
                    </div>

                    <div className='mt-6'>
                        <SubmitReviewsfrom />
                    </div>

                </div>
            )}

            <div>

            </div>

            <div className="p-3 bg-gray-100 rounded-md mt-4 ">
                <h2 className={`font-dm text-lg capitalize  font-medium  sm:text-left text-center  text-[#072320]`} >Top review from India</h2>
            </div>

            <div className="p-3 bg-gray-100 rounded-md mt-4 ">
                <div className="my-4 flex flex-col space-y-3">
                    <div className="flex space-x-2  items-center">
                        <FaUserCircle className="text-3xl text-[#00A762]" />
                        <h2 className="text-[#00A762] text-center 
                 font-dm text-lg capitalize font-medium
                 ">rishabh tiwari</h2>
                    </div>

                    <div className="flex space-x-2  items-center justify-left ">
                        <div className="bg-[#FF9F00] text-white px-3 rounded-lg py-1 font-dm flex items-center justify-center w-fit">
                            4.0 <IoMdStar className='text-white text-lg ml-1' />
                        </div>
                        <p className='text-sm font-dm'>Posted on : 24 June 2024</p>
                    </div>

                    <div className="flex items-center justify-left ">
                        <Paragraph title='Colour different blue colour Aya hai grey ki jagah' textAlign='onyleft' />
                    </div>

                    <div className="flex space-x-2  items-center">
                        <BiSolidLike className="text-xl text-[#00A762]" />
                        <p className='text-sm font-dm'>Helpful (0)</p>
                    </div>

                </div>
            </div>

            <ReviewsSidebar title={title} />



        </div>
    );
};

export default ProductRatings;
