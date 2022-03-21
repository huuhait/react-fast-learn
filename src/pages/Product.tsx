import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Container from '~/components/Container';
import LayoutContent from '~/components/LayoutContent';
import SameProducts from '~/layouts/product/SameProduct';
import usePublicStore from '~/stores/public';
import { Product } from '~/types';
import '~/assets/styles/pages/product.less';
import useCartStore from '~/stores/cart';

export default function () {
  const [quantity, setQuantity] = useState(() => 1);
  const { id } = useParams();
  const product = usePublicStore((state) => state.products.find((p) => p.id === Number(id)) as Product);
  const cartStore = useCartStore();

  return (
    <LayoutContent className="page-product">
      <Container className="flex">
        <div className="w-6/12">
          <img src={product.image} />
        </div>
        <div className="w-6/12 pt-16">
          <h2 className="pt-6 text-3xl font-bold pb-4 border-b-[3px] inline-block">{product.name}</h2>
          <p className="pt-4 pb-4 font-bold text-red-600">
            Sale:
            {' '}
            {product.discount * 100}
            %
          </p>
          <span className="line-through text-2xl text-amber-700 opacity-40 mr-4">
            {Number(product.price).toLocaleString()}
            đ
          </span>
          <span className="font-bold text-2xl text-amber-700">
            {(Number(product.price) - (Number(product.price) * product.discount)).toLocaleString()}
            đ
          </span>
          <p className="pt-8">
            {product.description}
          </p>
          <div className="pt-12 flex items-center">
            <div className="product-quantity flex mr-10 border-2">
              <span className="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" onClick={() => { if (quantity > 1) setQuantity(quantity - 1); }}>-</span>
              <input value={quantity} className="text-center h-10 border-t-[2px] border-b-[2px] m-0 w-10" type="text" onChange={(e) => setQuantity(Number(e.target.value))} />
              <span className="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" onClick={() => setQuantity(quantity + 1)}>+</span>
            </div>
            <Button className="text-base w-44 h-10" onClick={() => cartStore.Add(Number(id), quantity)}>
              THÊM VÀO GIỎ
            </Button>
          </div>
        </div>
      </Container>

      <SameProducts />
    </LayoutContent>
  );
}
