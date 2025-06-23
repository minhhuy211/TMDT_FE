import type { Category } from "./Category";

export type ProductStatus = "ACTIVE" | "INACTIVE" | "OUT_OF_STOCK";

export const statusOptions: { value: ProductStatus; label: string }[] = [
  { value: "ACTIVE", label: "Đang bán" },
  { value: "INACTIVE", label: "Ngừng bán" },
  { value: "OUT_OF_STOCK", label: "Hết hàng" },
];

export interface Product {
  productId: string;          // UUID
  category?: Category;
  productName: string;
  description: string;
  price: number;
  stock?: number;
  urlImage: string;
  categoryName: string; 
  status: ProductStatus
}

export interface ProductRequest {
  productName: string;
  description: string;
  price: number;
  stock: number;
  urlImage: string;
  cate_ID: string;            // UUID
  status: ProductStatus;
}

export interface ProductResponse {
  productId: string;          // UUID
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  urlImage: string;
  status: ProductStatus;
}