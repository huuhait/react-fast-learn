import '~/assets/styles/pages/home.less';
import LayoutContent from '~/components/LayoutContent';
import SaleProducts from '~/layouts/home/SaleProducts';
import SlideShow from '~/layouts/home/SlideShow';

function Home() {
  return (
    <LayoutContent className="page-home mb-8">
      <SlideShow />
      <SaleProducts />
    </LayoutContent>
  );
}

export default Home;
