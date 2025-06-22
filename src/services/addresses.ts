import { API_BASE_URL } from "@/services/api";

// Kiểu dữ liệu address chuẩn (tùy backend trả về)
export interface Address {
    id: string;    // UUID
    name: string;  // Tên người nhận
    street: string;
    city?: string;
}


const getAddresses = async (): Promise<Address[]> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/addresses/mine`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Không lấy được danh sách địa chỉ");
    const data = await res.json();
    if ("result" in data) return data.result as Address[];
    return data as Address[];
};

// Thêm địa chỉ mới
const addAddress = async (address: Omit<Address, "id">): Promise<Address> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
    });
    if (!res.ok) throw new Error("Không thêm được địa chỉ");
    const data = await res.json();
    // Nếu backend trả về { code, result }
    if ("result" in data) return data.result as Address;
    return data as Address;
};
const deleteAddress = async (id: string): Promise<void> => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Không xóa được địa chỉ");
};

export const addressApi = {
    getAddresses,
    addAddress,
    deleteAddress
};
