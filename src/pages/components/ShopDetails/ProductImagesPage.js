// import React, { useEffect, useState } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { getOneProduct } from '../../../redux/slices/product';
// import { RxCross2 } from "react-icons/rx";

// const ProductImagesPage = ({ id }) => {
//     const dispatch = useDispatch();
//     const baseUrl = 'http://127.0.0.1:8000/storage/';
//     const [carouselCardData, setCarouselCardData] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const { oneProduct } = useSelector((state) => state.product);

//     useEffect(() => {
//         dispatch(getOneProduct(id));
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (oneProduct) {
//             setCarouselCardData(oneProduct.additional_images || []);
//             setCurrentImageIndex(0); // Reset index when new product data is loaded
//         }
//     }, [oneProduct]);

//     const settings = {
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//     };

//     const handleImageChange = (index) => {
//         if (index >= 0 && index < carouselCardData.length) {
//             setCurrentImageIndex(index);
//         }
//     };

//     const toggleModal = () => {
//         setIsModalOpen(!isModalOpen);
//     };

//     const handleMouseMove = (e) => {
//         const image = e.currentTarget;
//         const { left, top, width, height } = image.getBoundingClientRect();
//         const x = ((e.clientX - left) / width) * 100;
//         const y = ((e.clientY - top) / height) * 100;
//         image.style.transformOrigin = `${x}% ${y}%`;
//     };

//     return (
//         <>
//             {/* Single image display */}
//             <div className='rounded-lg relative'>
//                 <div className='rounded-lg relative zoom-container'>
//                     {carouselCardData.length > 0 && (
//                         <img
//                             src={baseUrl + carouselCardData[currentImageIndex]}
//                             alt="Product"
//                             className="cursor-zoom-in h-full w-full rounded-lg shadow transition-transform duration-200"
//                             onMouseMove={handleMouseMove}
//                             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.5)'}
//                             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                             onClick={toggleModal}
//                         />
//                     )}
//                 </div>

//                 {/* Icons for changing images */}
//                 <div className='absolute top-1/2 left-2 transform -translate-y-1/2'>
//                     {currentImageIndex > 0 && (
//                         <button
//                             className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
//                             onClick={() => handleImageChange(currentImageIndex - 1)}>
//                             <MdKeyboardArrowLeft className='text-white text-4xl' />
//                         </button>
//                     )}
//                 </div>
//                 <div className='absolute top-1/2 right-2 transform -translate-y-1/2'>
//                     {currentImageIndex < carouselCardData.length - 1 && (
//                         <button
//                             className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
//                             onClick={() => handleImageChange(currentImageIndex + 1)}>
//                             <MdKeyboardArrowRight className='text-white text-4xl' />
//                         </button>
//                     )}
//                 </div>
//             </div>

//             {/* Slider for multiple images */}
//             <Slider {...settings} className='py-2 imgslide rounded-lg'>
//                 {carouselCardData.map((item, index) => (
//                     <div key={index} className='mr-1 slider-image-container rounded-lg'>
//                         <img
//                             src={baseUrl + item}
//                             alt="Thumbnail"
//                             className="cursor-pointer slider-thumbnail rounded-lg h-full w-full"
//                             onClick={() => handleImageChange(index)}
//                         />
//                     </div>
//                 ))}
//             </Slider>

//             {/* Modal for zoomed image */}
//             {isModalOpen && (
//                 <div
//                     className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50'
//                     onClick={toggleModal}
//                 >
//                     <div className="relative sm:w-2/5 w-full zoom-container rounded-lg">

//                         <div className="flex items-center justify-center w-8 h-8 rounded-full z-50
//                           bg-[#00A762] cursor-pointer absolute right-0" onClick={toggleModal} style={{

//                           }}>
//                             <RxCross2 className='text-xl cursor-pointer text-white' />
//                         </div>

//                         <img
//                             src={baseUrl + carouselCardData[currentImageIndex]}
//                             alt="Zoomed Product"
//                             // className="max-w-full max-h-full rounded-lg"
//                             className="cursor-zoom-in max-w-full max-h-full rounded-lg shadow transition-transform duration-200"
//                             onMouseMove={handleMouseMove}
//                             onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.5)'}
//                             onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//                         />

//                         {/* Left and Right Navigation in Modal */}
//                         <div className='absolute top-1/2 left-2 transform -translate-y-1/2'>
//                             {currentImageIndex > 0 && (
//                                 <button
//                                     className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#072320]'
//                                     onClick={(e) => {
//                                         e.stopPropagation(); // Prevent closing the modal
//                                         handleImageChange(currentImageIndex - 1);
//                                     }}
//                                 >
//                                     <MdKeyboardArrowLeft className='text-white text-4xl' />
//                                 </button>
//                             )}
//                         </div>
//                         <div className='absolute top-1/2 right-2 transform -translate-y-1/2'>
//                             {currentImageIndex < carouselCardData.length - 1 && (
//                                 <button
//                                     className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#072320]'
//                                     onClick={(e) => {
//                                         e.stopPropagation(); // Prevent closing the modal
//                                         handleImageChange(currentImageIndex + 1);
//                                     }}
//                                 >
//                                     <MdKeyboardArrowRight className='text-white text-4xl' />
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default ProductImagesPage;




// perfect work only loop issue
import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../../redux/slices/product';

const ProductImagesPage = ({ id }) => {
    const dispatch = useDispatch();
    const baseUrl = 'http://127.0.0.1:8000/storage/';
    const [carouselCardData, setCarouselCardData] = useState([]);
    const sliderRef = useRef(null); // Ref to the slider

    const { oneProduct } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch, id]);

    // useEffect(() => {
    //     if (oneProduct) {
    //         setCarouselCardData(oneProduct?.additional_images || []);
    //     }
    // }, [oneProduct]);
    useEffect(() => {
        if (oneProduct) {
            setCarouselCardData(oneProduct?.additional_images || []);
            setCurrentImageIndex(0); // Reset index when new product data is loaded
        }
    }, [oneProduct]);

    const settings = {
        infinite: carouselCardData.length > 4,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        afterChange: (current) => setCurrentImageIndex(current),
    };

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleImageChange = (index) => {
        if (index >= 0 && index < carouselCardData.length) {
            setCurrentImageIndex(index);
            sliderRef.current.slickGoTo(index); // Move slider to the selected index
        }
    };

    const handleNext = () => {
        const nextIndex = currentImageIndex + 1;
        if (nextIndex < carouselCardData.length) {
            handleImageChange(nextIndex);
        }
    };

    const handlePrevious = () => {
        const prevIndex = currentImageIndex - 1;
        if (prevIndex >= 0) {
            handleImageChange(prevIndex);
        }
    };

    const handleMouseMove = (e) => {
        const image = e.currentTarget;
        const { left, top, width, height } = image.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        image.style.transformOrigin = `${x}% ${y}%`;
    };

    console.log("carouselCardData", carouselCardData)

    return (
        <>
            {/* Single image display */}
            <div className='rounded-lg relative'>
                <div className='rounded-lg relative zoom-container'>
                    {carouselCardData.length > 0 && (
                        <img
                            src={baseUrl + carouselCardData[currentImageIndex]}
                            alt="Product"
                            className="cursor-zoom-in h-full w-full rounded-lg shadow transition-transform duration-200"
                            onMouseMove={handleMouseMove}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.5)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    )}
                </div>
                {carouselCardData.length > 4 && (
                    <>
                        {/* Icons for changing images */}
                        <div className='absolute top-1/2 left-2 transform -translate-y-1/2'>
                            {currentImageIndex > 0 && (
                                <button
                                    className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                                    onClick={handlePrevious}>
                                    <MdKeyboardArrowLeft className='text-white text-4xl' />
                                </button>
                            )}
                        </div>
                        <div className='absolute top-1/2 right-2 transform -translate-y-1/2'>
                            {currentImageIndex < carouselCardData.length - 1 && (
                                <button
                                    className='animate-bounce flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                                    onClick={handleNext}>
                                    <MdKeyboardArrowRight className='text-white text-4xl' />
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Slider for multiple images */}
            <Slider ref={sliderRef} {...settings} className='py-2 imgslide rounded-lg'>
                {carouselCardData.map((item, index) => (
                    <div key={index} className='mr-1 slider-image-container rounded-lg'>
                        <img
                            src={baseUrl + item}
                            alt="Thumbnail"
                            className="cursor-pointer slider-thumbnail rounded-lg h-full w-full"
                            // onClick={() => handleImageChange(index)}
                            onMouseEnter={() => setCurrentImageIndex(index)}
                        />
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default ProductImagesPage;


// slider arrow but not work pr0pper
// import React, { useEffect, useState, useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
// import { useDispatch, useSelector } from 'react-redux';
// import { getOneProduct } from '../../../redux/slices/product';

// const ProductImagesPage = ({ id }) => {
//     const dispatch = useDispatch();
//     const sliderRef = useRef(null);
//     const baseUrl = 'http://127.0.0.1:8000/storage/';
//     const [carouselCardData, setCarouselCardData] = useState([]);
//     const [currentImageIndex, setCurrentImageIndex] = useState(0);
//     const { oneProduct } = useSelector((state) => state.product);

//     useEffect(() => {
//         dispatch(getOneProduct(id));
//     }, [dispatch, id]);

//     useEffect(() => {
//         if (oneProduct) {
//             setCarouselCardData(oneProduct.additional_images || []);
//         }
//     }, [oneProduct]);

//     const settings = {
//         infinite: false,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 1,
//         afterChange: (current) => setCurrentImageIndex(current),
//     };

//     const handlePrev = () => {
//         sliderRef.current.slickPrev();
//     };

//     const handleNext = () => {
//         sliderRef.current.slickNext();
//     };

//     return (
//         <>
//             {/* Single image display */}
//             <div className='rounded-lg relative'>
//                 <div className='rounded-lg relative zoom-container'>
//                     {carouselCardData.length > 0 && (
//                         <img
//                             src={baseUrl + carouselCardData[currentImageIndex]}
//                             alt="Product"
//                             className="cursor-pointer h-full w-full rounded-lg shadow"
//                         />
//                     )}
//                 </div>
//             </div>

//             {/* Navigation buttons */}
//             <div className="flex justify-between items-center mt-4">
//                 <button onClick={handlePrev} className="p-2 bg-gray-300 rounded-full">
//                     <MdKeyboardArrowLeft size={24} />
//                 </button>
//                 <button onClick={handleNext} className="p-2 bg-gray-300 rounded-full">
//                     <MdKeyboardArrowRight size={24} />
//                 </button>
//             </div>

//             {/* Slider for multiple images */}
//             <Slider ref={sliderRef} {...settings} className='py-2 imgslide rounded-lg'>
//                 {carouselCardData.map((item, index) => (
//                     <div key={index} className='mr-1 slider-image-container rounded-lg'>
//                         <img
//                             src={baseUrl + item}
//                             alt="Thumbnail"
//                             className="cursor-pointer slider-thumbnail rounded-lg h-full w-full"
//                         />
//                     </div>
//                 ))}
//             </Slider>
//         </>
//     );
// };

// export default ProductImagesPage;





