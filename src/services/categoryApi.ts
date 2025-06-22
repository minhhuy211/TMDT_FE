import type { APIResponse } from "@/model/APIResponse";
import type { Category, CategoryRequest } from "@/model/Category";
import type { Product } from "@/model/Product";
import api from "./api";

const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    try {
      const data = await api.get<APIResponse<Category[]>>("/categories");
      console.log("Categories data:", data);
      console.log("Categories result:", data.result);
      if (data.code !== 0 || !data.result) {
        throw new Error(data.message || "Lấy danh mục thất bại");
      }
      return data.result;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error(`Lấy danh mục thất bại: ${error.message || error}`);
    }
  },

  getCategoryById: async (id: string): Promise<Category> => {
    try {
      const data = await api.get<APIResponse<Category>>(`/categories/${id}`);
      console.log(`Category by ID (${id}):`, data);
      console.log(`Category result for ${id}:`, data.result);
      if (data.code !== 0 || !data.result) {
        throw new Error(data.message || `Không tìm thấy danh mục với ID ${id}`);
      }
      return data.result;
    } catch (error) {
      console.error(`Error fetching category with ID ${id}:`, error);
      throw new Error(`Lấy danh mục với ID ${id} thất bại: ${error.message || error}`);
    }
  },

  getProductsByCategory: async (cateId: string): Promise<Product[]> => {
    try {
      const data = await api.get<APIResponse<Product[]>>(`/categories/${cateId}/products`);
      console.log(`Products for category ${cateId}:`, data);
      console.log(`Products result for category ${cateId}:`, data.result);
      if (data.code !== 0 || !data.result) {
        throw new Error(data.message || `Không tìm thấy sản phẩm cho danh mục ${cateId}`);
      }
      return data.result;
    } catch (error) {
      console.error(`Error fetching products for category ${cateId}:`, error);
      throw new Error(`Lấy sản phẩm cho danh mục ${cateId} thất bại: ${error.message || error}`);
    }
  },

  createCategory: async (payload: CategoryRequest): Promise<Category> => {
    try {
      const data = await api.post<APIResponse<Category>>("/categories", payload);
      console.log("Created category:", data);
      console.log("Created category result:", data.result);
      if (data.code !== 0 || !data.result) {
        throw new Error(data.message || "Tạo danh mục thất bại");
      }
      return data.result;
    } catch (error) {
      console.error("Error creating category:", error);
      throw new Error(`Tạo danh mục thất bại: ${error.message || error}`);
    }
  },

  updateCategory: async (id: string, payload: CategoryRequest): Promise<Category> => {
    if (!id) {
      throw new Error("ID danh mục không hợp lệ.");
    }
    try {
      const data = await api.put<APIResponse<Category>>(`/categories/${id}`, payload);
      console.log(`Updated category with ID (${id}):`, data);
      if (data.code !== 0 || !data.result) {
        throw new Error(data.message || "Cập nhật danh mục thất bại.");
      }
      return data.result;
    } catch (error: any) {
      console.error("Error while updating category:", error);
      throw new Error(`Cập nhật danh mục thất bại: ${error.message || error}`);
    }
  },

  deleteCategory: async (id: string): Promise<void> => {
    try {
      await api.delete(`/categories/${id}`);
      console.log(`Category with ID (${id}) deleted successfully.`);
    } catch (error: any) {
      console.error("Delete category failed:", error);
      throw new Error(`Xóa danh mục thất bại: ${error.message || error}`);
    }
  },
}

export default categoryApi;
