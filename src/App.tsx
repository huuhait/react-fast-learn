import { useEffect, useState } from 'react';
import {
  Route, Routes,
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

function App() {
  const publicStore = usePublicStore();
  const [loading, setLoading] = useState(() => true);

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
          <Header />
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
          </Routes>
          <Footer />
        </>
      )}
    </Layout>
  );
}

export default App;
