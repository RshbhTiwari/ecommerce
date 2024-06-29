import React from 'react';
import Slider from 'react-slick';
import './home.css'; // Create this CSS file for custom styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import categoriescarddata from "../../../data/categoriescarddata";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Paragraph } from '../basic/title';

class CategoriesCard extends React.Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            centerPadding: '100px',
            speed: 500,
            // autoplay: true,
            // autoplaySpeed: 2000,
            slidesToShow: 5,
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

        const nextSlide = () => {
            this.slider.slickNext();
        };

        const prevSlide = () => {
            this.slider.slickPrev();
        };

        return (
            <div className='relative'>
                <Slider ref={c => (this.slider = c)}  {...settings} className=''>
                    {categoriescarddata.map((item, index) => (
                        <div key={index} className=' px-2' >

                            <div className='flex flex-col items-center justify-center rounded-lg p-3   border-2 border-[#072320]'>
                                <div className='w-[75px] mb-2 mx-auto'>
                                    <img
                                        src={item.image}
                                        alt="image"
                                        className="responsive_image_card "
                                    />
                                </div>

                                <h2 className="text-[#00A762] text-center 
                                  font-dm text-lg capitalize font-medium
                                   ">{item.title}</h2>

                                <Paragraph title={item.item} />

                            </div>
                        </div>
                    ))
                    }

                   

                </Slider>

                <div className='flex justify-between items-center absolute left_right_btn'>
                        <button className='left_btn flex justify-center items-center animate-bounce  w-11 h-11 rounded-full bg-[#00A762]' onClick={prevSlide}>
                            <MdKeyboardArrowLeft className='text-white text-4xl' />
                        </button>

                        <button className='right_btn flex justify-center items-center animate-bounce  w-11 h-11 rounded-full bg-[#00A762]' onClick={nextSlide}>
                            <MdKeyboardArrowRight className='text-white text-4xl' />
                        </button>
                    </div>

            </div>

        );
    }
}

export default CategoriesCard;
