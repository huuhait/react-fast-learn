import { Link } from 'react-router-dom';
import { Product } from '~/types';

interface Props {
  product: Product
  className?: string
}

function ProductItem({ product, className }: Props) {
  return (
    <div className="product-item">
      <Link to={`/product/${product.id}`} className={`block border border-gray-300 ${className}`}>
        <div className="product-image">
          <img src={product.image} />
        </div>

        <div className="product-item-content border-t border-gray-300">
          <div className="product-item-title bold-text">
            {product.name}
          </div>
          <div className="product-item-price">
            <span v-if="product.discount > 0" className="product-item-price-old mr-2">
              {Number(product.price).toLocaleString()}
              đ
            </span>
            <span className="product-item-price-now bold-text">
              {(Number(product.price) - (Number(product.price) * product.discount)).toLocaleString()}
              {' '}
              đ
            </span>
          </div>

          <span className="product-item-link">
            XEM CHI TIẾT
          </span>
        </div>
      </Link>
    </div>
  );
}

export default ProductItem;
