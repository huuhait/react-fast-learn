import { useEffect, useState } from 'react';
import type { SwiperOptions } from 'swiper';
import SwiperJS from 'swiper';
import 'swiper/css';

interface Props {
  options: SwiperOptions;
  className?: string
}

function Swiper(props: React.PropsWithChildren<Props>) {
  const [swiper, setSwiper] = useState<SwiperJS>();

  useEffect(() => {
    setSwiper(new SwiperJS('.swiper', {
      direction: 'horizontal',
      ...props.options,
    }));

    return (() => {
      swiper?.destroy();
    });
  }, []);

  return (
    <div className={`swiper ${props.className}`}>
      <div className="swiper-wrapper swiper-wrapper">
        {props.children}
      </div>
    </div>
  );
}

export default Swiper;
