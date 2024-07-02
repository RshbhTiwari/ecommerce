import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchAllCategories,
    startLoading,
    hasError,
} from "../../../redux/slices/category";
import categoriescarddata from "../../../data/categoriescarddata";
import { Paragraph } from "../basic/title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { ErrorPages } from "../basic/ErrorPages";

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

const CategoriesCard = () => {
    const dispatch = useDispatch();
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const { isLoading, error, categories } = useSelector(
        (state) => state.category
    );
    const sliderRef = useRef(null);

    useEffect(() => {
        dispatch(fetchAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    console.log("allCategoriesData", categories.map((item) => BASE_IMAGE_URL + item?.thumbnail_image));

    const settings = {
        dots: false,
        infinite: true,
        centerPadding: "100px",
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    return (
        <div className="relative">
            {isLoading ? (
                <div className="grid grid-cols-5 gap-4">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="flex flex-col items-center justify-center rounded-lg p-3 border-2 border-[#07232052]">
                                <div className="w-[75px] h-[75px] bg-gray-300 mb-2 mx-auto"></div>
                                <div className="h-4 w-20 bg-gray-300 rounded-full mb-2"></div>
                                <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : error ? (
                <ErrorPages
                    massage="Sorry, but nothing matched your search terms. Please try again."
                    height="250px"
                />
            ) : (
                <>
                    <Slider ref={sliderRef} {...settings} className="">
                        {allCategoriesData.map((item, index) => (
                            <div key={index} className="px-2">
                                <div className="flex flex-col items-center justify-center rounded-lg p-3 border-2 border-[#072320]">
                                    <div className="w-[75px] mb-2 mx-auto">
                                        <img
                                            src={BASE_IMAGE_URL + item?.thumbnail_image}
                                            alt="image"
                                            className="responsive_image_card"
                                        />
                                    </div>
                                    <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium">
                                        {item?.name}
                                    </h2>
                                    <Paragraph title={`${item?.products_count} Products`} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                    <div className="flex justify-between items-center absolute left_right_btn">
                        <button
                            className="left_btn flex justify-center items-center animate-bounce w-11 h-11 rounded-full bg-[#00A762]"
                            onClick={prevSlide}
                        >
                            <MdKeyboardArrowLeft className="text-white text-4xl" />
                        </button>
                        <button
                            className="right_btn flex justify-center items-center animate-bounce w-11 h-11 rounded-full bg-[#00A762]"
                            onClick={nextSlide}
                        >
                            <MdKeyboardArrowRight className="text-white text-4xl" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CategoriesCard;
