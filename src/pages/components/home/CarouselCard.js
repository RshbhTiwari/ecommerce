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
  infinite: true,
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

  const { isLoading, error, featured } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(fetchAllFeaturedCategories());
  }, [dispatch]);

  useEffect(() => {
    if (featured?.length) {
      setAllfeaturedData(featured);
    }
  }, [featured]);

  const categoriDetailsRow = (id) => {
    navigate(`/categories/${id}`);
  };

  return (
    <Slider {...settings} className='py-10'>
      {allfeaturedData.map((item, index) => (
        <div key={index} className='px-2 relative h-full cursor-pointer' onClick={() => categoriDetailsRow(item.id)}>
          <div className='relative h-full'>
            <div className='overflow-hidden rounded-lg h-full'>

              {item?.feature_image ? (
                <img
                  src={BASE_IMAGE_URL + item?.feature_image}
                  alt="image"
                  onClick={() => categoriDetailsRow(item.id)}
                  className="responsive_image_card shadow rounded-lg overflow-hidden object-cover hover:scale-110 transition-all duration-500 cursor-pointer h-full"
                />
              ) : (
                <img
                  src={defultimage}
                  alt="image"
                  onClick={() => categoriDetailsRow(item.id)}
                  className="responsive_image_card shadow rounded-lg overflow-hidden object-cover hover:scale-110 transition-all duration-500 cursor-pointer h-full"
                />
              )}

            </div>

            {/* Absolute box */}
            <div className='absolute card_gradient px-3 py-3'>
              <div className='relative h-full'>
                <p className='text-white font-dm'>{item?.name}</p>
              </div>
            </div>

          </div>
          <div className='absolute card_btn_box'>
            <Btnone title="Shop Now" bgColor="#072320" borderColor="#00A762" />
          </div>
        </div>
      ))}
    </Slider>
  );
}

export default CarouselCard;
