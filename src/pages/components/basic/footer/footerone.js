import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { RiSkypeFill } from "react-icons/ri";
import { FaSquareTwitter } from "react-icons/fa6";
import './footer.css';
import comLogo  from '../../../../assets/header/tastydaily-0556409248.webp';
export default function Footerone() {

    return (
        <>
            <div className="bg-[#072320]">
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">

                    <div className="grid grid-cols-12 md:gap-4 gap-0">



                        <div className='lg:col-span-4 col-span-12  flex flex-col justify-end items-start'>
                            <h6 class="text-white font-dm text-lg mb-2 capitalize text-center width_change w-3/4">Newsletter Signup</h6>
                            <div class="relative w-3/4 width_change">
                                <input type="text"
                                    class="block w-full py-2 px-3 bg-[#00a76282] text-white font-dm   focus:outline-none capitalize" placeholder="enter your email" />
                                <div class="absolute inset-y-0 right-0 flex items-center bg-[#00A762]">
                                    <button type="submit" class="text-white px-4 py-2 capitalize font-dm ">
                                        subscribe
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='lg:col-span-4 col-span-12  flex-col flex items-center justify-center'>


                            <div className='flex items-center h-[40px] mb-2'>
                                <img
                                    className="h-full w-auto"
                                    src={comLogo}
                                    alt="logo"
                                />
                            </div>

                            <p className="text-white text-center font-dm  text-base font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eius od tempor incididunt ut labore et dolore magna.</p>



                        </div>

                        <div className='lg:col-span-4 col-span-12 flex flex-col justify-end items-end'>
                            <h6 class="text-white font-dm text-lg mb-2 capitalize text-center width_change w-3/4">Get in Touch With Us</h6>
                            <div class="flex justify-center items-center w-3/4 width_change	 bg-[#00a76282] gap-2 py-2 px-3">
                                <FaFacebookF className="text-[25px] text-[#00a762]" />
                                <FaInstagram className="text-[25px] text-[#00a762]" />
                                <RiSkypeFill className="text-[25px] text-[#00a762]" />
                                <FaSquareTwitter className="text-[25px] text-[#00a762]" />
                                <FaWhatsapp className="text-[25px] text-[#00a762]" />
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="bg-[#00A762]">
                <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">

                    <div className="grid grid-cols-12 md:gap-4 gap-0">



                        <div className='md:col-span-3  col-span-12 flex flex-col md:justify-start md:items-start justify-center items-center'>
                            <h6 class="text-[#072320] text-lg  font-dm  mb-3 capitalize  font-medium">Help</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col md:justify-start md:items-start justify-center items-center'>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">How to Make an Order?</p>
                                <p class="text-white font-dm text-sm  mb-1 capitalize font-light">About Us </p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">My Orders</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Delivery Terms</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Return</p>
                            </div>

                        </div>

                        <div className='md:col-span-3 col-span-12  flex flex-col 
                       md:justify-start md:items-start justify-center items-center'>
                            <h6 class="text-[#072320] text-lg  font-dm mb-3 capitalize font-medium">Quick Links</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col 
                                 md:justify-start md:items-start justify-center items-center'>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Instagram</p>
                                <p class="text-white font-dm text-sm  mb-1 capitalize font-light">Facebook</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Pinterest</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Twitter</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">YouTube</p>
                            </div>

                        </div>

                        <div className='md:col-span-3  col-span-12  flex flex-col 
                        md:justify-start md:items-start justify-center items-center'>
                            <h6 class="text-[#072320] text-lg  font-dm  mb-3 capitalize font-medium">Shop</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col    md:justify-start md:items-start justify-center items-center'>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Products</p>
                                <p class="text-white font-dm text-sm  mb-1 capitalize font-light">Cart</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Wishlist</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">My Account</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Contacts</p>
                            </div>
                        </div>

                        <div className='md:col-span-3 col-span-12 flex flex-col md:justify-start md:items-start justify-center items-center'>
                            <h6 class="text-[#072320] text-lg  font-dm mb-3 capitalize font-medium">Categories</h6>

                            <div className='md:col-span-3 col-span-12  flex flex-col md:justify-start md:items-start justify-center items-center'>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Products</p>
                                <p class="text-white font-dm text-sm  mb-1 capitalize font-light">Vegetables</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Fruits</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Bakery</p>
                                <p class="text-white font-dm text-sm mb-1 capitalize font-light">Sweets</p>
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