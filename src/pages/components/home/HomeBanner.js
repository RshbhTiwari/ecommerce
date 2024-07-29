import { HeadingBanner } from '../basic/title';
import Btnone from '../basic/button/one';
import React from 'react';
import video from '../../../assets/video/Supermarket.mp4';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className="relative lg:h-[450px] md:h-[350px] h-[333px]">
            <div className="absolute inset-0">
                <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={video}
                />
                <div className="absolute inset-0 bg-black opacity-50" />
            </div>
            <div className="relative flex flex-col items-center justify-center h-full text-white">
                <h2 className={`font-dm text-2xl capitalize font-semibold pb-2 text-[#00A762]`} >Fresh Grocery</h2>
                <HeadingBanner title="There's you can Buy your all of Grocery Products." textAlign='center' />
                <div className='mt-2'>

                    <Btnone title="shop Now"
                        handleClick={() => navigate('/shop')}
                        bgColor="#00A762" borderColor="#00A762" />
                </div>
            </div>
        </div>
    );
};

export default Banner;

