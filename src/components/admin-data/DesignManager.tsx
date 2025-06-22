"use client"

import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { cn } from "../admin-ts/utils"
import { FileIcon, X } from "lucide-react"
import CustomService from "@/services/customApi"
import { useState } from "react"

export default function DesignManager() {
    const { theme } = useTheme()
    const queryClient = useQueryClient()
    const [rejectLoading, setRejectLoading] = useState(false)
    const [quoteLoading, setQuoteLoading] = useState(false)
    const [loadingId, setLoadingId] = useState<string | null>(null)
    const [selectedDesign, setSelectedDesign] = useState<any>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [quotePrice, setQuotePrice] = useState<string>("")

    const { data: designs = [], isLoading } = useQuery({
        queryKey: ["my-designs"],
        queryFn: CustomService.getOrderCustoms,
    })

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        })

    const renderStatus = (status: string) => {
        switch (status) {
            case "PENDING_QUOTE":
                return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Chờ báo giá</Badge>
            case "CONFIRMED":
                return <Badge variant="outline" className="text-blue-600 border-blue-600">Đã xác nhận</Badge>
            case "CANCELLED":
                return <Badge variant="outline" className="text-red-600 border-red-600">Đã hủy</Badge>
            case "PAID":
                return <Badge variant="outline" className="text-green-600 border-green-600">Đã thanh toán</Badge>
            default:
                return <Badge variant="outline" className="text-gray-600 border-gray-600">{status}</Badge>
        }
    }

    const handleViewDetail = async (id: string) => {
        try {
            setLoadingId(id)
            const detail = await CustomService.getOrderCustomById(id)
            setSelectedDesign(detail)
            setQuotePrice(detail.quotedPrice?.toString() || "")
            setModalOpen(true)
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết:", error)
            alert("Không thể lấy chi tiết thiết kế. Vui lòng thử lại sau.")
        } finally {
            setLoadingId(null)
        }
    }

    const closeModal = () => {
        setModalOpen(false)
        setSelectedDesign(null)
        setQuotePrice("")
        setQuoteLoading(false)
    }

    const handleReject = async () => {
        if (!selectedDesign) return;

        if (!confirm("Bạn có chắc muốn từ chối đơn thiết kế này?")) return;

        try {
            setRejectLoading(true);
            // Gọi rejectOrderCustom với trạng thái "REJECTED"
            await CustomService.rejectOrderCustom(selectedDesign.id, selectedDesign.status);
            alert("Đã từ chối đơn thiết kế");
            setModalOpen(false);
            queryClient.invalidateQueries(["my-designs"]);
        } catch (error: any) {
            alert(error.message || "Từ chối đơn thất bại. Vui lòng thử lại.");
            console.error("Lỗi khi từ chối đơn:", error);
        } finally {
            setRejectLoading(false);
        }
    };

    const handleQuote = async () => {
        if (!selectedDesign) return

        const priceNum = Number(quotePrice)
        if (isNaN(priceNum) || priceNum <= 0) {
            alert("Vui lòng nhập giá báo hợp lệ lớn hơn 0")
            return
        }

        try {
            setQuoteLoading(true)
            const updated = await CustomService.quoteOrderCustom(selectedDesign.id, priceNum)
            setSelectedDesign(updated)
            setQuotePrice(updated.quotedPrice?.toString() || "")
            setModalOpen(false)
            queryClient.invalidateQueries(["my-designs"])
        } catch (error) {
            console.error("Lỗi khi báo giá:", error)
            alert("Báo giá thất bại. Vui lòng thử lại.")
        } finally {
            setQuoteLoading(false)
        }
    }

    const ZALO_PHONE_NUMBER = "0912345678"

    return (
        <>
            <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
                <CardHeader>
                    <CardTitle className={theme === "dark" ? "text-white" : ""}>Quản lý thiết kế</CardTitle>
                    <CardDescription>Theo dõi các đơn thiết kế đã nộp</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <h3 className={cn("text-lg font-medium mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
                        Danh sách thiết kế
                    </h3>

                    <Table>
                        <TableHeader>
                            <TableRow className={theme === "dark" ? "border-gray-800" : ""}>
                                <TableHead>Ảnh</TableHead>
                                <TableHead>Mô tả</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Số lượng</TableHead>
                                <TableHead>Giá báo</TableHead>
                                <TableHead>Ngày gửi</TableHead>
                                <TableHead className="text-right">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">Đang tải dữ liệu...</TableCell>
                                </TableRow>
                            ) : designs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-4">Chưa có thiết kế nào được gửi.</TableCell>
                                </TableRow>
                            ) : (
                                designs.map((item: any) => (
                                    <TableRow key={item.id} className={theme === "dark" ? "border-gray-800" : ""}>
                                        <TableCell>
                                            {item.designFileUrls?.[0] ? (
                                                <img
                                                    src={item.designFileUrls[0]}
                                                    alt="preview"
                                                    className="w-12 h-12 rounded object-cover border"
                                                />
                                            ) : (
                                                <FileIcon className="w-6 h-6 text-gray-500" />
                                            )}
                                        </TableCell>
                                        <TableCell className="max-w-[180px] truncate">
                                            {item.description || "Không có mô tả"}
                                        </TableCell>
                                        <TableCell>{renderStatus(item.status)}</TableCell>
                                        <TableCell>{item.quantity}</TableCell>
                                        <TableCell>
                                            {item.quotedPrice !== null ? (
                                                `${item.quotedPrice.toLocaleString("vi-VN")}₫`
                                            ) : (
                                                <span className="text-gray-500 italic">Chưa báo giá</span>
                                            )}
                                        </TableCell>
                                        <TableCell>{formatDate(item.createdAt)}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewDetail(item.id)}
                                                disabled={loadingId === item.id}
                                            >
                                                {loadingId === item.id ? "Đang xem..." : "Xem"}
                                            </Button>
                                            <a
                                                href={`https://zalo.me/${ZALO_PHONE_NUMBER}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button size="sm" variant="outline">Zalo</Button>
                                            </a>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal */}
            {modalOpen && selectedDesign && (
                <>
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={closeModal}
                    />
                    <div
                        className={cn(
                            "fixed z-50 top-1/2 left-1/2 max-w-lg w-full rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 p-6",
                            theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
                        )}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="text-xl font-semibold">Chi tiết thiết kế</h4>
                            <button
                                onClick={closeModal}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                aria-label="Close modal"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex gap-6 flex-wrap">
                            <div className="w-40 h-40 border rounded overflow-hidden">
                                {selectedDesign.designFileUrls?.[0] ? (
                                    <img
                                        src={selectedDesign.designFileUrls[0]}
                                        alt="Design"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <FileIcon className="w-10 h-10 text-gray-400 m-auto mt-14" />
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <p><strong>Mô tả:</strong> {selectedDesign.description || "Không có mô tả"}</p>
                                <p><strong>Trạng thái:</strong> {renderStatus(selectedDesign.status)}</p>
                                <p><strong>Số lượng:</strong> {selectedDesign.quantity}</p>
                                <p><strong>Giá báo:</strong> {selectedDesign.quotedPrice !== null ? `${selectedDesign.quotedPrice.toLocaleString("vi-VN")}₫` : "Chưa báo giá"}</p>
                                <p><strong>Ngày tạo:</strong> {formatDate(selectedDesign.createdAt)}</p>

                                {/* Input nhập giá báo */}
                                <div className="mt-4">
                                    <label className="block mb-1 font-medium" htmlFor="quotePrice">Nhập giá báo (₫):</label>
                                    <input
                                        id="quotePrice"
                                        type="number"
                                        min={0}
                                        className="w-full rounded border px-3 py-2 text-gray-900"
                                        value={quotePrice}
                                        onChange={(e) => setQuotePrice(e.target.value)}
                                    />
                                </div>

                                <div className="flex space-x-3 mt-3">
                                    <Button
                                        onClick={handleQuote}
                                        disabled={quoteLoading || rejectLoading}
                                    >
                                        {quoteLoading ? "Đang báo giá..." : "Báo giá"}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        onClick={handleReject}
                                        disabled={quoteLoading || rejectLoading}
                                    >
                                        {rejectLoading ? "Đang từ chối..." : "Từ chối"}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}
