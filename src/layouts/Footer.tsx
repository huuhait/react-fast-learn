import { AtSymbolIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/react/outline';
import Container from '~/components/Container';
import '~/assets/styles/layouts/footer.less';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-body block w-full border-b border-gray-500">
        <Container className="flex">
          <div className="footer-nav flex-1">
            <div className="footer-nav-title bold-text">
              THÔNG TIN LIÊN HỆ
            </div>
            <div className="footer-nav-item text-sm flex">
              <LocationMarkerIcon className="w-4 h-4 mr-1" />
              {' '}
              319 C16 Lý Thường Kiệt, Phường 15, Quận 11, Tp.HCM
            </div>
            <div className="footer-nav-item text-sm flex">
              <PhoneIcon className="w-4 h-4 mr-1" />
              {' '}
              1900.12548
            </div>
            <div className="footer-nav-item text-sm flex">
              <AtSymbolIcon className="w-4 h-4 mr-1" />
              {' '}
              fake@fake.com
            </div>
          </div>
          <div className="footer-nav flex-1">
            <div className="footer-nav-title bold-text">
              LIÊN KẾT
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Giới thiệu</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Đồng hồ nam</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Đồng hồ nữ</a>
            </div>
          </div>
          <div className="footer-nav flex-1">
            <div className="footer-nav-title bold-text">
              HỖ TRỢ
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
          </div>
          <div className="footer-nav flex-1">
            <div className="footer-nav-title bold-text">
              TẢI ỨNG DỤNG TRÊN
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
            <div className="footer-nav-item text-sm flex">
              <a href="#">Example</a>
            </div>
          </div>
        </Container>
      </div>

      <Container className="footer-credit">
        © I ĐÔN NÔ
      </Container>
    </div>
  );
}

export default Footer;
