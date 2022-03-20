import { useEffect } from "react";
import type { SwiperOptions } from 'swiper'
import SwiperJS from 'swiper'
import 'swiper/css'

interface Props {
  options: SwiperOptions;
  className?: string
}

const Swiper = (props: React.PropsWithChildren<Props>) => {
  useEffect(() => {
    const swiper = new SwiperJS(".swiper", {
      direction: 'horizontal',
      ...props.options,
    })

    return (() => {
      swiper.destroy()
    })
  }, [])

  return (
    <div className={`swiper ${props.className}`}>
      <div className="swiper-wrapper swiper-wrapper">
        {props.children}
      </div>
    </div>
  )
}

export default Swiper
