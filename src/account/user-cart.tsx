import React, { useState } from 'react';

const Cart: React.FC = () => {
    const [cart, setCart] = useState([
        { name: 'Sản phẩm 1', quantity: 1, price: 100000 },
        { name: 'Sản phẩm 2', quantity: 2, price: 200000 }
    ]);

    const handleCheckout = () => {
        alert('Thanh toán thành công!');
    };

    const handleClearCart = () => {
        setCart([]);
        alert('Giỏ hàng đã được xóa!');
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-center text-black">Giỏ Hàng</h1>
    <ul className="space-y-3">
        {cart.map((item, index) => (
                <li key={index} className="flex justify-between text-black">
            <span>{item.name} - {item.quantity} cái</span>
        <span>{item.price.toLocaleString()} VND</span>
    </li>
))}
    </ul>
    <p className="text-black"><strong>Tổng tiền:</strong> {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} VND</p>
    <div className="flex space-x-4">
    <button
        onClick={handleCheckout}
    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
        Thanh toán
    </button>
    <button
    onClick={handleClearCart}
    className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
        Xóa giỏ hàng
    </button>
    </div>
    </div>
);
};

export default Cart;
