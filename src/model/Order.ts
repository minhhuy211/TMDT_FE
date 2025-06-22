export interface OrderItemRequest {
    productId: string;
    quantity: number;
}
export interface OrderRequest {
    userId: string;
    orderDate: string;
    addressId: string;
    orderItemRequests: OrderItemRequest[];
    totalAmount: number;
    paymentMethod: string;
    expectedDeliveryDate?: string | null;
}

export interface OrderItemDetail {
    id: string;
    productId: string;
    productName: string;
    productImg: string; // URL ảnh sản phẩm
    category: string;
    quantity: number;
    itemPrice: number; // Giá 1 sản phẩm (chưa nhân quantity)
}

export interface OrderDetails {
    id: string;
    orderDate: string;
    totalAmount: number;
    orderStatus: string; // Enum dạng: "PENDING", "CONFIRMED", ...
    shipmentNumber?: string | null;
    expectedDeliveryDate?: string | null;
    orderItemList: OrderItemDetail[];
}