import type { Product } from "@/model/Product";

// Dùng cho lưu trên localStorage (frontend)
export interface LocalCartItem {
    productId: string;     // UUID của sản phẩm
    productName: string;   // Tên sản phẩm (giúp hiển thị)
    image?: string;        // Link ảnh sp (giúp hiển thị)
    price: number;         // Đơn giá hiện tại
    quantity: number;      // Số lượng trong giỏ
    discount?: number;     // Giảm giá (tùy chọn)
}

// Giỏ hàng local (không cần id)
export interface LocalCart {
    items: LocalCartItem[];
    totalAmount: number; // Tổng tiền (có thể tính động hoặc lưu sẵn)
}

// Khi gửi đi OrderRequest
export interface OrderItemRequest {
    productId: string;
    quantity: number;
    discount?: number;
}

export interface OrderRequest {
    userId: string;
    orderDate: string;
    addressId: string;
    orderItemRequests: OrderItemRequest[];
    totalAmount: number;
    discount?: number;
    paymentMethod: string;
    expectedDeliveryDate?: string | null;
}
