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

