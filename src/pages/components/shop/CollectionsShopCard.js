


import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import shopcarddata from "../../../data/shopcarddata";
import { Paragraph } from "../basic/title";
import { Btnone } from '../basic/button';
import { FaRegHeart } from "react-icons/fa";

class CollectionsShopCard extends React.Component {
    render() {
        const settings = {
            // dots: true,
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
                        infinite: true,
                        // dots: true
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

        return (
            <Slider {...settings} className=''>
                {shopcarddata.map((item, index) => (
                    <div className='group'>
                        <div className='group
          flex flex-col justify-center relative h-full items-center rounded-br-lg  rounded-tl-lg
            border-2 border-[#072320]' key={index}>

                            <div className=' flex justify-center items-center bg-[#00A762] rounded-br-lg rounded-tl-lg mx-2 my-2 relative '>


                                <div className='w-3/4  relative overflow-hidden'>
                                    <img
                                        src={item.image}
                                        alt="Product"
                                        className="block w-full transition-all duration-300 ease-in-out h-auto group-hover:opacity-0"
                                    />

                                    <img
                                        src={item.hoverimage}
                                        alt="Product on hover"
                                        className="block w-full h-auto opacity-0 absolute top-0 left-0 transition-all duration-300 ease-in-out group-hover:opacity-100"
                                    />
                                </div>

                                <div className="show_box flex justify-evenly items-center absolute h-10 w-10 bg-[#072320c7] mx-auto px-2 py-1 rounded-full">

                                    <FaRegHeart className='text-white text-[20px]' />

                                </div>


                            </div>

                            <div className="flex flex-col justify-center items-center mt-2 mb-4">

                                <h2 className="text-[#00A762] text-center 
                            font-dm text-lg capitalize font-medium
                             ">{item.title}</h2>



                                <Paragraph title={item.description} />

                                <div className="mt-2">
                                    <Btnone title="add to cart"
                                        bgColor="#00A762" />
                                </div>



                            </div>


                        </div>
                    </div>
                ))
                }
            </Slider>
        );
    }
}

export default CollectionsShopCard;
