"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "shipped"

export type Order = {
    id: string
    customer: string
    customerEmail?: string
    customerPhone?: string
    date: string
    total: string
    totalAmount: number
    status: OrderStatus
    items?: number
    paymentMethod?: string
    shippingAddress?: string
    createdAt?: string
    updatedAt?: string
}

// Mock data với nhiều thông tin hơn
const mockOrders: Order[] = [
    {
        id: "DH001",
        customer: "Nguyễn Văn A",
        customerEmail: "nguyenvana@email.com",
        customerPhone: "0901234567",
        date: "2024-06-01",
        total: "2.000.000 ₫",
        totalAmount: 2000000,
        status: "completed",
        items: 3,
        paymentMethod: "Thẻ tín dụng",
        shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        createdAt: "2024-06-01T10:30:00Z",
        updatedAt: "2024-06-01T14:30:00Z",
    },
    {
        id: "DH002",
        customer: "Trần Thị B",
        customerEmail: "tranthib@email.com",
        customerPhone: "0907654321",
        date: "2024-06-03",
        total: "1.500.000 ₫",
        totalAmount: 1500000,
        status: "processing",
        items: 2,
        paymentMethod: "Chuyển khoản",
        shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM",
        createdAt: "2024-06-03T09:15:00Z",
        updatedAt: "2024-06-03T11:20:00Z",
    },
    {
        id: "DH003",
        customer: "Lê Văn C",
        customerEmail: "levanc@email.com",
        customerPhone: "0912345678",
        date: "2024-06-04",
        total: "3.000.000 ₫",
        totalAmount: 3000000,
        status: "cancelled",
        items: 5,
        paymentMethod: "Tiền mặt",
        shippingAddress: "789 Đường DEF, Quận 3, TP.HCM",
        createdAt: "2024-06-04T08:45:00Z",
        updatedAt: "2024-06-04T16:30:00Z",
    },
    {
        id: "DH004",
        customer: "Phạm Thị D",
        customerEmail: "phamthid@email.com",
        customerPhone: "0923456789",
        date: "2024-06-05",
        total: "4.500.000 ₫",
        totalAmount: 4500000,
        status: "shipped",
        items: 4,
        paymentMethod: "Ví điện tử",
        shippingAddress: "321 Đường GHI, Quận 4, TP.HCM",
        createdAt: "2024-06-05T13:20:00Z",
        updatedAt: "2024-06-05T15:45:00Z",
    },
    {
        id: "DH005",
        customer: "Hoàng Văn E",
        customerEmail: "hoangvane@email.com",
        customerPhone: "0934567890",
        date: "2024-06-06",
        total: "1.200.000 ₫",
        totalAmount: 1200000,
        status: "pending",
        items: 1,
        paymentMethod: "Thẻ tín dụng",
        shippingAddress: "654 Đường JKL, Quận 5, TP.HCM",
        createdAt: "2024-06-06T07:30:00Z",
        updatedAt: "2024-06-06T07:30:00Z",
    },
]

// Mock API service
const orderApi = {
    getOrders: async (): Promise<Order[]> => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return mockOrders
    },

    updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const orderIndex = mockOrders.findIndex((o) => o.id === id)
        if (orderIndex === -1) throw new Error("Order not found")

        mockOrders[orderIndex] = {
            ...mockOrders[orderIndex],
            status,
            updatedAt: new Date().toISOString(),
        }
        return mockOrders[orderIndex]
    },

    deleteOrder: async (id: string): Promise<void> => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        const orderIndex = mockOrders.findIndex((o) => o.id === id)
        if (orderIndex === -1) throw new Error("Order not found")

        mockOrders.splice(orderIndex, 1)
    },
}

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Fetch orders
    const fetchOrders = async () => {
        setLoading(true)
        setError(null)
        try {
            const data = await orderApi.getOrders()
            setOrders(data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Lỗi khi tải đơn hàng"
            setError(errorMessage)
            toast.error("Lấy danh sách đơn hàng thất bại")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Update order status
    const updateOrderStatus = async (id: string, status: OrderStatus) => {
        try {
            setLoading(true)
            const updatedOrder = await orderApi.updateOrderStatus(id, status)
            setOrders((prev) => prev.map((order) => (order.id === id ? updatedOrder : order)))
            toast.success("Cập nhật trạng thái đơn hàng thành công")
            return updatedOrder
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Lỗi khi cập nhật đơn hàng"
            toast.error(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // Delete order
    const deleteOrder = async (id: string) => {
        try {
            setLoading(true)
            await orderApi.deleteOrder(id)
            setOrders((prev) => prev.filter((order) => order.id !== id))
            toast.success("Xóa đơn hàng thành công")
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Lỗi khi xóa đơn hàng"
            toast.error(errorMessage)
            throw err
        } finally {
            setLoading(false)
        }
    }

    // Load orders on mount
    useEffect(() => {
        fetchOrders()
    }, [])

    return {
        orders,
        loading,
        error,
        fetchOrders,
        updateOrderStatus,
        deleteOrder,
    }
}
