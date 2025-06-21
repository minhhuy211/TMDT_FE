export interface OrderItemRequest {
    productId: string;        // UUID dạng string
    quantity: number;         // Số lượng
    discount?: number;        // Discount từng item, optional
}

export interface OrderRequest {
    userId: string;                   // UUID user
    orderDate: string;                // ISO string, ví dụ: "2025-06-22T09:00:00.000Z"
    addressId: string;                // UUID địa chỉ nhận hàng
    orderItemRequests: OrderItemRequest[];
    totalAmount: number;              // Tổng tiền toàn bộ order
    discount?: number;                // Tổng discount cho cả order, optional
    paymentMethod: string;            // Ví dụ: "CASH" | "MOMO" | "BANK"
    expectedDeliveryDate?: string | null; // ISO string hoặc null, optional
}

