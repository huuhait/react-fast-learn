import { useSearchParams } from 'react-router-dom';
import Container from '~/components/Container';
import LayoutContent from '~/components/LayoutContent';
import ProductItem from '~/components/ProductItem';
import usePublicStore from '~/stores/public';

function Search() {
  const { products } = usePublicStore.getState();
  const [searchParams] = useSearchParams();

  return (
    <LayoutContent className="my-10">
      <Container>
        <div className="bold-text text-2xl">
          KẾT QUẢ TÌM KIẾM CHO: "
          {(searchParams.get('name') as string).toUpperCase()}
          "
        </div>
      </Container>

      <Container className="flex my-10">
        <div className="grid grid-cols-4 gap-8">
          {products.filter((product) => product.name.toLowerCase().includes((searchParams.get('name') as string).toLowerCase())).map((product) => <ProductItem key={product.id} product={product} />)}
        </div>
      </Container>
    </LayoutContent>
  );
}

export default Search;
