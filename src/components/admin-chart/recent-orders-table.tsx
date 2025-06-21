"use client"

import { Filter, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/components/admin-ts/utils"
import { useTheme } from "next-themes"
import { recentOrders } from "../admin-ts/dashboard-data.ts"

export function RecentOrdersTable() {
    const { theme } = useTheme()

    return (
        <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
            <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <CardTitle className={theme === "dark" ? "text-white" : ""}>Đơn hàng gần đây</CardTitle>
                        <CardDescription>Danh sách các đơn hàng mới nhất</CardDescription>
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
                        <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                            <TableHead className="w-[100px]">Mã đơn</TableHead>
                            <TableHead>Khách hàng</TableHead>
                            <TableHead>Ngày</TableHead>
                            <TableHead className="text-right">Số tiền</TableHead>
                            <TableHead className="text-right">Trạng thái</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentOrders.map((order) => (
                            <TableRow key={order.id} className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell className="text-right">{order.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Badge variant="outline" className="border-0 gap-1 font-normal">
                                        <span className={`w-2 h-2 rounded-full ${order.statusColor}`}></span>
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
                    theme === "dark" ? "border-gray-800" : "border-gray-200",
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
    )
}
