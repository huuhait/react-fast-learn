import Swiper from '~/components/Swiper';
import SwiperSlide from '~/components/SwiperSlide';
import usePublicStore from '~/stores/public';

function SlideShow() {
  const publicStore = usePublicStore();

  return (
    <Swiper className="slide-show" options={{ slidesPerView: 1, loop: true }}>
      {publicStore.slideshow.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img src={slide.image} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default SlideShow;
