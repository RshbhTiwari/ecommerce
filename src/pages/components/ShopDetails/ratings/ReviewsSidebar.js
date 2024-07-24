
import { MdKeyboardArrowRight } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { BiSolidLike } from "react-icons/bi";
import { Paragraph } from "../../basic/title";


const ReviewsSidebar = ({ title }) => {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);

        //  body scroll lock
        if (!sidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    };

    return (

        <>
            <div className="p-3 bg-gray-100 rounded-md mt-4 flex items-center sm:justify-start justify-center cursor-pointer" onClick={toggleSidebar}>
                <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#00A762]`} >VIEW ALL REVIEWS </h2>
                <MdKeyboardArrowRight className="text-3xl text-[#00A762]" />
            </div>

            {sidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className='fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50'
                        onClick={toggleSidebar}
                    />

                    {/* Sidebar */}
                    <div
                        className={`fixed top-0 right-0 z-50 h-full md:w-[600px] w-full bg-white shadow-lg transition-transform duration-300 ease-in-out transform
                               ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <div className='p-4'>

                            <div className="p-3 bg-gray-100 rounded-md mt-4 flex items-center justify-between cursor-pointer" >
                                <h2 className={`font-dm text-lg capitalize  font-medium  text-left  text-[#00A762]`} >{title}</h2>
                                <div className="flex items-center justify-center h-8 w-8 rounded-md bg-[#00A762] cursor-pointer " onClick={toggleSidebar}>
                                    <RxCross2 className='text-xl cursor-pointer text-white' />
                                </div>
                            </div>


                            <div className="max-h-[600px] overflow-y-auto mt-4">

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
                               
                            </div>

                        </div>
                    </div>
                </>
            )}

        </>
    );
};

export default ReviewsSidebar;
