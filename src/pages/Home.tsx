import '~/assets/styles/pages/home.less';
import LayoutContent from '~/components/LayoutContent';
import SaleProducts from '~/layouts/home/SaleProducts';
import SlideShow from '~/layouts/home/SlideShow';
import Trending from '~/layouts/home/Trending';

function Home() {
  return (
    <LayoutContent className="page-home mb-8">
      <SlideShow />
      <Trending />
      <SaleProducts />
    </LayoutContent>
  );
}

export default Home;
