import { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { Btnone, Btnoutline } from "../../button";
import { Paragraph } from "../../title";
import ShoppingCartTable from "../../../ShoppingCart/ShoppingCartTable";
import CartEmpty from "../../ErrorPages/cartempty";
import { useNavigate } from "react-router-dom";

function NavCartIcon({cartData, itemCount}) {
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const toggleCart = () => {
        if (isCartOpen) {
            setIsClosing(true);
            setTimeout(() => {
                setIsCartOpen(false);
                setIsClosing(false);
                // document.body.style.overflow = 'unset';
            }, 300);
        } else {
            setIsCartOpen(true);
            // document.body.style.overflow = 'hidden';
        }
    };

    const handleClickCheckout = () => {
        navigate(`/checkout`);
        setIsCartOpen(false);
        // window.location.reload();
    };

    const handleClickCart = () => {
        navigate(`/cart`);
        setIsCartOpen(false);
        // window.location.reload();
    };

    return (
        <>
            <div className='flex items-center  cursor-pointer' onClick={toggleCart}>
                <div className='flex items-center relative' >
                    <HiOutlineShoppingBag className='text-white text-[24px]' />
            
                    <div className='rounded-full right-[-7px] top-[-7px] h-[20px] w-[20px] 
                                        flex items-center justify-center text-[13px] text-white bg-[#072320] absolute'>
                       {itemCount}
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

                            {cartData?.length > 0 ? (
                                <>
                                    <div className='mt-2'>
                                        <Paragraph title={`You have ${itemCount} items in your cart`} textAlign='left' />
                                    </div>
                                    <div className="overflow-x-auto mt-6">
                                        <ShoppingCartTable shoppingcart={cartData}  itemCount={itemCount} minicart="true" />
                                    </div>
                                </>

                            ) : (
                                <CartEmpty height="150px" />
                            )}

                            <div className='flex flex-col fixed bottom-[17px] w-[92%]'>
                                <div className='w-full mt-4'>
                                    <Btnone title="checkout"
                                        bgColor="#072320" borderColor="#00A762" width="100%" handleClick={handleClickCheckout} />
                                </div>

                                <div className='w-full mt-4'>
                                    <Btnoutline title="edit cart" width="100%"  handleClick={handleClickCart}/>
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
