import React, { useState } from 'react';

const CheckoutPage = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    // Xử lý form submit
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic xử lý thanh toán (Ví dụ: gửi API hoặc đơn giản là in ra console)
        console.log({ name, address, phone, paymentMethod });
        alert('Thanh toán thành công!');
    };

    return (
        <div className="w-full max-w-lg mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">Thông tin thanh toán</h1>
    <form onSubmit={handleSubmit} className="space-y-4">
    {/* Tên người mua */}
    <div>
    <label className="block text-lg text-gray-700">Họ và tên:</label>
    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
    required
    />
    </div>

    {/* Địa chỉ */}
    <div>
        <label className="block text-lg text-gray-700">Địa chỉ giao hàng:</label>
    <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
    required
    />
    </div>

    {/* Số điện thoại */}
    <div>
        <label className="block text-lg text-gray-700">Số điện thoại:</label>
    <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
    required
    />
    </div>

    {/* Phương thức thanh toán */}
    <div>
        <label className="block text-lg text-gray-700">Phương thức thanh toán:</label>
    <select
    value={paymentMethod}
    onChange={(e) => setPaymentMethod(e.target.value)}
    className="w-full px-4 py-2 border border-gray-300 rounded-md"
    >
    <option value="Credit Card">Thẻ tín dụng</option>
    <option value="PayPal">PayPal</option>
        <option value="COD">Thanh toán khi nhận hàng</option>
    </select>
    </div>

    {/* Nút gửi */}
    <div className="mt-6">
    <button
        type="submit"
    className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
        Thanh toán
    </button>
    </div>
    </form>
    </div>
);
};

export default CheckoutPage;
