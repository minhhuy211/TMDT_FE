import type { APIResponse } from "@/model/APIResponse";
import type { Product, ProductResponse, ProductStatus } from "@/model/Product";
import api from "./api";

export default {
    // Lấy tất cả sản phẩm
    getAllProducts: async (): Promise<ProductResponse[]> => {
        const response = await api.get<APIResponse<ProductResponse[]>>("/products");
        console.log(response);
        return response.result;
    },

    getProducts: async (limit: number, offset: number): Promise<ProductResponse[]> => {
        const response = await api.get<APIResponse<ProductResponse[]>>("/products", {
          params: { limit, offset },
        });
        console.log("response.data", response);
        return response.result;
      },

    // Lấy sản phẩm theo ID
    getProductById: async (id: string): Promise<Product> => {
        const response = await api.get<APIResponse<Product>>(`/products/${id}`);
        console.log("Full API response: ", response);
        return response.result;
    },



    // Lấy sản phẩm theo categoryId (theo đúng endpoint backend)
    getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
        const response = await api.get<APIResponse<Product[]>>(`categories/${categoryId}`);

        return response.result;
    },

    // Tạo sản phẩm mới
    createProduct: async (productData: Partial<Product>): Promise<Product> => {
        const response = await api.post<APIResponse<Product>>("/products", productData);
        return response.result;
    },

    // Cập nhật sản phẩm theo ID
    updateProduct: async (id: string, productData: Partial<Product>): Promise<Product> => {
        const response = await api.put<APIResponse<Product>>(`/products/${id}`, productData);
        console.log(response);
        return response.result;
    },

    // Xóa sản phẩm theo ID
    deleteProduct: async (id: string): Promise<Product> => {
        const response = await api.delete<APIResponse<Product>>(`/products/${id}`);
        return response.result;
    },

    // Cập nhật trạng thái sản phẩm
    updateStatus: async (productId: string, status: ProductStatus): Promise<void> => {
        await api.patch(`/products/${productId}/status`, { status });
    },

    // Lấy top sản phẩm mới nhất
    getNewProducts: async (limit: number = 6): Promise<ProductResponse[]> => {
        const response = await api.get<APIResponse<ProductResponse[]>>("/products/newProduct", {
        params: { limit },
    });
        return response.result;
    },


};
