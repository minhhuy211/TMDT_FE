"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { API_BASE_URL } from "@/services/api"  // giống như placeOrder


export type OrderStatus = "pending" | "completed" | "shipped" | "cancelled"


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
const orderApi = {
    getOrders: async (): Promise<Order[]> => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_BASE_URL}/order`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            throw new Error("Lỗi khi lấy danh sách đơn hàng")
        }

        return res.json()
    },

    updateOrderStatus: async (id: string, status: OrderStatus): Promise<Order> => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_BASE_URL}/order/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
        })

        if (!res.ok) {
            throw new Error("Không thể cập nhật trạng thái đơn hàng")
        }

        return res.json()
    },

    deleteOrder: async (id: string): Promise<void> => {
        const token = localStorage.getItem("token")
        const res = await fetch(`${API_BASE_URL}/order/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (!res.ok) {
            throw new Error("Không thể xóa đơn hàng")
        }
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
