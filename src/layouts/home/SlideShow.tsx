import Swiper from '../../components/Swiper'
import SwiperSlide from '../../components/SwiperSlide'
import usePublicStore from '../../stores/public'

const SlideShow = () => {
  const publicStore = usePublicStore()

  return (
    <Swiper className="slide-show" options={{ slidesPerView: 1, loop: true }}>
      {publicStore.slideshow.map((slide, index) => {
        return <SwiperSlide key={index}>
          <img src={slide.image} />
        </SwiperSlide>
      })}
    </Swiper>
  )
}

export default SlideShow
