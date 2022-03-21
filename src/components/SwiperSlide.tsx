interface Props {}

function SwiperSlide(props: React.PropsWithChildren<Props>) {
  return (
    <div className="swiper-slide">
      {props.children}
    </div>
  );
}

export default SwiperSlide;
