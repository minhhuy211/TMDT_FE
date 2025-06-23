import { ReactNode, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import {
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Grid,
  Layers,
  Search,
  ChevronDown,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/components/admin-ts/utils";
import { useTheme } from "next-themes";

import { useMobile } from "@/components/admin-data/hooks/useMobile";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { logout } from "@/redux/authSlice";
import { FaBox } from "react-icons/fa";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

export default function Dashboard() {
  const { theme, setTheme } = useTheme();
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    queryClient.removeQueries({ queryKey: ["me"] });
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "flex min-h-screen",
        theme === "dark" ? "bg-gray-950" : "bg-gray-50"
      )}
    >
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className={cn(
            "fixed z-50 bottom-4 right-4 p-3 rounded-full shadow-lg",
            theme === "dark" ? "bg-gray-800" : "bg-white"
          )}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "w-64 flex-col fixed inset-y-0 z-40 transition-all duration-300 ease-in-out",
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200",
          "border-r shadow-sm",
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        )}
      >
        <div
          className={cn(
            "h-16 flex items-center px-6 border-b",
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          )}
        >
          <div className="flex items-center gap-2 font-semibold text-xl">
            <div
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded",
                "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold"
              )}
            >
              TD
            </div>
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
              Triple D
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem
            icon={<BarChart3 size={20} />}
            label="Thống kê"
            active={true}
            to="/admin"
          />
          <SidebarItem
            icon={<Users size={20} />}
            label="Người dùng"
            to="/admin/user"
          />
          <SidebarItem
            icon={<ShoppingCart size={20} />}
            label="Đơn hàng"
            to="/admin/order"
          />
          <SidebarItem
            icon={<Layers size={20} />}
            label="Danh mục"
            to="/admin/category"
          />
          <SidebarItem
            icon={<FaBox size={20} />}
            label="Sản phẩm"
            to="/admin/product"
          />

          {/* <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Cài đặt
              </h3>
              <SidebarItem icon={<Settings size={20} />} label="Cài đặt hệ thống" to="/admin"/>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className={cn("text-sm", theme === "dark" ? "text-gray-400" : "text-gray-600")}>Chế độ tối</span>
                  <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="h-8 w-8"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                </div>
              </div>
            </div> */}
        </nav>
        <div
          className={cn(
            "p-4 border-t",
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}
              >
                Admin User
              </p>
              <p className="text-xs text-gray-500">admin@tripled.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn("flex-1", isMobile ? "ml-0" : "ml-64")}>
        {/* Header */}
        <header
          className={cn(
            "h-16 border-b sticky top-0 z-30 flex items-center justify-between px-6",
            theme === "dark"
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
          )}
        >
          <div className="flex items-center gap-4">
            <h1
              className={cn(
                "text-xl font-semibold md:hidden",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Triple D
            </h1>
            <div className="hidden md:flex relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <Input
                placeholder="Tìm kiếm..."
                className={cn(
                  "pl-10 w-64",
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "relative",
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600"
              )}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600"
              }
            >
              <Grid size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={
                theme === "dark"
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600"
              }
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <div className="hidden md:block h-8 w-px bg-gray-300 dark:bg-gray-700 mx-1"></div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span
                    className={cn(
                      "hidden md:inline text-sm",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    Admin
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Outlet />
      </div>
    </div>
  );
}

type SidebarLinkItemProps = {
  icon: ReactNode;
  label: string;
  active?: boolean;
  to: string;
};
// Sidebar item component
function SidebarItem({
  icon,
  label,
  active = false,
  to,
}: SidebarLinkItemProps) {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(to);
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md w-full transition-colors",
        active
          ? theme === "dark"
            ? "bg-green-900/30 text-green-500 font-medium"
            : "bg-green-50 text-green-600 font-medium"
          : theme === "dark"
          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
