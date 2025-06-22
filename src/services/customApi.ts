import { OrderCustomResponse } from "@/model/OrderCustom";
import api from "./api";
import { APIResponse } from "@/model/APIResponse";

export default {
  createOrder: async (
    quantity: number,
    description: string,
    files: File[]
  ): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // ✅ Append từng file vào key "files" (phải trùng với tên @RequestParam trong controller)
    files.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("quantity", quantity.toString());
    formData.append("description", description);

    const response = await api.post<APIResponse<OrderCustomResponse>>(
      "/order-custom/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.result;
  },

  getOrderCustoms: async (): Promise<OrderCustomResponse[]> => {
    const token = localStorage.getItem("token");
    const response = await api.get<APIResponse<OrderCustomResponse[]>>(
      "/order-custom",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.result;
  },

  getMyOrdersCustom: async (): Promise<OrderCustomResponse[]> => {
    const token = localStorage.getItem("token");
    const response = await api.get<APIResponse<OrderCustomResponse[]>>(
      "/order-custom/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("My Orders Custom Response:", response);
    return response.result;
  },

  getOrderCustomById: async (id: string): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const response = await api.get<APIResponse<OrderCustomResponse>>(
      `/order-custom/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get Order Custom by ID Response:", response);
    return response.result;
  },

  confirmOrderCustom: async (id: string): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const response = await api.put<APIResponse<OrderCustomResponse>>(
      `/order-custom/${id}/confirm`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Confirm Order Custom Response:", response);
    return response.result;
  },

  payOrderCustom: async (id: string): Promise<void> => {
    const token = localStorage.getItem("token");
    await api.put(
      `/order-custom/${id}/pay`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
  cancelOrderCustom: async (id: string): Promise<void> => {
    const token = localStorage.getItem("token");
    await api.put(
      `/order-custom/${id}/cancel`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  },
};
