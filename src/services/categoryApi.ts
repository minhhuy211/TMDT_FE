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
            const data = await api.put<APIResponse<Category>>(`/categories/${id}`, payload);
            console.log("Update result:", data);

            // Kiểm tra nếu không có kết quả hợp lệ hoặc có lỗi trong phản hồi
            if (!data || data.code !== 0 || !data.result) {
                throw new Error("Cập nhật danh mục thất bại hoặc không có dữ liệu hợp lệ");
            }

            const result = data.result;

            // Kiểm tra các trường `null` và thay thế bằng giá trị mặc định
            return {
                cate_ID: result.cate_ID,
                name: result.name ?? "Chưa có tên",  // Thay thế `null` bằng "Chưa có tên"
                description: result.description ?? "Chưa có mô tả", // Thay thế `null` bằng "Chưa có mô tả"
                productCount: result.count ?? 0, // Thay thế `null` bằng 0
                status: result.status ?? "active", // Thay thế `null` bằng "active"
                productList: result.productList ?? [], // Thay thế `null` bằng mảng rỗng
                urlImage: result.urlImage ?? "", // Thay thế `null` bằng chuỗi rỗng
            };
        } catch (error) {
            console.error("Error while updating category:", error);
            throw error; // Đảm bảo ném lỗi để có thể xử lý ở nơi gọi
        }
    }
,


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
