import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paragraph } from "../basic/title";
import { Btnone } from '../basic/button';
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

const CollectionsShopCard = ({ allproducts }) => {
    const navigate = useNavigate();
    const [allProductsData, setAllProductsData] = useState([]);
    useEffect(() => {
        if (allproducts?.length) {
            setAllProductsData(allproducts);
        }
    }, [allproducts]);


    const handleDetailsRow = (id) => {
        navigate(`/shop/${id}`);
    };


    return (
        <Slider {...settings} className=''>
            {allProductsData.map((item, index) => (
                <div className='group relative h-full cursor-pointer' key={index} 
                onClick={() => {
                    handleDetailsRow(item?.id);
                }}>
                    <div className='group
                          flex flex-col justify-center relative h-full items-center rounded-br-lg rounded-tl-lg
                            border-2 border-[#072320]'>

                        <div className='flex justify-center items-center bg-[#00A762] rounded-br-lg rounded-tl-lg mx-2 p-4 my-2 relative '>

                            <div className='relative overflow-hidden h-[200px] rounded-br-lg rounded-tl-lg'>
                                <img

                                    src={BASE_IMAGE_URL + item?.additional_images[0]}

                                    alt="Product"
                                    className="block w-full h-full transition-all duration-300 ease-in-out h-auto group-hover:opacity-0"
                                />

                                <img
                                    src={BASE_IMAGE_URL + item?.additional_images[0]}
                                    alt="Product on hover"
                                    className="block w-full h-full opacity-0 absolute top-0 left-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                                />
                            </div>

                            <div className="show_box flex justify-evenly items-center absolute h-10 w-10 bg-[#072320c7] mx-auto px-2 py-1 rounded-full">
                                <FaRegHeart className='text-white text-[20px]' />
                            </div>

                        </div>

                        <div className="flex flex-col justify-center items-center mt-2 mb-4">
                            <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium">{item?.name}</h2>
                            <div>
                                <Paragraph title={item?.short_description} shortDescription='true' lineclamp='3' />
                            </div>
                            <div className="mt-2">
                                <Btnone title="add to cart" bgColor="#00A762" />
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default CollectionsShopCard;
