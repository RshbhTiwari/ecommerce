
import './navbar.css';
import comLogo from '../../../../assets/header/tastydaily-0556409248.webp';
import imgSrcDelivery from '../../../../assets/header/time.png';
import { NavCartIcon, NavUserIcon, NavSearchIcon } from "./onclickopen";
import { Link, useNavigate } from 'react-router-dom';

export default function TopHeader({ cartData, itemCount }) {

    const navigate = useNavigate();

    const scrollToClick = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return (
        <>
            <div className="bg-[#00A762]">
                <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8 py-2">

                    <div className="relative flex items-center justify-between nav_box">

                        <div className='flex items-center delivery_content nav_width_box'>
                            <div className='h-[25px] w-fit'>
                                <img
                                    className="h-full w-auto"
                                    src={imgSrcDelivery}
                                    alt="logo"
                                />
                            </div>
                            <h6 className='text-white font-dm text-sm  ml-2 capitalize'>Delivery on Next Day from 10:00 AM to 08:00 PM</h6>
                        </div>

                   
                            <div className='flex items-center h-[40px] company_logo cursor-pointer' onClick={() => scrollToClick('/')}>
                                <img
                                    className="h-full w-auto"
                                    src={comLogo}
                                    alt="logo"
                                />
                            </div>
                       

                        
                        <div className='flex items-center justify-end nav_width_box'>
                            <NavSearchIcon />
                            <hr className='text-white rotate-90 border-[1.5px] w-5' />
                            <NavUserIcon />
                            <hr className='text-white rotate-90 border-[1.5px] w-5' />
                            <NavCartIcon cartData={cartData} itemCount={itemCount} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

