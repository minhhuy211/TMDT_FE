import type { APIResponse } from "@/model/APIResponse";
import type { Category, CategoryRequest } from "@/model/Category";
import type { Product } from "@/model/Product";
import api from "./api";

const categoryApi = {
    getCategories: async (): Promise<Category[]> => {
        const data = await api.get<APIResponse<any[]>>("/categories");
        if (data && data.result) {
            return data.result.map(cat => ({
                id: cat.cate_ID,
                name: cat.name,
                description: cat.description,
                productCount: cat.count,
                createdAt: cat.createdAt,
                status: "active",
            }));
        }
        throw new Error("Invalid API response structure");
    },

    getCategoryById: async (id: string): Promise<Category> => {
        const data = await api.get<APIResponse<Category>>(`/categories/${id}`);
        return data.result;
    },

    getProductsByCategory: async (cateId: string): Promise<Product[]> => {
        const data = await api.get<APIResponse<Product[]>>(`/categories/${cateId}/products`);
        return data.result;
    },

    createCategory: async (payload: CategoryRequest): Promise<Category> => {
        const data = await api.post<APIResponse<Category>>("/categories", payload);
        return data.result;
    },

        updateCategory: async (id: string, payload: CategoryRequest): Promise<Category> => {
            try {
                // Send the PUT request to update the category
                const data = await api.put<APIResponse<Category>>(`/categories/${id}`, payload);

                // Check if the response contains the expected result
                if (!data || data.code !== 0 || !data.result) {
                    throw new Error(data.message || "Cập nhật danh mục thất bại. Không có dữ liệu hợp lệ.");
                }

                const result = data.result;

                // Ensure all fields are populated with default values if they're missing or null
                return {
                    cate_ID: result.cate_ID,
                    name: result.name ?? "Chưa có tên",  // Default value for name
                    description: result.description ?? "Chưa có mô tả", // Default value for description
                    status: result.status ?? "active", // Default value for status
                    productList: result.productList ?? [], // Default to an empty array
                    urlImage: result.urlImage ?? "", // Default to an empty string
                };
            } catch (error: any) {
                console.error("Error while updating category:", error.message || error);
                // Re-throw the error to be handled where this function is called
                throw new Error(`Cập nhật danh mục thất bại: ${error.message || error}`);
            }
        },


    deleteCategory: async (id: string): Promise<void> => {
        try {
            await api.delete(`/categories/${id}`);
        } catch (error: any) {
            console.error("Delete category failed:", error);
            throw error;
        }
    }

};

export default categoryApi;
