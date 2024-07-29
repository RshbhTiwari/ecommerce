import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../../redux/slices/category";
import { Paragraph } from "../basic/title";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";
import { useNavigate } from "react-router-dom";
import defultimage from '../../../assets/home/defultlogo.png';

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

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

const CategoriesCard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sliderRef = useRef(null);
    const [allCategoriesData, setAllCategoriesData] = useState([]);
    const [isDelayedLoading, setIsDelayedLoading] = useState(true); // New state for delay simulation

    const { isLoading, error, categories } = useSelector(
        (state) => state.category
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(fetchAllCategories());
            setIsDelayedLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [dispatch]);

    useEffect(() => {
        if (categories?.length) {
            setAllCategoriesData(categories);
        }
    }, [categories]);

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const categoriDetailsRow = (id) => {
        navigate(`/categories/${id}`);
    };

    if (isDelayedLoading || isLoading) {
        return (
            <Slider ref={sliderRef} {...settings} className="">
                {[...Array(5)].map((_, index) => (
                    <div key={index} className="animate-pulse border border-blue-200 shadow rounded-md">
                        <div className="flex flex-col items-center justify-center rounded-lg p-3 ">
                            <div className="w-[75px] h-[75px] bg-gray-300 mb-2 mx-auto rounded-lg"></div>
                            <div className="h-4 w-20 bg-gray-300 rounded-full mb-2"></div>
                            <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                ))}
            </Slider>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500">
                <p>Error loading categories. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            <Slider ref={sliderRef} {...settings} className="">
                {allCategoriesData.map((item, index) => (
                    <div key={index} className="px-2">
                        <div className="flex flex-col items-center justify-center rounded-lg p-3 border-2 border-[#072320] cursor-pointer"
                            onClick={() => categoriDetailsRow(item.id)}>

                            <div className="w-[75px] mb-2 mx-auto">
                                {item?.thumbnail_image ? (
                                    <img
                                        src={BASE_IMAGE_URL + item?.thumbnail_image}
                                        alt="image"
                                        className=""
                                        onClick={() => categoriDetailsRow(item.id)}
                                    />
                                ) : (
                                    <img
                                        src={defultimage}
                                        alt="image"
                                        className=""
                                        onClick={() => categoriDetailsRow(item.id)}
                                    />
                                )}
                            </div>
                            <h2 className="text-[#00A762] text-center font-dm text-lg capitalize font-medium">
                                {item?.name}
                            </h2>
                            <Paragraph title={`${item?.total_product_count} Products`} />
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
        </div>
    );
};

export default CategoriesCard;
