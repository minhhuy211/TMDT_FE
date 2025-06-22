"use client"

import { useState, useMemo } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, X, Filter, RefreshCw, ShoppingCart, DollarSign, Eye, Trash, Download } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import { useOrders, type Order, type OrderStatus } from "./hooks/use-orders"

// Search Input Component
function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                placeholder="Tìm kiếm theo mã đơn, khách hàng..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-10"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => onChange("")}
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </div>
    )
}

// Order Detail Dialog
function OrderDetailDialog({
                               order,
                               isOpen,
                               onClose,
                           }: {
    order?: Order
    isOpen: boolean
    onClose: () => void
}) {
    if (!order) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Chi tiết đơn hàng {order.id}</DialogTitle>
                    <DialogDescription>Thông tin chi tiết về đơn hàng</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Khách hàng</label>
                            <p className="font-medium">{order.customer}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Email</label>
                            <p className="text-sm">{order.customerEmail || "N/A"}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Số điện thoại</label>
                            <p className="text-sm">{order.customerPhone || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Số sản phẩm</label>
                            <p className="text-sm">{order.items || 0} sản phẩm</p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-500">Địa chỉ giao hàng</label>
                        <p className="text-sm">{order.shippingAddress || "N/A"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Phương thức thanh toán</label>
                            <p className="text-sm">{order.paymentMethod || "N/A"}</p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Tổng tiền</label>
                            <p className="text-lg font-bold text-green-600">{order.total}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-500">Ngày tạo</label>
                            <p className="text-sm">
                                {order.createdAt ? new Date(order.createdAt).toLocaleString("vi-VN") : order.date}
                            </p>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-500">Cập nhật lần cuối</label>
                            <p className="text-sm">{order.updatedAt ? new Date(order.updatedAt).toLocaleString("vi-VN") : "N/A"}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Delete Confirmation Dialog
function DeleteDialog({
                          order,
                          isOpen,
                          onClose,
                          onConfirm,
                          loading,
                      }: {
    order?: Order
    isOpen: boolean
    onClose: () => void
    onConfirm: () => Promise<void>
    loading: boolean
}) {
    const handleConfirm = async () => {
        try {
            await onConfirm()
            onClose()
        } catch (error) {
            // Error is handled in the hook
        }
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa đơn hàng</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa đơn hàng "{order?.id}"?
                        <br />
                        <span className="text-red-600 font-medium">Hành động này không thể hoàn tác.</span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirm} disabled={loading} className="bg-red-600 hover:bg-red-700">
                        {loading ? (
                            <>
                                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                                Đang xóa...
                            </>
                        ) : (
                            "Xóa"
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

// Stats Cards Component
function StatsCards({ orders }: { orders: Order[] }) {
    const stats = useMemo(() => {
        const total = orders.length
        const completed = orders.filter((o) => o.status === "completed").length
        const totalRevenue = orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.totalAmount, 0)

        return { total, completed, totalRevenue }
    }, [orders])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng đơn hàng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-blue-500" />
                        <span className="text-2xl font-bold">{stats.total}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang xử lý</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {stats.completed}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                            {stats.processing}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Doanh thu</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        <span className="text-2xl font-bold">{stats.totalRevenue.toLocaleString("vi-VN")} ₫</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// Loading Skeleton
function LoadingSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
                </div>
            ))}
        </div>
    )
}

// Main Component
export default function OrderPage() {
    const { orders, loading, error, fetchOrders, updateOrderStatus, deleteOrder } = useOrders()

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [detailDialogOpen, setDetailDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | undefined>()
    const [deletingOrder, setDeletingOrder] = useState<Order | undefined>()

    const filteredOrders = useMemo(() => {
        let filtered = orders

        // Filter by search
        if (search.trim()) {
            const searchText = search.toLowerCase().trim()
            filtered = filtered.filter(
                (order) =>
                    order.id.toLowerCase().includes(searchText) ||
                    order.customer.toLowerCase().includes(searchText) ||
                    order.customerEmail?.toLowerCase().includes(searchText),
            )
        }

        if (statusFilter !== "all") {
            filtered = filtered.filter((order) => order.status === statusFilter)
        }



        return filtered
    }, [orders, search, statusFilter])

    const handleViewOrder = (order: Order) => {
        setSelectedOrder(order)
        setDetailDialogOpen(true)
    }

    const handleDeleteOrder = (order: Order) => {
        setDeletingOrder(order)
        setDeleteDialogOpen(true)
    }

    const handleConfirmDelete = async () => {
        if (deletingOrder) {
            await deleteOrder(deletingOrder.id)
        }
    }

    const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
        await updateOrderStatus(orderId, newStatus)
    }

    const getStatusBadge = (status: OrderStatus) => {
        const statusConfig = {
            pending: { label: "Chờ xử lý", className: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" },

            completed: {
                label: "Hoàn thành",
                className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            },
            shipped: { label: "Đã giao", className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
            cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
        }

        const config = statusConfig[status] || statusConfig.pending
        return (
            <Badge variant="secondary" className={config.className}>
                {config.label}
            </Badge>
        )
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="text-center py-8">
                    <p className="text-red-500 mb-4">Lỗi: {error}</p>
                    <Button onClick={fetchOrders}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Thử lại
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6" />
                        Quản lý đơn hàng
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Quản lý và theo dõi tất cả đơn hàng</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={fetchOrders} disabled={loading}>
                        <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                        Làm mới
                    </Button>
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Xuất Excel
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            {!loading && <StatsCards orders={orders} />}

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <SearchInput value={search} onChange={setSearch} />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Lọc theo trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                        <SelectItem value="PENDING">Chờ xử lý</SelectItem>
                        <SelectItem value="COMPLETED">Hoàn thành</SelectItem>
                        <SelectItem value="SHIPPED">Đã giao</SelectItem>
                        <SelectItem value="CANCELLED">Đã hủy</SelectItem>

                    </SelectContent>
                </Select>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span>
            Hiển thị {filteredOrders.length} / {orders.length} đơn hàng
          </span>
                </div>
            </div>

            {/* Orders Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách đơn hàng</CardTitle>
                    <CardDescription>Quản lý tất cả đơn hàng trong hệ thống</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <LoadingSkeleton />
                    ) : (
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Mã đơn</TableHead>
                                        <TableHead>Khách hàng</TableHead>
                                        <TableHead>Ngày</TableHead>
                                        <TableHead className="text-right">Tổng tiền</TableHead>
                                        <TableHead className="text-center">Trạng thái</TableHead>
                                        <TableHead className="text-right">Hành động</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                {search || statusFilter !== "all" ? "Không tìm thấy đơn hàng nào" : "Chưa có đơn hàng nào"}
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredOrders.map((order) => (
                                            <TableRow key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <TableCell className="font-medium">{order.id}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        <div className="font-medium">{order.customer}</div>
                                                        {order.customerEmail && <div className="text-sm text-gray-500">{order.customerEmail}</div>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm">{new Date(order.date).toLocaleDateString("vi-VN")}</div>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">{order.total}</TableCell>
                                                <TableCell className="text-center">
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                                                        disabled={loading}
                                                    >
                                                        <SelectTrigger className="w-auto border-none p-0 h-auto">
                                                            {getStatusBadge(order.status)}
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="pending">Chờ xử lý</SelectItem>
                                                            <SelectItem value="completed">Hoàn thành</SelectItem>
                                                            <SelectItem value="shipped">Đã giao</SelectItem>
                                                            <SelectItem value="cancelled">Đã hủy</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-1">
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={() => handleViewOrder(order)}
                                                            className="h-8 w-8"
                                                            disabled={loading}
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                        {/*<Button*/}
                                                        {/*    size="icon"*/}
                                                        {/*    variant="ghost"*/}
                                                        {/*    onClick={() => handleDeleteOrder(order)}*/}
                                                        {/*    className="h-8 w-8 text-red-500 hover:text-red-700"*/}
                                                        {/*    disabled={loading}*/}
                                                        {/*>*/}
                                                        {/*    <Trash className="w-4 h-4" />*/}
                                                        {/*</Button>*/}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Dialogs */}
            <OrderDetailDialog order={selectedOrder} isOpen={detailDialogOpen} onClose={() => setDetailDialogOpen(false)} />

            <DeleteDialog
                order={deletingOrder}
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />
        </div>
    )
}
