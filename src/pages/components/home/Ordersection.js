import React from 'react';
import { Btnone } from '../basic/button';
import imgSrc from '../../../assets/home/11.png';
import { HeadingBanner } from '../basic/title';
import { useNavigate } from 'react-router-dom';

const Ordersection = () => {
    const navigate = useNavigate();

    const handleRow = () => {
        navigate('/shop')
        window.scrollTo({
            top: 0,
            behavior: 'smooth'  // This adds a smooth scroll effect
        });
    };

    return (
        <div className="container mx-auto max-w-7xl  px-2 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 md:gap-4 gap-0">
                <div data-aos="fade-right" data-aos-delay="200" className='md:col-span-8 col-span-12  flex flex-col md:justify-center md:items-start justify-center items-center'>
                    <HeadingBanner title="Order Tasty Fruitsand Get Free Delivery!" />
                    <div className='mt-2'><Btnone title="explore shop" handleClick={() => handleRow()}
                        bgColor="#00A762" borderColor="#00A762" /></div>
                </div>

                <div className='md:col-span-4 col-span-12 flex flex-col md:justify-end md:items-end justify-center items-center '>
                <div className='ig_scale'>
                <img
                        src={imgSrc}
                        alt="image"
                        className="shadow rounded-lg "
                    />
                </div>
                   
                </div>

            </div>

        </div>
    );
};

export default Ordersection;