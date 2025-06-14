import logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const Header = () => {
  const navigate = useNavigate();
  const { username, setUsername } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername(null);
    setDropdownOpen(false);  // **đóng dropdown khi logout**
    navigate("/login");
  };


  const handleLogin = () => {
    navigate("/login");
  };

  return (
      <header className="border-b sticky top-0 z-50 bg-white">
        <div className="mx-16 flex items-center justify-between p-4 h-[100px]">
          <div className="flex items-center gap-8">
            <Link to="/" className="logo font-bold text-center text-lg">
              <img
                  src={logo}
                  alt="Triple D Logo"
                  height={50}
                  width={40}
                  className="ml-[14px] -mb-[5px]"
              />
              <p className="">Triple D</p>
            </Link>
            <nav className="hidden md:flex items-center gap-6 ml-[60px]">
              <Link to="/homepage" className="text-xl font-semibold">
                Trang chủ
              </Link>
              <Link to="/product" className="text-xl font-semibold">
                Sản phẩm
              </Link>
              <Link to="/about" className="text-xl font-semibold">
                Dịch vụ
              </Link>
              <Link to="/contact" className="text-xl font-semibold">
                Liên hệ
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-7 relative">
            {/* Giỏ hàng */}
            <div className="relative">
              <Button
                  variant="ghost"
                  onClick={() => navigate("/cart")}
                  className="hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCart className="size-7 text-gray-800" />
              </Button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
              3
            </span>
            </div>

            {/* User / Login */}
            {!username ? (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogin}
                    className="hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
                >
                  <User className="size-7 text-gray-800" />
                </Button>
            ) : (
                <div className="relative">
                  <Button
                      variant="ghost"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="hover:bg-gray-100 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <div className="w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-semibold uppercase">
                      {username?.charAt(0)}
                    </div>

                  </Button>

                  {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-50">
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          Logout
                        </button>
                      </div>
                  )}
                </div>
            )}
          </div>
        </div>
      </header>
  );
};

export default Header;
