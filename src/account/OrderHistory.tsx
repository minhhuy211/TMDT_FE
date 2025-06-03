import React, { useState } from "react";
import Sidebar from "@/account/sidebar.tsx";

type OrderItem = {
    id: number;
    name: string;
    variant: string; // Phân loại hàng
    quantity: number;
    price: number; // Giá hiện tại
    originalPrice?: number; // Giá gốc (nếu có giảm giá)
};

type Order = {
    id: number;
    shopName: string;
    status: "completed" | "cancelled" | "delivered" | "processing";
    date: string;
    items: OrderItem[];
    canReview: boolean;
};

const sampleOrders: Order[] = [
    {
        id: 123456,
        shopName: "GONO Tech",
        status: "delivered",
        date: "2025-05-27 14:00",
        canReview: true,
        items: [
            {
                id: 1,
                name: "RAM Laptop DDR4 4Gb 8Gb 16Gb bus 2133 2400 2666 3200MHz Samsung SKhynix Crucial Micron",
                variant: "4Gb,2666 MHz",
                quantity: 1,
                price: 200000,
                originalPrice: 360000,
            },
        ],
    },
    {
        id: 654321,
        shopName: "Thế Giới Linh Kiện Laptop HN",
        status: "cancelled",
        date: "2025-05-20 09:30",
        canReview: false,
        items: [
            {
                id: 2,
                name: "RAM Laptop DDR4 4Gb 8Gb 16Gb bus 2133 2400 2666 3200MHz- Hàng chính hãng - Bảo Hành 3 Năm",
                variant: "4GB Bus 2666",
                quantity: 1,
                price: 145000,
            },
        ],
    },
    // Thêm các đơn hàng khác
];

const OrderHistory = () => {
    const [search, setSearch] = useState("");

    const filteredOrders = sampleOrders.filter((order) => {
        const searchLower = search.toLowerCase();
        if (order.id.toString().includes(searchLower)) return true;
        if (order.shopName.toLowerCase().includes(searchLower)) return true;
        if (order.items.some((item) => item.name.toLowerCase().includes(searchLower)))
            return true;
        return false;
    });

    const formatPrice = (price: number) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

    return (
        <div className="flex">
            {/* Gọi Sidebar ở đây */}
            <Sidebar />
        <div className="max-w-5xl mx-auto p-4 bg-white rounded shadow">

            <h1 className="text-3xl font-bold mb-4">Lịch sử đơn hàng</h1>
            <input
                type="text"
                placeholder="Tìm kiếm theo tên Shop, ID đơn hàng hoặc tên sản phẩm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-6 p-3 border border-gray-300 rounded"
            />

            {filteredOrders.length === 0 && <p>Không tìm thấy đơn hàng.</p>}

            {filteredOrders.map((order) => (
                <div
                    key={order.id}
                    className="border border-gray-300 rounded mb-6 p-4"
                >
                    <div className="flex justify-between items-center mb-3">
                        <div>
                            <strong className="text-lg">{order.shopName}</strong>
                            <div className="text-sm text-gray-600">ID: {order.id}</div>
                            <div className="text-sm text-gray-600">Ngày: {order.date}</div>
                        </div>
                        <div>
                            {order.status === "delivered" && (
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Giao hàng thành công
                </span>
                            )}
                            {order.status === "completed" && (
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Hoàn thành
                </span>
                            )}
                            {order.status === "cancelled" && (
                                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Đã hủy
                </span>
                            )}
                            {order.status === "processing" && (
                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Đang xử lý
                </span>
                            )}
                        </div>
                    </div>

                    <table className="w-full text-left border-collapse mb-4">
                        <thead>
                        <tr className="border-b border-gray-300">
                            <th className="py-2">Tên sản phẩm</th>
                            <th className="py-2">Phân loại</th>
                            <th className="py-2">Số lượng</th>
                            <th className="py-2">Giá</th>
                            <th className="py-2">Thành tiền</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item) => (
                            <tr key={item.id} className="border-b border-gray-200">
                                <td className="py-2">{item.name}</td>
                                <td className="py-2">{item.variant}</td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2">
                                    {item.originalPrice && item.originalPrice > item.price ? (
                                        <>
                        <span className="line-through text-gray-400 mr-2">
                          {formatPrice(item.originalPrice)}
                        </span>
                                            <span className="text-red-600 font-semibold">{formatPrice(item.price)}</span>
                                        </>
                                    ) : (
                                        formatPrice(item.price)
                                    )}
                                </td>
                                <td className="py-2">{formatPrice(item.price * item.quantity)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="flex justify-between items-center">
                        <button className="text-blue-600 hover:underline">Chat</button>
                        <button className="text-blue-600 hover:underline">Xem Shop</button>
                        <button className="text-green-600 hover:underline">Mua lại</button>
                        {order.status === "cancelled" && (
                            <button className="text-red-600 hover:underline">Xem chi tiết Hủy đơn</button>
                        )}
                        {order.canReview && order.status === "delivered" && (
                            <button className="text-yellow-600 hover:underline">Đánh giá sản phẩm</button>
                        )}
                        <button className="text-gray-600 hover:underline">Liên hệ Người bán</button>
                    </div>
                </div>
            ))}
        </div>
        </div>
    );
};

export default OrderHistory;
