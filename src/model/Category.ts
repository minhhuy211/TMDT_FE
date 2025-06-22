import type { Product } from "./Product";

export interface Category {
  status: string;
  cate_ID: string;        // UUID thay vì number
  name: string;
  description: string;
  urlImage: string;
  count: number;
  productList: Product[];
}


export type CategoryRequest = {
  name: string;
  description: string;
  urlImage?: string;
  status: "active" | "inactive";
};

export interface CategoryResponse {
  cate_ID: string;        // UUID thay vì number
  name: string;
  description: string;
  urlImage: string;
  count: number;
  productList: Product[];
}
