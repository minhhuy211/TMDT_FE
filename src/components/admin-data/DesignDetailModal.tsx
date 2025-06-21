"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { useTheme } from "next-themes"

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    design: {
        name: string
        type: string
        date: string
        fileName?: string
        image?: string // 👈 Thêm trường hình ảnh
    } | null

}

export default function DesignDetailModal({ open, onOpenChange, design }: Props) {
    const { theme } = useTheme()

    if (!design) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={theme === "dark" ? "bg-gray-900 border-gray-700 text-white" : ""}>
                <DialogHeader>
                    <DialogTitle className="text-xl">{design.name}</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                    <div>
                        <span className="text-sm text-gray-500">Loại thiết kế:</span>
                        <Badge className="ml-2">{design.type}</Badge>
                    </div>
                    <div>
                        <span className="text-sm text-gray-500">Ngày gửi:</span>
                        <span className="ml-2">{design.date}</span>
                    </div>
                    {design.fileName && (
                        <div>
                            <span className="text-sm text-gray-500">Tệp đính kèm:</span>
                            <span className="ml-2">📎 {design.fileName}</span>
                        </div>

                    )}
                </div>
                {design.image && (
                    <div className="mt-4">
                        <span className="text-sm text-gray-500 block mb-1">Xem trước thiết kế:</span>
                        <img
                            src={design.image}
                            alt={design.name}
                            className="w-full max-h-80 object-contain rounded border border-gray-300 dark:border-gray-700"
                        />
                    </div>
                )}


            </DialogContent>
        </Dialog>
    )
}
