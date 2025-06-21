import type { APIResponse } from "@/model/APIResponse";
import type { Category } from "@/model/Category";
import type { Product } from "@/model/Product";
import api from "./api";

const categoryApi = {
    // Lấy tất cả danh mục
    getCategories: async (): Promise<Category[]> => {
        const response = await api.get<APIResponse<Category[]>>("/categories");
        return response.data.result;
    },

    // Lấy danh mục theo ID
    getCategoryById: async (id: string): Promise<Category> => {
        const response = await api.get<APIResponse<Category>>(`/categories/${id}`);
        return response.data.result;
    },

    // Lấy danh sách sản phẩm theo danh mục
    getProductsByCategory: async (cateId: string): Promise<Product[]> => {
        const response = await api.get<APIResponse<Product[]>>(`/categories/${cateId}/products`);
        return response.data.result;
    },

    createCategory: async (data: any) => {
        const response = await api.post<APIResponse<Category>>("/categories", data);
        return response.data.result;
    },

    updateCategory: async (id: any, data: any) => {
        const response = await api.put<APIResponse<Category>>(`/categories/${id}`, data);
        return response.data.result;
    },

    deleteCategory: async (id: any) => {
        await api.delete(`/categories/${id}`);
    }

};

export default categoryApi;
