import { useEffect, useState } from 'react';
import {
  Route, Routes, useLocation,
} from 'react-router-dom';
import Layout from '~/components/Layout';
import Footer from '~/layouts/Footer';
import Header from '~/layouts/Header';
import DanhMuc from '~/pages/DanhMuc';
import GioHang from '~/pages/GioHang';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import ProductInfo from '~/pages/Product';
import Search from '~/pages/Search';
import usePublicStore from '~/stores/public';
import Admin from './pages/Admin';
import Product from './pages/admin/product/Product';
import Products from './pages/admin/Products';
import SlideShows from './pages/admin/SlideShow';
import SlideShow from './pages/admin/slideshow/SlideShow';
import User from './pages/admin/user/User';
import Users from './pages/admin/Users';

function App() {
  const publicStore = usePublicStore();
  const [loading, setLoading] = useState(() => true);

  const { pathname } = useLocation();

  useEffect(() => {
    (async function () {
      setLoading(true);

      await Promise.all([
        publicStore.fetchProducts(),
        publicStore.fetchCategories(),
        publicStore.fetchSlideShow(),
      ]);

      setLoading(false);
    }());
  }, []);

  return (
    <Layout>
      {loading ? 'Loading...' : (
        <>
          {pathname.includes('/admin') ? null : <Header />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/danh-muc">
              <Route path=":danhmuc" element={<DanhMuc />} />
            </Route>
            <Route path="/product">
              <Route path=":id" element={<ProductInfo />} />
            </Route>
            <Route path="/gio-hang" element={<GioHang />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<Search />} />
            <Route path="/admin" element={<Admin />}>
              <Route path="users">
                <Route path="" element={<Users />} />
                <Route path="create" element={<User type="create" />} />
                <Route path=":id" element={<User type="update" />} />
              </Route>
              <Route path="products">
                <Route path="" element={<Products />} />
                <Route path="create" element={<Product type="create" />} />
                <Route path=":id" element={<Product type="update" />} />
              </Route>
              <Route path="slideshow">
                <Route path="" element={<SlideShows />} />
                <Route path="create" element={<SlideShow type="create" />} />
                <Route path=":id" element={<SlideShow type="update" />} />
              </Route>
            </Route>
          </Routes>
          {pathname.includes('/admin') ? null : <Footer />}
        </>
      )}
    </Layout>
  );
}

export default App;
