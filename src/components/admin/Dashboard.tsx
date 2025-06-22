"use client"

import { useState } from "react"
import { Line } from "react-chartjs-2"
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

import { Users, Package, ShoppingCart, DollarSign, BarChart3, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Progress } from "../ui/progress"
import { cn } from "../admin-ts/utils"
import { useTheme } from "next-themes"
import { DatePickerWithRange } from "../ui/DatePickerWithRange"


import DesignManager from "../admin-data/DesignManager"

import StatsCard from "./StatsCard"
import { RevenueChart } from "../admin-chart/revenue-chart"
import { RevenueDistributionChart } from "../admin-chart/revenue-distribution-chart"
import { RecentOrdersTable } from "../admin-chart/recent-orders-table"
import { TopProductsTable } from "../admin-data/top-products-table"
import { getLineChartData, getChartOptions } from "../admin-ts/chart-config"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { theme } = useTheme()

  const lineChartData = getLineChartData()
  const chartOptions = getChartOptions(theme)

  return (
      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Xem tổng quan về hoạt động kinh doanh của bạn</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <DatePickerWithRange className="w-full sm:w-auto" />
              <TabsList>

                <TabsTrigger value="overview">Tổng quan</TabsTrigger>
                <TabsTrigger value="analytics">Phân tích</TabsTrigger>
                <TabsTrigger value="reports">Báo cáo</TabsTrigger>
                <TabsTrigger value="designs">Thiết kế</TabsTrigger>

              </TabsList>
            </div>
          </div>
          <TabsContent value="designs" className="space-y-6">
            <DesignManager />
          </TabsContent>

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
              <RevenueChart />
              <RevenueDistributionChart />
            </div>

            {/* Tables */}
            <RecentOrdersTable />
            <TopProductsTable />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>Phân tích doanh thu</CardTitle>
                    <CardDescription>So sánh doanh thu năm nay với năm trước</CardDescription>
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
                  <Line data={lineChartData} options={chartOptions.line} />
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Phân tích khách hàng</CardTitle>
                  <CardDescription>Thông tin về khách hàng của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Khách hàng mới</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      245
                    </span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Khách hàng quay lại</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      568
                    </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Tỷ lệ chuyển đổi</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      3.2%
                    </span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Khách hàng VIP</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      128
                    </span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Phân tích sản phẩm</CardTitle>
                  <CardDescription>Thông tin về sản phẩm của bạn</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Điện thoại</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      42%
                    </span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Laptop</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      28%
                    </span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Phụ kiện</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                      18%
                    </span>
                    </div>
                    <Progress value={18} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Máy tính bảng</span>
                      <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
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
            <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
              <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>Báo cáo</CardTitle>
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
                    <h3 className={cn("text-lg font-medium mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
                      Báo cáo đã lưu
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                          <TableHead>Tên báo cáo</TableHead>
                          <TableHead>Loại</TableHead>
                          <TableHead>Ngày tạo</TableHead>
                          <TableHead className="text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                          <TableCell className="font-medium">Báo cáo doanh thu Q1 2023</TableCell>
                          <TableCell>Doanh thu</TableCell>
                          <TableCell>01/04/2023</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Xem
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                          <TableCell className="font-medium">Phân tích khách hàng tháng 5</TableCell>
                          <TableCell>Khách hàng</TableCell>
                          <TableCell>01/06/2023</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              Xem
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                          <TableCell className="font-medium">Top sản phẩm bán chạy 2023</TableCell>
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
  )
}
