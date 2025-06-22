// src/services/orderApi.ts
import { API_BASE_URL } from "@/services/api";
import type {OrderDetails, OrderRequest} from "@/model/Order";

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