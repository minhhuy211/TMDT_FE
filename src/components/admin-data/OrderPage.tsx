"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function OrderPage() {
    const [search, setSearch] = useState("")

    const orders = [
        { id: "DH001", customer: "Nguyễn Văn A", date: "2024-06-01", total: "2.000.000 ₫", status: "Hoàn thành" },
        { id: "DH002", customer: "Trần Thị B", date: "2024-06-03", total: "1.500.000 ₫", status: "Đang xử lý" },
        { id: "DH003", customer: "Lê Văn C", date: "2024-06-04", total: "3.000.000 ₫", status: "Đã hủy" },
    ]

    const filteredOrders = orders.filter(
        (o) => o.id.toLowerCase().includes(search.toLowerCase()) || o.customer.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>

            <Input
                placeholder="Tìm kiếm đơn hàng..."
                className="w-full md:w-1/3 mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Mã đơn</TableHead>
                        <TableHead>Khách hàng</TableHead>
                        <TableHead>Ngày</TableHead>
                        <TableHead>Tổng tiền</TableHead>
                        <TableHead>Trạng thái</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
