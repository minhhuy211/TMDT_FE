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
    createProduct: async (productData: Partial<Product> & { file?: File | null }): Promise<Product> => {
        const formData = new FormData();

        if (productData.productName) formData.append("productName", productData.productName);
        if (productData.description) formData.append("description", productData.description);
        if (productData.price !== undefined) formData.append("price", productData.price.toString());
        if (productData.stock !== undefined) formData.append("stock", productData.stock.toString());
        if (productData.category?.cate_ID) formData.append("cate_ID", productData.category.cate_ID);
        if (productData.status) formData.append("status", productData.status);

        if (productData.file) formData.append("file", productData.file);

        const response = await api.post<APIResponse<Product>>("/products", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.result;
    },
    updateProduct: async (
        id: string,
        productData: Partial<Product> & { file?: File | null }
    ): Promise<Product | null> => {
        const formData = new FormData();
        formData.append("productName", productData.productName ?? "");
        formData.append("description", productData.description ?? "");
        formData.append("price", productData.price?.toString() ?? "0");
        formData.append("stock", productData.stock?.toString() ?? "0");

        const cateId = productData.cate_ID ?? productData.category?.cate_ID;
        if (!cateId) throw new Error("cate_ID không được để trống");
        formData.append("cate_ID", cateId);

        if (productData.file) {
            formData.append("file", productData.file);
        } else if (productData.urlImage) {
            formData.append("urlImage", productData.urlImage); // 👈 giữ ảnh cũ
        }

        try {
            const responseData = await api.put(`/products/${id}`, formData);
            console.log("Full response data:", responseData);

            if (!responseData) throw new Error("No data in response");

            if ("result" in responseData) {
                return responseData.result;
            }

            return responseData as Product;
        } catch (error: any) {
            if (error.response) {
                console.error("Error response data:", error.response.data);
                console.error("Error response status:", error.response.status);
            } else {
                console.error("Error message:", error.message);
            }
            throw error;
        }
    }
,
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
