import { useState, useEffect } from "react";
import Sidebar from "@/account/sidebar.tsx";
import { cancelOrder, getOrderHistory } from "@/services/orderApi";
import type { OrderDetails, OrderItemDetail } from "@/model/Order";

// Map trạng thái sang tiếng Việt & danh sách tab lọc
const orderTabs = [
    { label: "Tất cả", value: "ALL" },
    { label: "Chờ xác nhận", value: "PENDING" },
    { label: "Đã xác nhận", value: "CONFIRMED" },
    { label: "Đã thanh toán", value: "PAID" },
    { label: "Đang giao", value: "SHIPPED" },
    { label: "Thành công", value: "DELIVERED" },
    { label: "Đã hủy", value: "CANCELLED" }
];
const statusMap: Record<string, string> = {
    "PENDING": "Chờ xác nhận",
    "CONFIRMED": "Đã xác nhận",
    "PAID": "Đã thanh toán",
    "SHIPPED": "Đang giao",
    "DELIVERED": "Thành công",
    "CANCELLED": "Đã hủy"
};

const OrderHistory = () => {
    const [orders, setOrders] = useState<OrderDetails[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [cancelingId, setCancelingId] = useState<string | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const data = await getOrderHistory();
            setOrders(data || []);
        } catch {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    // Lọc đơn theo search + filter trạng thái
    const filteredOrders = orders.filter(order => {
        const searchLower = search.toLowerCase();
        const matchesSearch =
            order.id?.toLowerCase().includes(searchLower) ||
            order.orderItemList?.some(item =>
                (item.productName || "").toLowerCase().includes(searchLower) ||
                (item.category || "").toLowerCase().includes(searchLower)
            );
        const matchesStatus =
            statusFilter === "ALL" ? true : order.orderStatus === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Hủy đơn
    const handleCancelOrder = async (orderId: string) => {
        if (!window.confirm("Bạn chắc chắn muốn hủy đơn hàng này?")) return;
        setCancelingId(orderId);
        try {
            await cancelOrder(orderId);
            await loadOrders();
            alert("Hủy đơn hàng thành công!");
        } catch (error: any) {
            alert(error?.message || "Có lỗi khi hủy đơn hàng!");
        } finally {
            setCancelingId(null);
        }
    };

    const formatPrice = (price?: number) =>
        typeof price === "number"
            ? price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
            : "";

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="max-w-5xl mx-auto p-6 bg-white rounded shadow w-full">
                <h1 className="text-3xl font-bold mb-6">Lịch sử đơn hàng</h1>
                {/* Tabs filter trạng thái */}
                <div className="mb-4 flex flex-wrap gap-2">
                    {orderTabs.map(tab => (
                        <button
                            key={tab.value}
                            onClick={() => setStatusFilter(tab.value)}
                            className={
                                "px-4 py-2 rounded-full font-semibold transition " +
                                (statusFilter === tab.value
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
                {/* Ô tìm kiếm */}
                <input
                    type="text"
                    placeholder="Tìm theo mã đơn, tên sản phẩm, hoặc danh mục"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full mb-6 p-3 border border-gray-300 rounded"
                />

                {loading && <div>Đang tải...</div>}
                {!loading && filteredOrders.length === 0 && (
                    <p>Không tìm thấy đơn hàng.</p>
                )}

                {filteredOrders.map(order => (
                    <div
                        key={order.id}
                        className="border border-gray-300 rounded mb-8 p-4 bg-gray-50"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <div className="text-sm text-gray-600">Mã đơn: {order.id}</div>
                                <div className="text-sm text-gray-600">
                                    Ngày đặt:{" "}
                                    {order.orderDate
                                        ? new Date(order.orderDate).toLocaleString("vi-VN")
                                        : ""}
                                </div>
                            </div>
                            <div>
                                <span
                                    className={
                                        "px-3 py-1 rounded-full text-sm font-semibold " +
                                        (order.orderStatus === "DELIVERED"
                                                ? "bg-green-100 text-green-700"
                                                : order.orderStatus === "CANCELLED"
                                                    ? "bg-red-100 text-red-700"
                                                    : order.orderStatus === "PENDING"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-blue-100 text-blue-700"
                                        )
                                    }
                                >
                                    {statusMap[order.orderStatus] || order.orderStatus}
                                </span>
                            </div>
                        </div>

                        <table className="w-full text-left border-collapse mb-4">
                            <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2">Ảnh</th>
                                <th className="py-2">Tên sản phẩm</th>
                                <th className="py-2">Danh mục</th>
                                <th className="py-2">Số lượng</th>
                                <th className="py-2">Đơn giá</th>
                                <th className="py-2">Thành tiền</th>
                            </tr>
                            </thead>
                            <tbody>
                            {(order.orderItemList || []).map((item: OrderItemDetail) => (
                                <tr key={item.id} className="border-b border-gray-200">
                                    <td className="py-2">
                                        {item.productImg ? (
                                            <img
                                                src={item.productImg}
                                                alt={item.productName}
                                                width={48}
                                                height={48}
                                                className="rounded"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">?</div>
                                        )}
                                    </td>
                                    <td className="py-2">{item.productName || "--"}</td>
                                    <td className="py-2">{item.category || "--"}</td>
                                    <td className="py-2">{item.quantity ?? "--"}</td>
                                    <td className="py-2">{formatPrice(item.itemPrice)}</td>
                                    <td className="py-2">{formatPrice((item.itemPrice ?? 0) * (item.quantity ?? 0))}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div className="flex justify-between items-center">
                            <div className="font-semibold text-lg">
                                Tổng cộng: {formatPrice(order.totalAmount)}
                            </div>
                            {/* Chỉ cho phép hủy khi trạng thái là PENDING hoặc CONFIRMED */}
                            {["PENDING", "CONFIRMED"].includes(order.orderStatus) && (
                                <button
                                    className={`ml-4 px-4 py-2 rounded bg-red-500 text-white font-semibold hover:bg-red-700 transition ${
                                        cancelingId === order.id ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                                    disabled={cancelingId === order.id}
                                    onClick={() => handleCancelOrder(order.id)}
                                >
                                    {cancelingId === order.id ? "Đang hủy..." : "Hủy đơn hàng"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;
