import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./style.scss";

export const Login = () => {
  return (
      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Đăng nhập</h2>
          <Input placeholder="Tên đăng nhập" className="login-input"/>
          <Input type="password" placeholder="Mật khẩu" className="login-input"/>
          <div className="forgot-password">Quên mật khẩu?</div>
          <Button className="login-button">Đăng nhập</Button>
          <div className="register-link">
            <span>Chưa có tài khoản?</span>
            <Link to="/register" className="register-button">Đăng ký</Link>
          </div>
          <div className="social-icons">
            <FaFacebook className="icon facebook"/>
            <FaGoogle className="icon google"/>
            <FaInstagram className="icon instagram"/>
          </div>
        </div>
      </div>
  );
};
