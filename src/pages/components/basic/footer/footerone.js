import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiSkypeFill } from "react-icons/ri";
import { FaSquareTwitter } from "react-icons/fa6";
import './footer.css';
import comLogo from '../../../../assets/header/tastydaily-0556409248.webp';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllCategories } from "../../../../redux/slices/category";

export default function Footerone() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem('accessToken') || null;

    const [loading, setLoading] = useState(true);
    const [allCategoriesData, setAllCategoriesData] = useState([]);

    const { isLoading: categoryIsLoading, error: categoryError, categories } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const scrollToClick = (path) => {
        navigate(path);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const linkToShare = 'https://yourwebsite.com';
    
    const shareOnFacebook = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`, '_blank');
    };

    const shareOnTwitter = () => {
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(linkToShare)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(linkToShare)}`, '_blank');
    };


    return (
        <>
            <div className="bg-[#072320]">
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">

                    <div className="grid grid-cols-12 md:gap-4 gap-0">
                        <div className='lg:col-span-4 col-span-12  flex flex-col justify-end items-start'>
                            <h6 className="text-white font-dm text-lg mb-2 capitalize text-center width_change w-3/4">Newsletter Signup</h6>
                            <div className="relative w-3/4 width_change">
                                <input type="text"
                                    className="block w-full py-2 px-3 bg-[#00a76282] text-white font-dm   focus:outline-none capitalize" placeholder="enter your email" />
                                <div className="absolute inset-y-0 right-0 flex items-center bg-[#00A762]">
                                    <button type="submit" className="text-white px-4 py-2 capitalize font-dm ">
                                        subscribe
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='lg:col-span-4 col-span-12  flex-col flex items-center justify-center'>


                            <div className='flex items-center h-[40px] mb-2 cursor-pointer'
                                onClick={() => scrollToClick('/')}>
                                <img
                                    className="h-full w-auto"
                                    src={comLogo}
                                    alt="logo"
                                />
                            </div>

                            <p className="text-white text-center font-dm  text-base font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eius od tempor incididunt ut labore et dolore magna.</p>
                        </div>

                        <div className='lg:col-span-4 col-span-12 flex flex-col justify-end items-end'>
                            <h6 className="text-white font-dm text-lg mb-2 capitalize text-center width_change w-3/4">Get in Touch With Us</h6>
                            <div className="flex justify-center items-center w-3/4 width_change	 bg-[#00a76282] gap-2 py-2 px-3">

                                <FaFacebookF className="text-[25px] text-[#00a762] cursor-pointer"  onClick={shareOnFacebook}/>
                                <FaSquareTwitter className="text-[25px] text-[#00a762] cursor-pointer" onClick={shareOnTwitter}/>
                                <FaWhatsapp className="text-[25px] text-[#00a762] cursor-pointer"    onClick={shareOnWhatsApp}/>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="bg-[#00A762]">
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">

                    <div className="grid grid-cols-12 md:gap-4 gap-0">



                        <div className='md:col-span-3  col-span-12 flex flex-col md:justify-start md:items-start justify-center items-center'>
                            <h6 className="text-[#072320] text-lg  font-dm  mb-3 capitalize  font-medium">Help</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col md:justify-start md:items-start justify-center items-center'>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">How to Make an Order?</p>
                                <p className="text-white font-dm text-sm  mb-1 capitalize font-light">About Us</p>
                                {accessToken ? (
                                    <p className="text-white font-dm text-sm mb-1 capitalize font-light cursor-pointer"
                                        onClick={() => scrollToClick('/my-account/orders')}>My Orders</p>) : null}
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">Delivery Terms</p>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">Return</p>
                            </div>

                        </div>

                        <div className='md:col-span-3 col-span-12  flex flex-col 
                       md:justify-start md:items-start justify-center items-center'>
                            <h6 className="text-[#072320] text-lg  font-dm mb-3 capitalize font-medium">Quick Links</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col 
                                 md:justify-start md:items-start justify-center items-center'>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">Instagram</p>
                                <p className="text-white font-dm text-sm  mb-1 capitalize font-light">Facebook</p>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">Pinterest</p>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">Twitter</p>
                                <p className="text-white font-dm text-sm mb-1 capitalize font-light">YouTube</p>
                            </div>

                        </div>

                        <div className='md:col-span-3  col-span-12  flex flex-col 
                        md:justify-start md:items-start justify-center items-center'>
                            <h6 className="text-[#072320] text-lg  font-dm  mb-3 capitalize font-medium">Shop</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col    md:justify-start md:items-start justify-center items-center'>

                                <p className="text-white font-dm text-sm mb-1 capitalize font-light cursor-pointer"
                                    onClick={() => scrollToClick('/shop')}>
                                    Products</p>

                                <p className="text-white font-dm text-sm  mb-1 capitalize font-light cursor-pointer"
                                    onClick={() => scrollToClick('/cart')}>
                                    Cart</p>

                                {accessToken ? (
                                    <>
                                        <p className="text-white font-dm text-sm mb-1 capitalize font-light cursor-pointer"
                                            onClick={() => scrollToClick('/my-account/wishlist')}>
                                            Wishlist</p>


                                        <p className="text-white font-dm text-sm mb-1 capitalize font-light cursor-pointer"
                                            onClick={() => scrollToClick('/my-account')}>
                                            My Account</p>
                                    </>

                                ) : null}

                                <p className="text-white font-dm text-sm mb-1 capitalize font-light cursor-pointer"
                                    onClick={() => scrollToClick('/contact')}>
                                    Contacts</p>
                            </div>
                        </div>

                        <div className='md:col-span-3 col-span-12 flex flex-col md:justify-start md:items-start justify-center items-center'>
                            <h6 className="text-[#072320] text-lg  font-dm mb-3 capitalize font-medium">Categories</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col md:justify-start md:items-start justify-center items-center'>

                                {categoryIsLoading || loading ? (
                                    <> {allCategoriesData.map((_, index) => (
                                        <div key={index} className='animate-pulse 
                                        transform scale-100 hover:scale-110 transition-transform duration-300'>
                                            <div className='w-[150px] h-4 mb-2 bg-gray-300 rounded'></div>
                                        </div>
                                    ))}
                                    </>
                                ) : categoryError ? (
                                    <p className="font-dm ">Error loading categories</p>
                                ) : allCategoriesData.length > 0 ? (
                                    <>
                                        {allCategoriesData.map((row, index) => (
                                            <p className="text-white font-dm cursor-pointer text-sm mb-1 capitalize font-light"
                                                key={index}
                                                onClick={() => {
                                                    categoriDetailsRow(row?.id);
                                                }}
                                            >{row?.name}</p>
                                        ))}
                                    </>

                                ) : null}

                            </div>


                        </div>

                    </div>

                </div>
            </div>

            <div className="bg-[#072320]">
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-4 flex justify-center items-center bottom_footer_box">
                    <p className="text-white text-base text-center font-dm font-light ">This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish.</p>
                    <button className="font-dm font-sm px-3 py-2 text-white bg-[#036642] ml-3 capitalize accept_btn">accept</button>
                </div>
            </div>
        </>

    );
}