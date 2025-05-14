import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Register = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 font-serif">Đăng ký</h2>
            <p className="text-sm text-gray-600 font-sans mt-1">Tạo tài khoản mới để bắt đầu</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input placeholder="Tên người dùng" className="w-full text-black" />
            <Input placeholder="Email" className="w-full text-black" />
            <Input type="password" placeholder="Mật khẩu" className="w-full text-black" />
            <Input type="password" placeholder="Nhập lại mật khẩu" className="w-full text-black" />
          </div>

          {/* Submit button */}
          <Button className="w-full bg-black text-white mt-6 hover:bg-gray-800 font-semibold">
            Tạo tài khoản
          </Button>

          {/* Login redirect */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Đã có tài khoản?</span>{" "}
            <Link to="/login" className="text-black hover:underline font-medium">
              Đăng nhập
            </Link>
          </div>

          {/* Social icons */}
          <div className="flex justify-center mt-6 space-x-6 text-xl text-gray-800">
            <FaFacebook className="hover:scale-110 transition-transform cursor-pointer" />
            <FaGoogle className="hover:scale-110 transition-transform cursor-pointer" />
            <FaInstagram className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
      </div>
  );
};
