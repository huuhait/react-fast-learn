import { Swiper, SwiperSlide } from 'swiper/react';
import usePublicStore from '~/stores/public';
import 'swiper/css';

function SlideShow() {
  const publicStore = usePublicStore();

  return (
    <div className="slide-show">
      <Swiper slidesPerView={1} loop={true}>
        {publicStore.slideshow.map((slide) => (
          <SwiperSlide key={slide.id}>
            <img src={slide.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SlideShow;
