"use client"

import type React from "react"
import { useNavigate } from "react-router-dom"
import { Check, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProductAPI {
    productId: string
    productName: string
    imgUrl: string
    price: number
}

interface AddToCartModalProps {
    isModalOpen: boolean
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    product: ProductAPI
    quantity: number
    selectedColor: string
    selectedPrintLocation: string
    selectedMaterial: string
    selectedSize: string
}

export const AddToCartModal = ({
                                   isModalOpen,
                                   setIsModalOpen,
                                   product,
                                   quantity,
                                   selectedColor,
                                   selectedPrintLocation,
                                   selectedMaterial,
                                   selectedSize,
                               }: AddToCartModalProps) => {
    const navigate = useNavigate()

    if (!isModalOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-sm w-full text-center relative animate-in fade-in zoom-in-95 duration-300">
                <CardHeader className="pb-2">
                    <div className="flex justify-center mb-2">
                        <Check className="text-green-500 w-10 h-10" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">Đã thêm vào giỏ hàng!</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <img
                            src={product.imgUrl || "/placeholder.svg?height=64&width=64"}
                            alt={product.productName}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                        />
                        <div className="text-left">
                            <p className="text-gray-700 font-medium">{product.productName}</p>
                            <p className="text-gray-500 text-sm">
                                {selectedColor} | {selectedPrintLocation} | {selectedMaterial} | {selectedSize}
                            </p>
                            <p className="text-gray-500 text-sm">Số lượng: {quantity}</p>
                            <p className="text-gray-800 font-semibold">Tổng: {(product.price * quantity).toLocaleString("vi-VN")}đ</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
                        >
                            Tiếp tục mua sắm
                        </Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false)
                                navigate("/cart")
                            }}
                            className="w-full bg-gray-800 text-white hover:bg-gray-700"
                        >
                            Xem giỏ hàng
                        </Button>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(false)}
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <CircleX className="w-5 h-5" />
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
