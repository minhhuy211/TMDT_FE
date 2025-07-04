import type { Product } from "./Product";

export interface Category {
  cate_ID: string;        // UUID thay vì number
  name: string;
  description: string;
  urlImage: string;
  count: number;
  productList: Product[];
}


export interface CategoryRequest {
  name: string;
  description: string;
  urlImage: string; // Thêm trường này
}


export interface CategoryResponse {
  cate_ID: string;
  name: string;
  description: string;
  urlImage: string;
  count: number;
  productList: Product[];
}

