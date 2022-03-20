import Container from "../../components/Container"
import ProductItem from "../../components/ProductItem"
import Swiper from "../../components/Swiper"
import SwiperSlide from "../../components/SwiperSlide"
import usePublicStore from "../../stores/public"

const SameProducts = () => {
  const products = usePublicStore(state => state.products)

  return (
    <Container className="same-products mt-10 mb-10">
      <div className="bold-text text-3xl">
        Sản phẩm giảm giá
      </div>
      <div className="same-products-content">
        <Swiper
          options={{
            slidesPerView: 5,
            loop: true,
          }}
        >
          {
            products.map((product, index) => (
              <SwiperSlide key={index}>
                <ProductItem className="flex-1" product={product} />
              </SwiperSlide>
            ))
          }
        </Swiper>
      </div>
    </Container>
  )
}

export default SameProducts
