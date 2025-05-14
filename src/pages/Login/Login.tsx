import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram, FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaPrint className="text-black text-xl" />
              <h3 className="text-lg font-bold text-black font-mono">CustomPrint</h3>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 font-serif">Welcome Back</h2>
            <p className="text-sm text-gray-600 font-sans mt-1">Đăng nhập để tiếp tục</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <Input placeholder="Tên đăng nhập" className="w-full text-black" />
            <Input type="password" placeholder="Mật khẩu" className="w-full text-black" />
          </div>

          {/* Forgot password */}
          <div className="text-right text-sm text-gray-700 hover:underline mt-2 cursor-pointer">
            Quên mật khẩu?
          </div>

          {/* Login button */}
          <Button className="w-full bg-black text-white mt-4 hover:bg-gray-800 font-semibold">
            Đăng nhập
          </Button>

          {/* Register link */}
          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Chưa có tài khoản?</span>{" "}
            <Link to="/register" className="text-black hover:underline font-medium">
              Đăng ký
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center mt-6 space-x-6 text-xl text-gray-800">
            <FaFacebook className="hover:scale-110 transition-transform cursor-pointer" />
            <FaGoogle className="hover:scale-110 transition-transform cursor-pointer" />
            <FaInstagram className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
      </div>
  );
};
