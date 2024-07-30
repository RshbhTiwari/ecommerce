import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { getOneProduct } from '../../../redux/slices/product';

const ProductImagesPage = ({ id }) => {

    const dispatch = useDispatch();

    const baseUrl = 'http://127.0.0.1:8000/storage/';

    const [carouselcarddata, setCarouselcarddata] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);

    const { isLoading, error, oneProduct } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getOneProduct(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (oneProduct) {
            setCarouselcarddata(oneProduct?.additional_images);
        }
    }, [oneProduct]);

    useEffect(() => {
        let interval;
        if (carouselcarddata && carouselcarddata.length > 0) {
            interval = setInterval(() => {
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [autoplay, carouselcarddata]);

    if (!carouselcarddata || carouselcarddata.length === 0) {
        return <p>Loading...</p>;
    }


    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
    };

    return (
        <>
            {/* Single image box border-2 border-[#072320] */}
            <div className='rounded-lg relative'>

                <div className='rounded-lg relative zoom-container  h-[450px]'>
                    <img
                        src={baseUrl + carouselcarddata[currentImageIndex]}
                        alt="image"
                        className="cursor-pointer h-full w-full rounded-lg shadow"
                    />
                </div>

                <div className='flex justify-between items-center absolute left_right_shop_btn'>
                    <button
                        className='animate-bounce left_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                        onClick={() => setCurrentImageIndex((currentImageIndex - 1 + carouselcarddata.length) % carouselcarddata.length)}>
                        <MdKeyboardArrowLeft className='text-white text-4xl' />
                    </button>

                    <button
                        className='animate-bounce right_shop_btn flex justify-center items-center w-11 h-11 rounded-full bg-[#00a75f9e]'
                        onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselcarddata.length)}>
                        <MdKeyboardArrowRight className='text-white text-4xl' />
                    </button>
                </div>
            </div>

            {/* Multiple image boxes */}
            <Slider {...settings} className='py-2 imgslide rounded-lg' >
                {carouselcarddata.map((item, index) => (
                    <div key={index} className='mr-1 slider-image-container rounded-lg h-[100px]' >
                        <img
                            src={baseUrl + item}
                            alt="image"
                            className="cursor-pointer slider-thumbnail rounded-lg h-full w-full"
                            onClick={() => setCurrentImageIndex(index)}
                            onMouseEnter={() => setCurrentImageIndex(index)}
                        />
                    </div>
                ))}
            </Slider>
        </>
    );
};

export default ProductImagesPage;
