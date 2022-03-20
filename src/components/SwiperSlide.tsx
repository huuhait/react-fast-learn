interface Props {}

const SwiperSlide = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className="swiper-slide">
      {props.children}
    </div>
  )
}

export default SwiperSlide
