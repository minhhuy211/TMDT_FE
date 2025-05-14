"use client"

import { ReactNode, useState } from "react"
import { Bar, Pie, Line } from "react-chartjs-2"
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
} from "chart.js"
import {
  Users,
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Settings,
  Bell,
  Grid,
  Layers,
  Calendar,
  Gift,
  HelpCircle,
  Search,
  Download,
  ChevronDown,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange"
import { useMobile } from "@/hooks/useMobile"
import { Outlet, useNavigate } from "react-router-dom"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme, setTheme } = useTheme()
  const isMobile = useMobile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Bar chart data
  const barChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
    datasets: [
      {
        label: "Doanh thu (triệu)",
        data: [35, 15, 55, 35, 45, 25, 30],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderRadius: 6,
        hoverBackgroundColor: "rgba(34, 197, 94, 1)",
      },
    ],
  }

  // Bar chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  }

  // Pie chart data
  const pieChartData = {
    labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"],
    datasets: [
      {
        data: [25, 15, 12, 8, 18, 12, 10],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(251, 191, 36, 0.8)",
          "rgba(234, 88, 12, 0.8)",
          "rgba(6, 182, 212, 0.8)",
          "rgba(219, 39, 119, 0.8)",
          "rgba(132, 204, 22, 0.8)",
          "rgba(124, 58, 237, 0.8)",
        ],
        hoverBackgroundColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(251, 191, 36, 1)",
          "rgba(234, 88, 12, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(219, 39, 119, 1)",
          "rgba(132, 204, 22, 1)",
          "rgba(124, 58, 237, 1)",
        ],
        borderWidth: 0,
      },
    ],
  }

  // Pie chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
  }

  // Line chart data
  const lineChartData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    datasets: [
      {
        label: "Năm nay",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 86, 95, 90, 100],
        borderColor: "rgba(34, 197, 94, 1)",
        backgroundColor: "rgba(34, 197, 94, 0.1)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Năm trước",
        data: [20, 25, 30, 35, 40, 45, 55, 65, 70, 80, 75, 85],
        borderColor: "rgba(99, 102, 241, 1)",
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        tension: 0.3,
        fill: true,
      },
    ],
  }

  // Line chart options
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 12,
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 13,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  }

  // Sample orders data
  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Nguyễn Văn A",
      date: "15/05/2023",
      amount: "2,500,000 ₫",
      status: "Hoàn thành",
      statusColor: "bg-green-500",
    },
    {
      id: "ORD-002",
      customer: "Trần Thị B",
      date: "14/05/2023",
      amount: "1,800,000 ₫",
      status: "Đang xử lý",
      statusColor: "bg-blue-500",
    },
    {
      id: "ORD-003",
      customer: "Lê Văn C",
      date: "13/05/2023",
      amount: "3,200,000 ₫",
      status: "Hoàn thành",
      statusColor: "bg-green-500",
    },
    {
      id: "ORD-004",
      customer: "Phạm Thị D",
      date: "12/05/2023",
      amount: "950,000 ₫",
      status: "Đã hủy",
      statusColor: "bg-red-500",
    },
    {
      id: "ORD-005",
      customer: "Hoàng Văn E",
      date: "11/05/2023",
      amount: "4,100,000 ₫",
      status: "Hoàn thành",
      statusColor: "bg-green-500",
    },
  ]

  // Sample products data
  const topProducts = [
    {
      name: "Điện thoại iPhone 14 Pro Max",
      category: "Điện thoại",
      sales: 120,
      revenue: "3,600,000,000 ₫",
      growth: 15,
      positive: true,
    },
    {
      name: "Laptop MacBook Pro M2",
      category: "Laptop",
      sales: 85,
      revenue: "2,975,000,000 ₫",
      growth: 8,
      positive: true,
    },
    {
      name: "Tai nghe AirPods Pro",
      category: "Phụ kiện",
      sales: 210,
      revenue: "1,260,000,000 ₫",
      growth: 25,
      positive: true,
    },
    {
      name: "Samsung Galaxy S23 Ultra",
      category: "Điện thoại",
      sales: 95,
      revenue: "2,375,000,000 ₫",
      growth: 5,
      positive: true,
    },
    {
      name: "iPad Pro 12.9",
      category: "Máy tính bảng",
      sales: 65,
      revenue: "1,625,000,000 ₫",
      growth: -3,
      positive: false,
    },
  ]

  return (
    <div className={cn("flex min-h-screen", theme === "dark" ? "bg-gray-950" : "bg-gray-50")}>
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className={cn(
            "fixed z-50 bottom-4 right-4 p-3 rounded-full shadow-lg",
            theme === "dark" ? "bg-gray-800" : "bg-white",
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
          theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
          "border-r shadow-sm",
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0",
        )}
      >
        <div
          className={cn(
            "h-16 flex items-center px-6 border-b",
            theme === "dark" ? "border-gray-800" : "border-gray-200",
          )}
        >
          <div className="flex items-center gap-2 font-semibold text-xl">
            <div
              className={cn(
                "flex items-center justify-center h-8 w-8 rounded",
                "bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold",
              )}
            >
              TD
            </div>
            <span className={theme === "dark" ? "text-white" : "text-gray-900"}>Triple D</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <SidebarItem icon={<BarChart3 size={20} />} label="Thống kê" active={true} to="/admin"/>
          <SidebarItem icon={<Users size={20} />} label="Khách hàng" to="/admin/customer"/>
          <SidebarItem icon={<ShoppingCart size={20} />} label="Đơn hàng" to="/admin"/>
          <SidebarItem icon={<Layers size={20} />} label="Danh mục" to="/admin"/>
          <SidebarItem icon={<Gift size={20} />} label="Ưu đãi" to="/admin"/>
          <SidebarItem icon={<Calendar size={20} />} label="Lịch" to="/admin"/>
          <SidebarItem icon={<HelpCircle size={20} />} label="Hỗ trợ khách hàng" to="/admin"/>

          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
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
          </div>
        </nav>
        <div className={cn("p-4 border-t", theme === "dark" ? "border-gray-800" : "border-gray-200")}>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <div>
              <p className={cn("text-sm font-medium", theme === "dark" ? "text-white" : "text-gray-900")}>Admin User</p>
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
            theme === "dark" ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200",
          )}
        >
          <div className="flex items-center gap-4">
            <h1 className={cn("text-xl font-semibold md:hidden", theme === "dark" ? "text-white" : "text-gray-900")}>
              Triple D
            </h1>
            <div className="hidden md:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Tìm kiếm..."
                className={cn(
                  "pl-10 w-64",
                  theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200",
                )}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className={cn("relative", theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600")}
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600"}
            >
              <Grid size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600"}
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
                  <span className={cn("hidden md:inline text-sm", theme === "dark" ? "text-white" : "text-gray-900")}>
                    Admin
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
                <DropdownMenuItem>Cài đặt tài khoản</DropdownMenuItem>
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <Outlet />
      </div>
      
    </div>
  )
}

type SidebarLinkItemProps = {
    icon: ReactNode
    label: string
    active?: boolean
    to: string
  }
// Sidebar item component
function SidebarItem({ icon , label, active = false, to }:SidebarLinkItemProps) {
  const { theme } = useTheme()
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
            : "text-gray-600 hover:bg-gray-100",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

// Stats card data type
type StatsCardProps = {
  icon: ReactNode
  title: string
  value: string
  change: string
  trend: "up" | "down"
  bgColor: string
}

// Stats card component
function StatsCard({ icon, title, value, change, trend, bgColor }: StatsCardProps) {
  const { theme } = useTheme()

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        theme === "dark" ? "bg-gray-900 border-gray-800" : "",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-3 rounded-lg", bgColor)}>{icon}</div>
          <div className={cn("flex items-center gap-1", trend === "up" ? "text-green-500" : "text-red-500")}>
            {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <div>
          <p className={cn("text-sm font-medium", theme === "dark" ? "text-gray-400" : "text-gray-500")}>{title}</p>
          <h4 className={cn("text-2xl font-bold mt-1", theme === "dark" ? "text-white" : "text-gray-900")}>{value}</h4>
        </div>
      </CardContent>
    </Card>
  )
}
