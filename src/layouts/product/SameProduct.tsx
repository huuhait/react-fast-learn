import Container from '~/components/Container';
import ProductItem from '~/components/ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import usePublicStore from '~/stores/public';

function SameProducts() {
  const products = usePublicStore((state) => state.products);

  return (
    <Container className="same-products mt-10 mb-10">
      <div className="bold-text text-3xl">
        Sản phẩm giảm giá
      </div>
      <div className="same-products-content">
        <Swiper
          slidesPerView={4}
          loop={true}
        >
          {
            products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductItem className="flex-1" product={product} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </Container>
  );
}

export default SameProducts;
