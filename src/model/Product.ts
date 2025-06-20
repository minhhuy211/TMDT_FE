import type { Category } from "./Category";

export interface Product {
  productId: string;          // UUID
  category: Category;
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
}

export interface ProductRequest {
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
  cate_ID: string;            // UUID
}

export interface ProductResponse {
  productId: string;          // UUID
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  img: string;
}