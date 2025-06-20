import logo from "../../assets/logo/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, LogOut, Package, ShoppingCart, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RootState } from "@/redux/store";
import { UserResponse } from "@/model/User";
import userApi from "@/services/userApi";
import { logout } from "@/redux/authSlice";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Lấy trạng thái authenticated từ Redux
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
            {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${user.username}&background=random`}
                      alt={user.username}
                    />
                    <AvatarFallback>
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.username}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.firstName}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/">
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link to="/login"><User/></Link>
            </Button>
          )}
          </div>
        </div>
      </header>
  );
};

export default Header;
