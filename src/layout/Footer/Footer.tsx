import logo from "../../assets/logo/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./style.scss";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer_column">
          <div className="footer_logo">
            <img src={logo} alt="Logo" className="logo" />
            <h2 className="nav_logo">Triple D</h2>
          </div>
          <div className="social_icons">
            <a href="#" aria-label="Facebook" className="icon_fb">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="icon_tw">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="icon_ins">
              <FaInstagram />
            </a>
            <a href="#" aria-label="Youtube" className="icon_ytb">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="footer_column">
          <h3>Công ty</h3>
          <ul>
            <li>
              <a href="#">Về TripleD</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
            <li>
              <a href="#">Tuyển dụng</a>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          {" "}
          <h3>Sản phẩm</h3>
          <ul>
            <li>
              <a href="#">Đơn vị vận chuyển</a>
            </li>
            <li>
              <a href="#">Phương thức thanh toán</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div className="footer_column">
          {" "}
          <h3>Hỗ trợ</h3>
          <ul>
            <li>
              <a href="#">Liên hệ chúng tôi</a>
            </li>
            <li>
              <a href="#">FAQS</a>
            </li>
            <li>
              <a href="#">Vận chuyển</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
