


import { useEffect, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import productcard from "../../../../../data/productcard";
import { Btnone, Btnoutline } from "../../button";
import { Paragraph } from "../../title";

function NavCartIcon() {


    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const toggleCart = () => {
        if (isCartOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsCartOpen(false);
                setIsClosing(false);
                document.body.style.overflow = 'unset';
            }, 300);
        } else {
            setIsCartOpen(true);
            document.body.style.overflow = 'hidden';
        }
    };


    return (
        <>
            <div className='flex items-center  cursor-pointer' onClick={toggleCart}>
                <div className='flex items-center relative' >
                    <HiOutlineShoppingBag className='text-white text-[24px]' />
            
                    <div className='rounded-full right-[-7px] top-[-7px] h-[20px] w-[20px] 
                                        flex items-center justify-center text-[13px] text-white bg-[#072320] absolute'>
                        0
                    </div>
                </div>
                <h6 className='text-white font-dm text-sm ml-2 capitalize'>cart</h6>
            </div>

            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed top-0 left-0 z-40 w-full h-full bg-black opacity-50`}
                        onClick={toggleCart}
                    />

                    {/* Sidebar */}
                    <div
                        className={`fixed top-0 right-0 z-50 h-full md:w-[420px] w-full bg-white shadow-lg transition-all duration-300 ease-in-out
                             ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
                    >
                        <div className='p-4'>

                            <div className="flex items-center justify-between border-b-2 pb-2 border-[#072320]">
                                <h2 className={`font-dm text-2xl capitalize font-medium text-left text-[#072320]`} >cart</h2>
                                <div className="flex items-center justify-center h-10 w-10 rounded-md bg-[#072320] cursor-pointer " onClick={toggleCart}>
                                    <RxCross2 className='text-2xl cursor-pointer text-white' />
                                </div>
                            </div>

                            <div className='mt-2'>
                                <Paragraph title="You have 3 items in your cart" textAlign='onyleft' />
                            </div>

                            {/* table vertically scroll */}
                            <div className="mt-4 max-h-[450px] overflow-y-auto">
                                <table className="w-full">
                                    <tbody>
                                        {productcard.slice(0, 2).map((item, index) => (
                                            <tr className="flex shadow-md rounded-lg justify-between relative my-4" key={index}>

                                                <div className="flex items-center justify-center cursor-pointer h-8 w-8 rounded-md absolute right-[10px] top-[20px] p-2 bg-[#00000054]">
                                                    <RxCross2 className='text-2xl text-[#072320]' />
                                                </div>

                                                <td className="flex items-center py-4 px-4 gap-4">
                                                    <div className='rounded-md w-24 h-24 bg-[#00a762b0] sm:block hidden'>
                                                        <img
                                                            src={item.image}
                                                            alt='product_img'
                                                            className='h-full w-full'
                                                        />
                                                    </div>

                                                    <div className="flex justify-center flex-col">
                                                        <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                                            {item.title}
                                                        </h2>

                                                        <Paragraph title={`1*${item.categorie}`} textAlign='onyleft' />

                                                        <h2 className="text-[#00A762] text-left font-dm text-lg capitalize font-medium">
                                                            20.00
                                                        </h2>
                                                    </div>


                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className='flex flex-col fixed bottom-[17px] w-[92%]'>
                                <div className='w-full mt-4'>
                                    <Btnone title="checkout"
                                        bgColor="#072320" borderColor="#00A762" width="100%" />
                                </div>

                                <div className='w-full mt-4'>
                                    <Btnoutline title="edit cart" width="100%" />
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

export default NavCartIcon;
