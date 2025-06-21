"use client"

import { ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useTheme } from "next-themes"
import { topProducts } from "../admin-ts/dashboard-data.ts"

export function TopProductsTable() {
    const { theme } = useTheme()

    return (
        <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
    <CardHeader className="pb-2">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
    <div>
        <CardTitle className={theme === "dark" ? "text-white" : ""}>Sản phẩm bán chạy</CardTitle>
    <CardDescription>Top sản phẩm có doanh số cao nhất</CardDescription>
    </div>
    <Button size="sm" className="h-8 w-full sm:w-auto">
        Xem tất cả sản phẩm
    </Button>
    </div>
    </CardHeader>
    <CardContent>
    <Table>
        <TableHeader>
            <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
    <TableHead>Sản phẩm</TableHead>
    <TableHead>Danh mục</TableHead>
    <TableHead className="text-right">Số lượng</TableHead>
    <TableHead className="text-right">Doanh thu</TableHead>
    <TableHead className="text-right">Tăng trưởng</TableHead>
    </TableRow>
    </TableHeader>
    <TableBody>
    {topProducts.map((product, index) => (
            <TableRow key={index} className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
    <TableCell className="font-medium">{product.name}</TableCell>
        <TableCell>{product.category}</TableCell>
        <TableCell className="text-right">{product.sales}</TableCell>
        <TableCell className="text-right">{product.revenue}</TableCell>
        <TableCell className="text-right">
    <div className="flex items-center justify-end gap-1">
        {product.positive ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
        <span className={product.positive ? "text-green-500" : "text-red-500"}>
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
)
}
