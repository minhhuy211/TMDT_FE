
// Dùng cho lưu trên localStorage (frontend)
export interface CartItemLocal {
    productId: string;
    productName: string;
    price: number;
    img?: string;
    quantity: number;
}

// Giỏ hàng local (không cần id)
export interface LocalCart {
    items: CartItemLocal[];
    totalAmount: number;
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
