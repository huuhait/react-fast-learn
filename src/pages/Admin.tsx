import { Link, Outlet } from 'react-router-dom';
import LayoutContent from '~/components/LayoutContent';
import '~/assets/styles/pages/admin.less';

function Admin() {
  return (
    <div className="page-admin">
      <div className="admin-layout flex h-screen w-screen overflow-hidden">
        <div className="admin-layout-menu w-64 bg-dark-500-400 h-full">
          <div className="admin-layout-menu-logo">
            <img src="/src/assets/img/logo.png" />
          </div>

          <div className="admin-layout-menu-nav">
            <Link to="/admin/users" className="admin-layout-menu-nav-item bold-text">
              Users
            </Link>
            <Link to="/admin/carts" className="admin-layout-menu-nav-item bold-text">
              Carts
            </Link>
            <Link to="/admin/categories" className="admin-layout-menu-nav-item bold-text">
              Categories
            </Link>
            <Link to="/admin/products" className="admin-layout-menu-nav-item bold-text">
              Products
            </Link>
            <Link to="/admin/slideshow" className="admin-layout-menu-nav-item bold-text">
              Slideshow
            </Link>
          </div>
        </div>
        <LayoutContent className="w-full">
          <div className="admin-layout-content">
            <Outlet />
          </div>
        </LayoutContent>
      </div>
    </div>
  );
}

export default Admin;
