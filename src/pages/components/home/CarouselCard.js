import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Btnone from '../basic/button/one';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFeaturedCategories } from '../../../redux/slices/category';
import defultimage from '../../../assets/home/img.png';

const BASE_IMAGE_URL = 'http://127.0.0.1:8000/storage/';

const settings = {
  infinite: false,
  speed: 500,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
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

const CarouselCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allfeaturedData, setAllfeaturedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoading: featuredLoading, error, featured } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllFeaturedCategories());
  }, [dispatch]);

  useEffect(() => {
    if (featured?.length) {
      const timer = setTimeout(() => {
        setAllfeaturedData(featured);
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [featured]);

  const categoriDetailsRow = (id) => {
    navigate(`/categories/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  
  });

  };

  if (isLoading || featuredLoading) {
    // Skeleton loader while data is loading
    return (
      <Slider {...settings} className='py-10'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse border border-blue-200 shadow rounded-md p-3">
            <div className="flex flex-col items-center justify-center rounded-lg p-3">
              <div className="w-[150px] h-[150px] bg-gray-300 mb-2 mx-auto rounded-lg"></div>
              <div className="h-4 w-24 bg-gray-300 rounded-full mb-2"></div>
              <div className="h-4 w-32 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        ))}
      </Slider>
    );
  }

  if (error) {
    // Error handling
    return (
      <div className="py-10 text-center text-red-600">
        <p>Something went wrong. Please try again later.</p>
      </div>
    );
  }
  const handleRow = () => {
    navigate('/shop')
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // This adds a smooth scroll effect
    });
};
  return (
    <Slider {...settings} className='py-10'>
      {allfeaturedData.map((item, index) => (
        <div key={index} className='px-2 relative h-full'>
          <div className='relative h-full cursor-pointer' onClick={() => categoriDetailsRow(item.id)}>
            <div className='overflow-hidden rounded-lg h-full image-container'>
              {item?.feature_image ? (
                <img
                  src={BASE_IMAGE_URL + item?.feature_image}
                  alt="image"
                  className="zoom-image shadow rounded-lg overflow-hidden object-cover cursor-pointer h-full"
                />
              ) : (
                <img
                  src={defultimage}
                  alt="image"
                  className="zoom-image shadow rounded-lg overflow-hidden object-cover cursor-pointer h-full"
                />
              )}
            </div>
            <div className='absolute card_gradient px-3 py-3'>
              <div className='relative h-full'>
                <p className='text-white font-dm'>{item?.name}</p>
              </div>
            </div>
          </div>

          <div className='absolute card_btn_box'>
            <Btnone title="Shop Now" bgColor="#072320" borderColor="#00A762" handleClick={() => handleRow()} />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselCard;
