import React from 'react';
import Slider from 'react-slick';
import './home.css'; // Create this CSS file for custom styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import carouselcarddata from "../../../data/carouselcarddata";
import Btnone from '../basic/button/one';

class CarouselCard extends React.Component {
  render() {
    const settings = {
      // dots: true,
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

    return (
      <Slider {...settings} className='py-10'>
        {carouselcarddata.map((item, index) => (
          <div
            key={index} className='px-2 relative'>
            <div className='relative'>

              <div className='overflow-hidden rounded-lg'>
                <img
                  src={item.image}
                  alt="image"
                  className="responsive_image_card shadow rounded-lg overflow-hidden object-cover hover:scale-110 transition-all duration-500 cursor-pointer"
                />
              </div>
              <div className='absolute flex flex-col justify-center items-start card_gradient px-3 py-3'>

                <p className='text-white font-dm '>{item.offer}</p>
                <p className='text-white font-dm '>{item.title}</p>
                <p className='text-white font-dm '>{item.subtitle}</p>
              </div>
            </div>

            <div className='absolute card_btn_box'>
              <Btnone title="shop Now"
                // onClick={handleClick} 
                bgColor="#072320" borderColor="#00A762" />
            </div>
          </div>
        ))
        }
      </Slider>
    );
  }
}

export default CarouselCard;
