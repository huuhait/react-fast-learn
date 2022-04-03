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
import Product from '~/pages/Product';
import Search from '~/pages/Search';
import usePublicStore from '~/stores/public';
import Admin from './pages/Admin';
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
              <Route path=":id" element={<Product />} />
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
            </Route>
          </Routes>
          {pathname.includes('/admin') ? null : <Footer />}
        </>
      )}
    </Layout>
  );
}

export default App;
