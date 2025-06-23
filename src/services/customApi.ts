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
  quoteOrderCustom: async (
    id: string,
    price: number
  ): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const payload = {
      id,
      price,
    };

    const response = await api.put<APIResponse<OrderCustomResponse>>(
      "/order-custom/quote",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

  getOrderCustomsByStatus: async (
    status: string
  ): Promise<OrderCustomResponse[]> => {
    const token = localStorage.getItem("token");
    const response = await api.get<APIResponse<OrderCustomResponse[]>>(
      `/order-custom/me/status?status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Get Order Customs by Status Response:", response);
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

  payOrderCustom: async (id: string): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const response = await api.post<APIResponse<OrderCustomResponse>>(
      `/order-custom/${id}/pay`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.result;
  },

  cancelOrderCustom: async (id: string): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");
    const response = await api.put<APIResponse<OrderCustomResponse>>(
      `/order-custom/${id}/cancel`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.result;
  },

  rejectOrderCustom: async (
    id: string,
    status: string
  ): Promise<OrderCustomResponse> => {
    const token = localStorage.getItem("token");

    // Kiểm tra trạng thái hợp lệ trước khi gọi API
    const validStatuses = ["PENDING_QUOTE", "QUOTED", "AWAITING_PAYMENT"];
    if (!validStatuses.includes(status)) {
      throw new Error(
        "Đơn hàng này không thể từ chối vì trạng thái không hợp lệ."
      );
    }

    const payload = {
      id,
      status: "REJECTED", // Trạng thái "REJECTED" khi từ chối
    };

    try {
      const response = await api.put<APIResponse<OrderCustomResponse>>(
        "/order-custom/reject",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Nếu API trả về kết quả thành công, trả lại kết quả đơn hàng
      return response.result;
    } catch (error: any) {
      if (error.response) {
        // Xử lý mã lỗi từ API nếu có
        const { code, message } = error.response.data;
        if (code === 1012) {
          // Nếu trạng thái không tồn tại hoặc không hợp lệ
          throw new Error(
            "Đơn hàng không tồn tại hoặc đã có trạng thái không hợp lệ."
          );
        }
        throw new Error(
          message || "Đã xảy ra lỗi khi từ chối đơn hàng. Vui lòng thử lại."
        );
      } else {
        // Xử lý lỗi không xác định (kết nối mạng, v.v.)
        throw new Error(
          "Lỗi không xác định. Vui lòng kiểm tra lại kết nối mạng."
        );
      }
    }
  },
};
