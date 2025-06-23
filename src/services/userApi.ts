import api from "./api";
import type {
  CreateStaffRequest,
  UserCreationRequest,
  UserResponse,
  UserUpdateRequest,
} from "@/model/User";
import type { APIResponse } from "@/model/APIResponse";
import { ResetPasswordRequest } from "@/model/Authentication";


// @ts-ignore
export default {
  // getUsers: () => api.get<APIResponse<UserResponse[]>>("/users"),
  // addUser: (user: UserCreationRequest) => api.post<UserResponse>("/users", user),
  // updateUser: (id: string, user: UserUpdateRequest) => api.put<UserResponse>(`/users/${id}`, user),

  getUsers: async (): Promise<UserResponse[]> => {
    const token = localStorage.getItem("token");
    const response = await api.get<APIResponse<UserResponse[]>>("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(response);
    return response.result; // Trả về mảng người dùng từ `result`
  },

  getMyInfo: async (): Promise<UserResponse> => {
    const token = localStorage.getItem("token");  // Lấy token từ localStorage
    console.log("Token:", token);  // Kiểm tra xem token có được lấy đúng không

    const response = await api.get<APIResponse<UserResponse>>(`/users/myInfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.code === 401) {
      alert("Token hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    console.log(response);
    return response.result;  // Trả về dữ liệu người dùng
  },

  addUser: async (user: UserCreationRequest): Promise<UserResponse> => {
    const response = await api.post<APIResponse<UserResponse>>("/auth/signup", user);
    console.log(response);
    return response.result; // Trả về người dùng đã được tạo
  },
  uploadAvatar: async (file: File): Promise<UserResponse> => {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<APIResponse<UserResponse>>(
        "/users/me/avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
    );

    return response.result;
  },

  updateUser: async (
      user: UserUpdateRequest
  ): Promise<UserResponse> => {
    const token = localStorage.getItem("token");
    const response = await api.put<APIResponse<UserResponse>>("/users/me/update", user,{
          headers: {
            Authorization: `Bearer ${token}`,  // Đảm bảo token được gửi chính xác
          },
          withCredentials: true,
        }
    );
    return response.result; // Trả về người dùng đã được cập nhật
  },
  changePassword: async (request: ResetPasswordRequest): Promise<void> => {
    await api.post("/users/change-password",  request );
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
  createStaff: async (staff: CreateStaffRequest): Promise<UserResponse> => {
    const token = localStorage.getItem("token");

    const response = await api.post<APIResponse<UserResponse>>(
        "/users/create-staff",
        staff,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
    );

    return response.result;
  },
};
