import { ReactNode, useState } from "react";
import { Bar, Pie, Line } from "react-chartjs-2";
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
  Package,
  ShoppingCart,
  DollarSign,
  BarChart3,
  Download,
  ChevronDown,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

import { DatePickerWithRange } from "@/components/ui/DatePickerWithRange";

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

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { theme, setTheme } = useTheme();

  // Bar chart data
  const barChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
    ],
    datasets: [
      {
        label: "Doanh thu (triệu)",
        data: [35, 15, 55, 35, 45, 25, 30],
        backgroundColor: "rgba(34, 197, 94, 0.8)",
        borderRadius: 6,
        hoverBackgroundColor: "rgba(34, 197, 94, 1)",
      },
    ],
  };

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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  };

  // Pie chart data
  const pieChartData = {
    labels: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
    ],
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
  };

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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
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
  };

  // Line chart data
  const lineChartData = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
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
  };

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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 12,
          },
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
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
          color:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.7)"
              : "rgba(0, 0, 0, 0.7)",
        },
      },
    },
  };

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
  ];

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
  ];

  return (
    <div className="p-6">
      <Tabs
        defaultValue="overview"
        className="space-y-6"
        onValueChange={setActiveTab}
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Xem tổng quan về hoạt động kinh doanh của bạn
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <DatePickerWithRange className="w-full sm:w-auto" />
            <TabsList>
              <TabsTrigger value="overview">Tổng quan</TabsTrigger>
              <TabsTrigger value="analytics">Phân tích</TabsTrigger>
              <TabsTrigger value="reports">Báo cáo</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              icon={<Users className="h-6 w-6 text-indigo-600" />}
              title="Khách hàng"
              value="1,260"
              change="+12.5%"
              trend="up"
              bgColor="bg-indigo-50 dark:bg-indigo-950/40"
            />
            <StatsCard
              icon={<Package className="h-6 w-6 text-amber-600" />}
              title="Sản phẩm"
              value="186,900"
              change="+8.2%"
              trend="up"
              bgColor="bg-amber-50 dark:bg-amber-950/40"
            />
            <StatsCard
              icon={<ShoppingCart className="h-6 w-6 text-emerald-600" />}
              title="Đơn hàng"
              value="1,108"
              change="+5.4%"
              trend="up"
              bgColor="bg-emerald-50 dark:bg-emerald-950/40"
            />
            <StatsCard
              icon={<DollarSign className="h-6 w-6 text-rose-600" />}
              title="Doanh Thu"
              value="186,900,000"
              change="+15.3%"
              trend="up"
              bgColor="bg-rose-50 dark:bg-rose-950/40"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card
              className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>
                      Doanh thu từng tháng
                    </CardTitle>
                    <CardDescription>
                      Biểu đồ doanh thu theo tháng trong năm
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xuất PNG</DropdownMenuItem>
                      <DropdownMenuItem>Xuất PDF</DropdownMenuItem>
                      <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Bar data={barChartData} options={barChartOptions} />
                </div>
              </CardContent>
            </Card>

            <Card
              className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>
                      Phân bổ doanh thu
                    </CardTitle>
                    <CardDescription>
                      Tỷ lệ doanh thu theo tháng
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Xuất PNG</DropdownMenuItem>
                      <DropdownMenuItem>Xuất PDF</DropdownMenuItem>
                      <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <Pie data={pieChartData} options={pieChartOptions} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Orders Table */}
          <Card
            className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>
                    Đơn hàng gần đây
                  </CardTitle>
                  <CardDescription>
                    Danh sách các đơn hàng mới nhất
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter size={14} className="mr-2" />
                    Lọc
                  </Button>
                  <Button variant="outline" size="sm" className="h-8">
                    <Download size={14} className="mr-2" />
                    Xuất
                  </Button>
                  <Button size="sm" className="h-8">
                    Xem tất cả
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow
                    className={
                      theme === "dark"
                        ? "border-gray-800 hover:bg-gray-800/50"
                        : ""
                    }
                  >
                    <TableHead className="w-[100px]">Mã đơn</TableHead>
                    <TableHead>Khách hàng</TableHead>
                    <TableHead>Ngày</TableHead>
                    <TableHead className="text-right">Số tiền</TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className={
                        theme === "dark"
                          ? "border-gray-800 hover:bg-gray-800/50"
                          : ""
                      }
                    >
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customer}</TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell className="text-right">
                        {order.amount}
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant="outline"
                          className="border-0 gap-1 font-normal"
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${order.statusColor}`}
                          ></span>
                          {order.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter
              className={cn(
                "flex items-center justify-between border-t pt-4",
                theme === "dark" ? "border-gray-800" : "border-gray-200"
              )}
            >
              <p className="text-sm text-gray-500">Hiển thị 5 / 25 đơn hàng</p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Trước
                </Button>
                <Button variant="outline" size="sm">
                  Tiếp
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Top Products */}
          <Card
            className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
          >
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>
                    Sản phẩm bán chạy
                  </CardTitle>
                  <CardDescription>
                    Top sản phẩm có doanh số cao nhất
                  </CardDescription>
                </div>
                <Button size="sm" className="h-8 w-full sm:w-auto">
                  Xem tất cả sản phẩm
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow
                    className={
                      theme === "dark"
                        ? "border-gray-800 hover:bg-gray-800/50"
                        : ""
                    }
                  >
                    <TableHead>Sản phẩm</TableHead>
                    <TableHead>Danh mục</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                    <TableHead className="text-right">Doanh thu</TableHead>
                    <TableHead className="text-right">Tăng trưởng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow
                      key={index}
                      className={
                        theme === "dark"
                          ? "border-gray-800 hover:bg-gray-800/50"
                          : ""
                      }
                    >
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">
                        {product.sales}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.revenue}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          {product.positive ? (
                            <ArrowUpRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-500" />
                          )}
                          <span
                            className={
                              product.positive
                                ? "text-green-500"
                                : "text-red-500"
                            }
                          >
                            {product.positive ? "+" : ""}
                            {product.growth}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card
            className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>
                    Phân tích doanh thu
                  </CardTitle>
                  <CardDescription>
                    So sánh doanh thu năm nay với năm trước
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Xuất
                      <ChevronDown size={16} className="ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Xuất PNG</DropdownMenuItem>
                    <DropdownMenuItem>Xuất PDF</DropdownMenuItem>
                    <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line data={lineChartData} options={lineChartOptions} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
            >
              <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>
                  Phân tích khách hàng
                </CardTitle>
                <CardDescription>
                  Thông tin về khách hàng của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Khách hàng mới
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      245
                    </span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Khách hàng quay lại
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      568
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Tỷ lệ chuyển đổi
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      3.2%
                    </span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Khách hàng VIP
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      128
                    </span>
                  </div>
                  <Progress value={25} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card
              className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
            >
              <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>
                  Phân tích sản phẩm
                </CardTitle>
                <CardDescription>Thông tin về sản phẩm của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Điện thoại
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      42%
                    </span>
                  </div>
                  <Progress value={42} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Laptop
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      28%
                    </span>
                  </div>
                  <Progress value={28} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Phụ kiện
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      18%
                    </span>
                  </div>
                  <Progress value={18} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      Máy tính bảng
                    </span>
                    <span
                      className={
                        theme === "dark"
                          ? "text-white font-medium"
                          : "text-gray-900 font-medium"
                      }
                    >
                      12%
                    </span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card
            className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}
          >
            <CardHeader>
              <CardTitle className={theme === "dark" ? "text-white" : ""}>
                Báo cáo
              </CardTitle>
              <CardDescription>Tạo và quản lý các báo cáo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="w-full justify-start">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Báo cáo doanh thu
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Báo cáo khách hàng
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="mr-2 h-4 w-4" />
                    Báo cáo sản phẩm
                  </Button>
                </div>
                <div className="pt-4">
                  <h3
                    className={cn(
                      "text-lg font-medium mb-4",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}
                  >
                    Báo cáo đã lưu
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow
                        className={
                          theme === "dark"
                            ? "border-gray-800 hover:bg-gray-800/50"
                            : ""
                        }
                      >
                        <TableHead>Tên báo cáo</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow
                        className={
                          theme === "dark"
                            ? "border-gray-800 hover:bg-gray-800/50"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          Báo cáo doanh thu Q1 2023
                        </TableCell>
                        <TableCell>Doanh thu</TableCell>
                        <TableCell>01/04/2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Xem
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        className={
                          theme === "dark"
                            ? "border-gray-800 hover:bg-gray-800/50"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          Phân tích khách hàng tháng 5
                        </TableCell>
                        <TableCell>Khách hàng</TableCell>
                        <TableCell>01/06/2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Xem
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        className={
                          theme === "dark"
                            ? "border-gray-800 hover:bg-gray-800/50"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          Top sản phẩm bán chạy 2023
                        </TableCell>
                        <TableCell>Sản phẩm</TableCell>
                        <TableCell>15/06/2023</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Xem
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Dashboard;

// Stats card data type
type StatsCardProps = {
  icon: ReactNode;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  bgColor: string;
};

// Stats card component
function StatsCard({
  icon,
  title,
  value,
  change,
  trend,
  bgColor,
}: StatsCardProps) {
  const { theme } = useTheme();

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        theme === "dark" ? "bg-gray-900 border-gray-800" : ""
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn("p-3 rounded-lg", bgColor)}>{icon}</div>
          <div
            className={cn(
              "flex items-center gap-1",
              trend === "up" ? "text-green-500" : "text-red-500"
            )}
          >
            {trend === "up" ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{change}</span>
          </div>
        </div>
        <div>
          <p
            className={cn(
              "text-sm font-medium",
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            )}
          >
            {title}
          </p>
          <h4
            className={cn(
              "text-2xl font-bold mt-1",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}
          >
            {value}
          </h4>
        </div>
      </CardContent>
    </Card>
  );
}
