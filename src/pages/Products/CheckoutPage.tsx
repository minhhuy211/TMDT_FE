"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../components/modal/ConfirmationModal" // Import the modal component

// Import shadcn/ui components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" // Confirmed: Select is imported here

const CheckoutPage = () => {
    const initialSavedAddresses = [
        { id: "1", value: "123 Đường ABC, Phường XYZ, Quận 1, TP.HCM" },
        { id: "2", value: "456 Đường DEF, Phường GHI, Quận 2, TP.HCM" },
    ]

    const [name, setName] = useState("")
    const [address, setAddress] = useState(initialSavedAddresses[0].value) // Pre-fill with first sample address
    const [selectedAddressId, setSelectedAddressId] = useState(initialSavedAddresses[0].id) // Track selected address
    const [newAddressInput, setNewAddressInput] = useState("") // State for new address input
    const [phone, setPhone] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("Credit Card")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()

    // Update the main 'address' state when 'selectedAddressId' or 'newAddressInput' changes
    useEffect(() => {
        if (selectedAddressId === "new") {
            setAddress(newAddressInput)
        } else {
            const selected = initialSavedAddresses.find((addr) => addr.id === selectedAddressId)
            setAddress(selected ? selected.value : "")
        }
    }, [selectedAddressId, newAddressInput])

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !address || !phone || !paymentMethod) {
            alert("Vui lòng điền đầy đủ thông tin.")
            return
        }
        setIsModalOpen(true)
    }

    // Handle confirmation
    const handleConfirm = () => {
        console.log({ name, address, phone, paymentMethod })
        setIsModalOpen(false)
        navigate("/successPayment")
    }

    // Handle cancellation
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <div className="w-full max-w-lg mx-auto px-6 py-10 mt-10 mb-20 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Thông tin thanh toán</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                    <Label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                        Họ và tên:
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập họ và tên của bạn"
                        className="w-full text-black"
                        required
                    />
                </div>

                {/* Address Selection */}
                <div>
                    <Label htmlFor="address-select" className="block text-base font-medium text-gray-700 mb-1">
                        Địa chỉ giao hàng:
                    </Label>
                    <Select value={selectedAddressId} onValueChange={setSelectedAddressId}>
                        <SelectTrigger id="address-select" className="w-full text-black">
                            <SelectValue placeholder="Chọn địa chỉ hoặc thêm mới" />
                        </SelectTrigger>
                        <SelectContent>
                            {initialSavedAddresses.map((addr) => (
                                <SelectItem key={addr.id} value={addr.id}>
                                    {addr.value}
                                </SelectItem>
                            ))}
                            <SelectItem value="new">Thêm địa chỉ mới</SelectItem>
                        </SelectContent>
                    </Select>

                    {selectedAddressId === "new" && (
                        <div className="mt-4">
                            <Label htmlFor="new-address-input" className="sr-only">
                                Địa chỉ mới
                            </Label>
                            <Input
                                id="new-address-input"
                                type="text"
                                value={newAddressInput}
                                onChange={(e) => setNewAddressInput(e.target.value)}
                                placeholder="Nhập địa chỉ mới của bạn"
                                className="w-full text-black"
                                required
                            />
                        </div>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <Label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                        Số điện thoại:
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại của bạn"
                        className="w-full text-black"
                        required
                    />
                </div>

                {/* Payment Method */}
                <div>
                    <Label htmlFor="payment-method" className="block text-base font-medium text-gray-700 mb-1">
                        Phương thức thanh toán:
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger id="payment-method" className="w-full text-black">
                            <SelectValue placeholder="Chọn phương thức thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Credit Card">Thẻ tín dụng</SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                            <SelectItem value="COD">Thanh toán khi nhận hàng</SelectItem>
                            <SelectItem value="QRCode">Quét mã QR</SelectItem>
                        </SelectContent>
                    </Select>

                    {paymentMethod === "QRCode" && (
                        <div className="mt-4 text-center p-4 border border-gray-200 rounded-md bg-gray-50">
                            <p className="text-gray-800 font-medium mb-3">Quét mã QR để thanh toán:</p>
                            <img
                                src="/placeholder.svg?height=200&width=200" // Using placeholder for QR code
                                alt="QR Code"
                                className="mx-auto w-48 h-48 object-contain border border-gray-300 p-2 bg-white rounded-md"
                            />
                            <p className="text-sm text-gray-600 mt-3">
                                Vui lòng quét mã bằng MoMo, VNPay hoặc ứng dụng ngân hàng của bạn.
                            </p>
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <Button type="submit" className="w-full bg-black text-white py-2.5 text-base hover:bg-gray-800">
                        Thanh toán
                    </Button>
                </div>
            </form>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                details={{ name, address, phone, paymentMethod }}
            />
        </div>
    )
}

export default CheckoutPage
