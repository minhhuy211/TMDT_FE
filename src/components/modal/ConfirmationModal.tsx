"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ConfirmationModalProps {
    isOpen: boolean
    onConfirm: () => void
    onCancel: () => void
    details: {
        name: string
        address: string
        phone: string
        paymentMethod: string
    }
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, details }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full text-center relative animate-in fade-in zoom-in-95 duration-300">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold text-gray-800">Xác nhận thông tin thanh toán</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="text-left space-y-2">
                        <p className="text-gray-700">
                            <strong>Họ và tên:</strong> {details.name}
                        </p>
                        <p className="text-gray-700">
                            <strong>Địa chỉ:</strong> {details.address}
                        </p>
                        <p className="text-gray-700">
                            <strong>Số điện thoại:</strong> {details.phone}
                        </p>
                        <p className="text-gray-700">
                            <strong>Phương thức thanh toán:</strong> {details.paymentMethod}
                        </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <Button variant="outline" onClick={onCancel} className="border-gray-300 text-gray-700 hover:bg-gray-100">
                            Hủy
                        </Button>
                        <Button onClick={onConfirm} className="bg-gray-800 text-white hover:bg-gray-700">
                            Xác nhận
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ConfirmationModal
