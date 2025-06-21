import type { Order, Product } from "./dashboard"

export const recentOrders: Order[] = [
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

export const topProducts: Product[] = [
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
