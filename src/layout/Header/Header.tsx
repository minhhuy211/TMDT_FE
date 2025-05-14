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
              <Link to="#" className="text-sm font-medium">
                Trang chủ
              </Link>
              <Link to="#" className="text-sm font-medium">
                Sản phẩm
              </Link>
              <Link to="#" className="text-sm font-medium">
                Dịch vụ
              </Link>
              <Link to="#" className="text-sm font-medium">
                Liên hệ
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogin}>
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
