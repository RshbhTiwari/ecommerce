// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import carouselcarddata from "../../../data/carouselcarddata";
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

// const ProductImagesPage = () => {
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [autoplay, setAutoplay] = useState(true); // Autoplay for grid images

//     // Function to handle autoplay
//     useEffect(() => {
//         let interval;
//         // if (autoplay) {
//         //     interval = setInterval(() => {
//         //         setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselcarddata.length);
//         //     }, 4000); // Adjust the interval as per your requirement
//         // } else {
//         clearInterval(interval);
//         // }
//         return () => clearInterval(interval);
//     }, [autoplay, carouselcarddata.length]);

//     const settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//     };

//     return (

//         <>
//             {/* Single image box */}
//             <div className='rounded-lg relative ' >
//                 <img
//                     src={carouselcarddata[currentImageIndex].image}
//                     alt="image"
//                     className="cursor-pointer h-full w-full rounded-lg shadow"
//                 />

//                 {/* Previous and Next buttons */}

//                 <div className='flex justify-between items-center absolute left_right_shop_btn '>
//                     <button className='animate-bounce left_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
//                         onClick={() => setCurrentImageIndex((currentImageIndex - 1 + carouselcarddata.length) % carouselcarddata.length)}>
//                         <MdKeyboardArrowLeft className='text-white text-4xl' />
//                     </button>

//                     <button className='animate-bounce right_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
//                         onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselcarddata.length)}>
//                         <MdKeyboardArrowRight className='text-white text-4xl' />
//                     </button>
//                 </div>


//             </div>

//             {/* Multiple image boxes */}
//             <Slider {...settings} className='py-3'>
//                 {carouselcarddata.map((item, index) => (
//                     <div key={index} className='mr-1 slider-image-container rounded-lg'>
//                         <img
//                             src={item.image}
//                             alt="image"
//                             className="cursor-pointer slider-thumbnail rounded-lg"
//                             onClick={() => setCurrentImageIndex(index)}
//                             onMouseEnter={() => setCurrentImageIndex(index)} // Change main image on hover
//                         />
//                     </div>
//                 ))}
//             </Slider>


//         </>
//     );
// };

// export default ProductImagesPage;
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carouselcarddata from "../../../data/carouselcarddata";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const ProductImagesPage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    useEffect(() => {
        let interval;
        clearInterval(interval);
        return () => clearInterval(interval);
    }, [autoplay, carouselcarddata.length]);

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (

        <>
            {/* Single image box */}
            <div className='rounded-lg relative ' >

                <div className='rounded-lg relative zoom-container'>
                    <img
                        src={carouselcarddata[currentImageIndex].image}
                        alt="image"
                        className="cursor-pointer h-full w-full rounded-lg shadow"
                    />
                </div>

                {/* <img
                    src={carouselcarddata[currentImageIndex].image}
                    alt="image"
                    className="cursor-pointer h-full w-full rounded-lg shadow"
                /> */}

                {/* Previous and Next buttons */}

                <div className='flex justify-between items-center absolute left_right_shop_btn '>
                    <button className='animate-bounce left_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + carouselcarddata.length) % carouselcarddata.length)}>
                        <MdKeyboardArrowLeft className='text-white text-4xl' />
                    </button>

                    <button className='animate-bounce right_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselcarddata.length)}>
                        <MdKeyboardArrowRight className='text-white text-4xl' />
                    </button>
                </div>


            </div>

            {/* Multiple image boxes */}
            <Slider {...settings} className='py-3'>
                {carouselcarddata.map((item, index) => (
                    <div key={index} className='mr-1 slider-image-container rounded-lg'>
                        <img
                            src={item.image}
                            alt="image"
                            className="cursor-pointer slider-thumbnail rounded-lg"
                            onClick={() => setCurrentImageIndex(index)}
                            onMouseEnter={() => setCurrentImageIndex(index)} // Change main image on hover
                        />
                    </div>
                ))}
            </Slider>


        </>
    );
};

export default ProductImagesPage;
