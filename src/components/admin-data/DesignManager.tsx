"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { cn } from "../admin-ts/utils"
import { useTheme } from "next-themes"
import { FileIcon, ImageIcon, LayoutDashboard, PenTool } from "lucide-react"
import DesignDetailModal from "./DesignDetailModal" // import component modal

export default function DesignManager() {
    const { theme } = useTheme()
    const [selectedDesign, setSelectedDesign] = useState<any>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const [designs, setDesigns] = useState([
        {
            name: "Thiết kế Landing Page",
            type: "UI/UX",
            date: "20/06/2025",
            image: "https://th.bing.com/th/id/OIP.qDpX1tuRngLgox8gV6l-wwHaFj?r=0&rs=1&pid=ImgDetMain",
        },
        {
            name: "Logo thương hiệu mới",
            type: "Logo",
            date: "18/06/2025",
            image: "https://th.bing.com/th/id/OIP.qDpX1tuRngLgox8gV6l-wwHaFj?r=0&rs=1&pid=ImgDetMain",
        },
        {
            name: "Poster khuyến mãi tháng 6",
            type: "Poster",
            date: "15/06/2025",
            image: "https://th.bing.com/th/id/OIP.qDpX1tuRngLgox8gV6l-wwHaFj?r=0&rs=1&pid=ImgDetMain",
        },
    ])


    const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

    const getIcon = (type: string) => {
        switch (type) {
            case "UI/UX":
                return <LayoutDashboard className="w-4 h-4 mr-2 text-indigo-600" />
            case "Poster":
                return <ImageIcon className="w-4 h-4 mr-2 text-pink-600" />
            case "Logo":
                return <PenTool className="w-4 h-4 mr-2 text-amber-600" />
            default:
                return <FileIcon className="w-4 h-4 mr-2 text-gray-600" />
        }
    }

    return (
        <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
            <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>Quản lý thiết kế</CardTitle>
                <CardDescription>Gửi và theo dõi danh sách thiết kế đã nộp</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Form tạo thiết kế mới */}
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const form = e.target as HTMLFormElement
                        const name = (form.elements.namedItem("name") as HTMLInputElement).value
                        const type = (form.elements.namedItem("type") as HTMLSelectElement).value
                        const today = new Date().toLocaleDateString("vi-VN")
                        setDesigns((prev) => [...prev, { name, type, date: today }])
                        setSelectedFileName(null)
                        form.reset()
                    }}
                >
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Tên thiết kế</label>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="VD: Giao diện app bán hàng"
                            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium">Loại thiết kế</label>
                        <select
                            name="type"
                            className="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                        >
                            <option value="UI/UX">UI/UX</option>
                            <option value="Poster">Poster</option>
                            <option value="Logo">Logo</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div className="space-y-2 col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium">Tệp đính kèm</label>
                        <input
                            type="file"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setSelectedFileName(e.target.files[0].name)
                                }
                            }}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:rounded-md file:border-gray-300 file:bg-white file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-gray-100"
                        />
                        {selectedFileName && (
                            <span className="text-sm text-gray-500 mt-1 block">📎 {selectedFileName}</span>
                        )}
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <Button type="submit">Gửi thiết kế</Button>
                    </div>
                </form>

                {/* Danh sách thiết kế */}
                <div>
                    <h3 className={cn("text-lg font-medium mb-4", theme === "dark" ? "text-white" : "text-gray-900")}>
                        Danh sách thiết kế đã nộp
                    </h3>
                    <Table>
                        <TableHeader>
                            <TableRow className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                                <TableHead>Tên</TableHead>
                                <TableHead>Loại</TableHead>
                                <TableHead>Ngày gửi</TableHead>
                                <TableHead className="text-right">Thao tác</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {designs.map((design, index) => (
                                <TableRow key={index} className={theme === "dark" ? "border-gray-800 hover:bg-gray-800/50" : ""}>
                                    <TableCell className="font-medium flex items-center">
                                        {getIcon(design.type)}
                                        {design.name}
                                    </TableCell>
                                    <TableCell>{design.type}</TableCell>
                                    <TableCell>{design.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedDesign(design)
                                                setModalOpen(true)
                                            }}
                                        >
                                            Xem
                                        </Button>
                                        <DesignDetailModal
                                            open={modalOpen}
                                            onOpenChange={setModalOpen}
                                            design={selectedDesign}
                                        />

                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
