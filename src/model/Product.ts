import type { Category } from "./Category";

export interface Product {
  productId: string;          // UUID
  category: Category;
  productName: string;
  description: string;
  price: number;
  stock: number;
  urlImage: string;
  categoryName: string;
}

export interface ProductRequest {
  productName: string;
  description: string;
  price: number;
  stock: number;
  urlImage: string;
  cate_ID: string;            // UUID
}

export interface ProductResponse {
  productId: string;          // UUID
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  urlImage: string;
}