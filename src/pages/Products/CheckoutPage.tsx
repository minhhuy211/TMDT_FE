// src/pages/Products/CheckoutPage.tsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import ConfirmationModal from '../../components/modal/ConfirmationModal'; // Import the modal component

const CheckoutPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal visibility
    const navigate = useNavigate(); // Initialize navigate hook

    // Handle form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsModalOpen(true); // Open the modal when form is submitted
    };

    // Handle confirmation
    const handleConfirm = () => {
        console.log({ name, address, phone, paymentMethod });
        setIsModalOpen(false); // Close the modal
        navigate('/successPayment'); // Redirect to success page
    };

    // Handle cancellation
    const handleCancel = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <div className="w-full max-w-lg mx-auto px-8 py-12 bg-white">
            <h1 className="text-3xl font-bold text-black text-center mb-6">Thông tin thanh toán</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-lg text-black">Họ và tên:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black"
                        required
                    />
                </div>

                {/* Address */}
                <div>
                    <label className="block text-lg text-black">Địa chỉ giao hàng:</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-lg text-black">Số điện thoại:</label>
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black"
                        required
                    />
                </div>

                {/* Payment Method */}
                <div>
                    <label className="block text-lg text-black">Phương thức thanh toán:</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full px-4 py-2 border border-black rounded-md bg-white text-black"
                    >
                        <option value="Credit Card">Thẻ tín dụng</option>
                        <option value="PayPal">PayPal</option>
                        <option value="COD">Thanh toán khi nhận hàng</option>
                        <option value="QRCode">Quét mã QR</option>
                    </select>

                    {paymentMethod === 'QRCode' && (
                        <div className="mt-4 text-center">
                            <p className="text-black mb-2">Quét mã QR để thanh toán:</p>
                            <img
                                src="/imgs/sample-qr.png"
                                alt="QR Code"
                                className="mx-auto w-48 h-48 border border-black p-2 bg-white"
                            />
                            <p className="text-sm text-gray-600 mt-2">Vui lòng quét mã bằng MoMo, VNPay hoặc ứng dụng ngân hàng của bạn.</p>
                        </div>
                    )}

                </div>

                {/* Submit Button */}
                <div className="mt-6">
                    <button
                        type="submit"
                        className="w-full bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800"
                    >
                        Thanh toán
                    </button>
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
    );
};

export default CheckoutPage;
