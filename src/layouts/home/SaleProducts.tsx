import Container from '~/components/Container';
import ProductItem from '~/components/ProductItem';
import Swiper from '~/components/Swiper';
import SwiperSlide from '~/components/SwiperSlide';
import usePublicStore from '~/stores/public';

function SaleProducts() {
  const products = usePublicStore((state) => state.products);

  return (
    <Container className="sale-products mt-10">
      <div className="bold-text text-3xl">
        Sản phẩm giảm giá
      </div>
      <div className="sale-products-content">
        <Swiper
          options={{
            slidesPerView: 4,
            loop: true,
          }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductItem className="flex-1" product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Container>
  );
}

export default SaleProducts;
