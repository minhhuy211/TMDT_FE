import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <>
      <nav className="header_nav">
        <Link to="/" className="header_nav_item">
          Trang Chủ
        </Link>
        <Link to="/product" className="header_nav_item">
          Sản Phẩm
        </Link>
        <Link to="/about" className="header_nav_item">
          Dịch Vụ
        </Link>
        <Link to="/contact" className="header_nav_item">
          Liên Hệ
        </Link>
      </nav>
    </>
  );
};

export default HeaderNav;
