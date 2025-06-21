"use client"

import { useEffect, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/components/admin-ts/utils"

interface Customer {
    id: string
    name: string
    email: string
    phone: string
    totalOrders: number
    status: "active" | "inactive"
}

export default function CustomerPage() {
    const [customers, setCustomers] = useState<Customer[]>([])

    useEffect(() => {
        // Giả lập fetch data
        setCustomers([
            {
                id: "CUS001",
                name: "Nguyễn Văn A",
                email: "a@example.com",
                phone: "0909123456",
                totalOrders: 12,
                status: "active",
            },
            {
                id: "CUS002",
                name: "Trần Thị B",
                email: "b@example.com",
                phone: "0911223344",
                totalOrders: 5,
                status: "inactive",
            },
            {
                id: "CUS003",
                name: "Lê Văn C",
                email: "c@example.com",
                phone: "0988776655",
                totalOrders: 20,
                status: "active",
            },
        ])
    }, [])

    return (
        <div className="p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách khách hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Tên khách hàng</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Điện thoại</TableHead>
                                <TableHead>Đơn hàng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow key={customer.id}>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.name}</TableCell>
                                    <TableCell>{customer.email}</TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell>{customer.totalOrders}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={customer.status === "active" ? "default" : "destructive"}
                                            className={cn(customer.status === "active" ? "bg-green-500" : "bg-red-500")}
                                        >
                                            {customer.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="outline">
                                            Chi tiết
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
