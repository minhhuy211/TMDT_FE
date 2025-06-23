import logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, LogOut, Package } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RootState } from "@/redux/store";
import { UserResponse } from "@/model/User";
import userApi from "@/services/userApi";
import { logout } from "@/redux/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_BASE_URL } from "@/services/api";
import { selectCartCount } from "@/redux/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const cartCount = useSelector(selectCartCount);
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const { data: user } = useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: userApi.getMyInfo,
    enabled: authenticated,
    refetchOnWindowFocus: false,
  });

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["me"] });
    navigate("/login");
  };

  return (
      <header className="border-b sticky top-0 z-50 bg-white shadow-sm">
        <div className="relative max-w-7xl mx-auto flex items-center justify-between px-6 py-4 h-[100px]">
          {/* Logo bên trái */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl z-10">
            <img src={logo} alt="Triple D Logo" className="w-10 h-auto"/>
            <span className="text-black">Triple D</span>
          </Link>

          {/* Navigation ở giữa */}
          <nav
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:flex items-center gap-10  ">
            <Link to="/homepage" className="text-lg font-semibold hover:text-black text-gray-700 px-2">
              Trang chủ
            </Link>
            <Link to="/product" className="text-lg font-semibold hover:text-black text-gray-700 px-2">
              Sản phẩm
            </Link>
            <Link to="/productCustom" className="text-lg font-semibold hover:text-black text-gray-700 px-2">
              Thiết kế
            </Link>
            <Link to="/contact" className="text-lg font-semibold hover:text-black text-gray-700 px-2">
              Liên hệ
            </Link>
          </nav>

          {/* Giỏ hàng + Tài khoản bên phải */}
          <div className="flex items-center gap-6 z-10">
            {/* Giỏ hàng */}
            <div className="relative">
              <Button variant="ghost" onClick={() => navigate("/cart")} className="p-0 hover:bg-transparent">
                <ShoppingCart className="size-6 text-gray-800"/>
              </Button>
              {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
            {cartCount}
          </span>
              )}
            </div>

            {/* Người dùng */}
            {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-10 w-10 p-0 rounded-full">
                      <Avatar className="h-10 w-10 rounded-full border bg-gray-100">
                        <AvatarImage
                            src={
                              user.avatarUrl
                                  ? user.avatarUrl.startsWith("http")
                                      ? user.avatarUrl
                                      : `${API_BASE_URL}${user.avatarUrl}`
                                  : `https://ui-avatars.com/api/?name=${user.username}&background=random`
                            }
                            alt={user.username}
                            className="object-cover w-full h-full"
                        />
                        <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/profile">
                          <User className="mr-2 h-4 w-4"/> Hồ sơ
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/order-history">
                          <Package className="mr-2 h-4 w-4"/> Đơn hàng
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4"/> Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <Button asChild variant="outline">
                  <Link to="/login">
                    <User className="mr-1 h-5 w-5"/> Đăng nhập
                  </Link>
                </Button>
            )}
          </div>
        </div>
      </header>

  );
};

export default Header;