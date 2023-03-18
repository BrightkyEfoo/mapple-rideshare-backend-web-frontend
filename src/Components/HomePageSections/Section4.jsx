import React from 'react';
import './style.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation, Thumbs, Autoplay } from 'swiper';
import './swiper-bundle.css';
import { ellipsis } from '../../helpers';
import { useMediaQuery } from 'react-responsive';
// import './style.css';
SwiperCore.use([Navigation, Pagination, Thumbs, Autoplay]);

const Section4 = ({ data }) => {
  return (
    <div className="homepage-section4-container">
      <p>{data.title}</p>
      <p>{ellipsis(100 , data.main)}</p>
      <Swiper
        spaceBetween={10}
        pagination
        // navigation
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {data.slides.map((el,i)=>{
            return <SwiperSlide key={i}><Slide data={el}/></SwiperSlide>
        })}
      </Swiper>
    </div>
  );
};

export default Section4;


export const Slide = ({data})=>{
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 912px)' })

    return <div className='homepage-section4-container-slide'>
        <img src={data.image} alt='' />
        <div>
            <p>{ellipsis(250 , data.main)}</p>
            <p>{data.name}</p>
        </div>
        {/* {isTabletOrMobile && <p>{data.name}</p>} */}
    </div>
}