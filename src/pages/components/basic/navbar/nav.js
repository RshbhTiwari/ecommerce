import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel
} from '@headlessui/react';
import './navbar.css';
import navigation from "../../../../data/navbar";
import { useEffect, useState } from 'react';
import categoriescarddata from "../../../../data/categoriescarddata";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carouselcarddata from "../../../../data/carouselcarddata";
import comLogo from '../../../../assets/header/tastydaily-0556409248.webp';
import { HiMiniXMark } from "react-icons/hi2";
import { HiBars3 } from "react-icons/hi2";
import {
    fetchAllCategories,
    startLoading,
    hasError,
} from "../../../../redux/slices/category";
import { useDispatch, useSelector } from 'react-redux';
import defultimage from '../../../../assets/home/defultlogo.png';

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const settings = {
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export default function Nav() {
    const dispatch = useDispatch();

    const path = window.location.pathname;
    const [showDropdown, setShowDropdown] = useState(false);
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const { isLoading, error, categories } = useSelector(
        (state) => state.category
    );
    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    const handleMouseEnter = (item) => {
        if (item.name === 'Shop') {
            setShowDropdown(true);
        }
    };

    const handleMouseLeave = () => {
        setShowDropdown(false);
    };






    return (
        <>
            <Disclosure className={`navbar `} as="nav"
                style={{
                    transition: "all 0.5s ease",
                    scrollBehavior: "smooth",
                    zIndex: "2",
                }}>
                {({ open }) => (
                    <>
                        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-3">
                            <div className="relative flex items-center justify-between sm:justify-center">
                                <div className="hidden sm:block">
                                    <div className="flex items-center justify-center">
                                        {navigation.map((item, index) => (
                                            <div
                                                className="relative"
                                                key={index}
                                                onMouseEnter={() => handleMouseEnter(item)}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <div className="flex items-center flex-col justify-center px-2">
                                                    <a
                                                        href={item.link}>
                                                        <div className="h-[40px] w-fit mb-1">
                                                            <img
                                                                className="h-full w-auto"
                                                                src={item?.image}
                                                                alt="logo"
                                                            />

                                                        </div>
                                                    </a>
                                                    <a
                                                        href={item.link}
                                                        className={`text-gray-300 px-3 py-2 text-sm font-dm font-medium ease-in-out duration-700 
                                                                ${item?.current === path ? 'border-b-2 border-white' : ''} 
                                                                ${item?.name === 'Shop' ? 'shop_class' : ''}`}
                                                    >
                                                        {item?.name}
                                                    </a>

                                                    {/* Dropdown Panel for "Home" */}
                                                    {item.name === 'Shop' && showDropdown && (
                                                        <div data-aos="fade-up" data-aos-delay="100"
                                                            className='absolute rounded-b-lg bg-[#072320] w-[400px] z-10 py-5 px-7 
                                                            top-full  -translate-x-1/1
                                                     '>

                                                            {/* <div data-aos="fade-up" 
                                                         className='absolute rounded-b-lg bg-[#072320] w-[400px] z-10 py-5 px-7 top-full left-1/2 transform transition-all duration-300 
                                                      -translate-x-1/2'> */}

                                                            <div className="grid grid-cols-12 gap-6 center_box">

                                                                <div className='sm:col-span-6 col-span-12 flex flex-col justify-center'>

                                                                    {isLoading ? (
                                                                        <>
                                                                            {allCategoriesData.map((row, index) => (
                                                                                <div className="animate-pulse py-2">
                                                                                    <div className="h-4 w-20 bg-gray-300 rounded-full mb-2"></div>
                                                                                </div>
                                                                            ))
                                                                            }
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {allCategoriesData.map((row, index) => (
                                                                                <>
                                                                                    <a href={`/categories/${row?.id}`}>
                                                                                        <h5 className='font-dm py-2 cursor-pointer text-white text-wrap'
                                                                                            key={index}
                                                                                        >{row?.name}</h5>
                                                                                    </a>
                                                                                    <hr className="border-t-1 border-[#00A762]" />
                                                                                </>
                                                                            ))
                                                                            }
                                                                        </>
                                                                    )}
                                                                </div>

                                                                <div className='sm:col-span-6 col-span-12 dropgrid'>
                                                                    {isLoading ? (
                                                                        <><div className='p-4 bg-[#00A762] mt-6 rounded-lg flex items-center justify-center ' >
                                                                            <div className="animate-pulse shadow rounded-md">
                                                                                <div className="w-[75px] h-[75px] bg-gray-300 mx-auto rounded-lg"></div>
                                                                            </div>
                                                                        </div>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Slider {...settings} className='' >
                                                                                {allCategoriesData.map((item, index) => (
                                                                                    <div className='px-1'>
                                                                                        <div className='p-4 bg-[#00A762] rounded-lg' key={index} >
                                                                                            <div className='rounded-lg flex items-center justify-center image-container'>
                                                                                                {item?.thumbnail_image ? (
                                                                                                    <a href={`/categories/${item?.id}`}>
                                                                                                        <img
                                                                                                            src={BASE_IMAGE_URL + item?.thumbnail_image}
                                                                                                            alt="image"
                                                                                                            className="zoom-image cursor-pointer w-full h-full rounded-lg"
                                                                                                        />
                                                                                                    </a>
                                                                                                ) : (
                                                                                                    <a href={`/categories/${item?.id}`}>
                                                                                                        <img
                                                                                                            src={defultimage}
                                                                                                            alt="image"
                                                                                                            className="zoom-image cursor-pointer w-full h-full rounded-lg"
                                                                                                        />
                                                                                                    </a>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>

                                                                                ))}
                                                                            </Slider>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center sm:hidden">
                                    <img
                                        className="h-8 w-auto"
                                        src={comLogo}
                                        alt="Your Company"
                                    />
                                </div>

                                <div className="flex items-center sm:hidden">
                                    <DisclosureButton className="relative inline-flex items-center bg-[#00A762] justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <HiMiniXMark className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <HiBars3 className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item?.link}
                                        className={classNames(
                                            item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                            'block rounded-md px-3 py-2 font-dm text-base font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </DisclosurePanel>
                    </>
                )}
            </Disclosure >
        </>
    )
}