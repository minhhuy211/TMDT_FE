// src/services/orderApi.ts
import api, { API_BASE_URL } from "@/services/api";
import type {OrderDetails, OrderRequest} from "@/model/Order";
import { APIResponse } from "@/model/APIResponse";

export const placeOrder = async (order: OrderRequest) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/order`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
    });

    if (!res.ok) {
        let errorMsg = "Uncategorized error";
        try {
            // Thử đọc response dạng text trước
            const text = await res.text();
            try {
                // Thử parse text sang JSON
                const errJson = JSON.parse(text);
                errorMsg = errJson.message || errJson.detail || JSON.stringify(errJson);
            } catch {
                // Nếu không parse được thì lấy luôn text
                errorMsg = text;
            }
        } catch (e) {
            errorMsg = res.statusText || errorMsg;
        }
        // Log chi tiết ra console (rất quan trọng để debug)
        console.error("Order API Error:", errorMsg, "Request:", order, "Status:", res.status);
        throw new Error(errorMsg);
    }
    return await res.json();
};

export const getOrderHistory = async (): Promise<OrderDetails[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/order/user`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
};

export const cancelOrder = async (orderId: string) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/order/cancel/${orderId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Hủy đơn thất bại");
    }
    // Không trả về gì hoặc return true để xác nhận thành công
    return true;
};

export const orderApi = {
  getRevenue: async (): Promise<number> => {
    const response = await api.get<APIResponse<number>>("/order/revenue");
    return response.data.result;
  },
};

