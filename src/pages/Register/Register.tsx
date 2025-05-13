import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import "./style.scss";

export const Register = () => {
  return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Đăng ký</h2>
          <Input placeholder="Tên người dùng" className="login-input" />
          <Input placeholder="Email" className="login-input" />
          <Input type="password" placeholder="Mật khẩu" className="login-input" />
          <Input type="password" placeholder="Nhập lại mật khẩu" className="login-input" />

          <Button className="login-button">Tạo tài khoản</Button>

          <div className="register-link">
            <span>Đã có tài khoản?</span>
            <a href="/login" className="register-button">Đăng nhập</a>
          </div>

          <div className="social-icons">
            <FaFacebook className="icon facebook" />
            <FaGoogle className="icon google" />
            <FaInstagram className="icon instagram" />
          </div>
        </div>
      </div>
  );
};
