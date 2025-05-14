import logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Navigate to the login page
    navigate("/login");
  }
  return (
    <>
      <header className="border-b sticky top-0 z-50 bg-white">
        <div className="mx-16 flex items-center justify-between p-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-xl">
              <img src={logo} alt="Triple D Logo" width={40} height={40} />
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/homepage" className="text-sm font-medium">
                Trang chủ
              </Link>
              <Link to="/product" className="text-sm font-medium">
                Sản phẩm
              </Link>
              <Link to="/about" className="text-sm font-medium">
                Dịch vụ
              </Link>
              <Link to="/contact" className="text-sm font-medium">
                Liên hệ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {/* Nút giỏ hàng */}
            <div className="relative">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigate("/cart")}
                  className="hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCart className="h-5 w-5 text-gray-800" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
      3
    </span>
            </div>

            {/* Nút đăng nhập / người dùng */}
            <Button
                variant="ghost"
                size="icon"
                onClick={handleLogin}
                className="hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
            >
              <User className="h-5 w-5 text-gray-800" />
            </Button>
          </div>

        </div>
      </header>
    </>
  );
};

export default Header;
