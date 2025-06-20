import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/services/userApi";
import type { UserResponse, UserUpdateRequest } from "@/model/User";
import Sidebar from "./sidebar";
import React, { useState, useEffect } from "react";

const ProfilePage: React.FC = () => {
    const queryClient = useQueryClient();

    // Lấy user
    const { data: user, isLoading } = useQuery<UserResponse>({
        queryKey: ["me"],
        queryFn: userApi.getMyInfo,
        refetchOnWindowFocus: false,
    });

    // Local state cho form
    const [dob, setDob] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Mutation update user info
    const updateUserMutation = useMutation({
        mutationFn: (data: UserUpdateRequest) => userApi.updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            alert("Cập nhật thông tin thành công!");
        },
        onError: (err: any) => {
            alert("Lỗi cập nhật: " + (err?.response?.data?.message || "Không xác định"));
        }
    });

    // Mutation upload avatar
    const uploadAvatarMutation = useMutation({
        mutationFn: (file: File) => userApi.uploadAvatar(file),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            alert("Cập nhật ảnh đại diện thành công!");
        },
        onError: (err: any) => {
            alert("Lỗi cập nhật avatar: " + (err?.response?.data?.message || "Không xác định"));
        }
    });

    useEffect(() => {
        if (user) {
            setDob(user.dob || "");
            setPhone(user.phoneNumber || "");
            setPreview(user.avatarUrl || null); // Nếu backend trả về avatarUrl
        }
    }, [user]);

    // Xử lý chọn ảnh
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
            setPreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    // Xử lý lưu thông tin
    const handleSave = async () => {
        setLoading(true);
        // Update số điện thoại và ngày sinh
        await updateUserMutation.mutateAsync({
            phoneNumber: phone,
            dob: dob,
        });
        // Nếu có file ảnh thì upload
        if (avatar) {
            await uploadAvatarMutation.mutateAsync(avatar);
            setAvatar(null);
        }
        setLoading(false);
    };

    if (isLoading) return <div className="p-10">Đang tải thông tin...</div>;
    if (!user) return <div className="p-10 text-red-500">Không tìm thấy thông tin tài khoản.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />
            <main className="flex-1 bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold text-black mb-6">Hồ sơ của tôi</h1>
                <p className="text-sm text-gray-600 mb-4">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                <div className="space-y-4 max-w-xl">
                    <div>
                        <label className="block font-semibold text-black">Tên đăng nhập</label>
                        <input type="text" value={user.username} disabled className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black" />
                    </div>
                    <div>
                        <label className="block font-semibold text-black">Email</label>
                        <input type="email" value={user.email} disabled className="w-full p-2 border border-gray-400 rounded text-black" />
                    </div>
                    <div>
                        <label className="block font-semibold text-black">Số điện thoại</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                            maxLength={15}
                        />
                    </div>
                    <div>
                        <label className="block font-semibold text-black">Ngày sinh</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>
                    <div className="flex items-start gap-6 mt-4">
                        <div>
                            <label className="block font-semibold text-black mb-2">Ảnh đại diện</label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} />
                            <p className="text-xs text-gray-500 mt-1">
                                Dung lượng tối đa 1 MB. Định dạng: .JPEG, .PNG
                            </p>
                        </div>
                        {preview && (
                            <img
                                src={preview}
                                alt="avatar"
                                className="w-24 h-24 object-cover rounded border border-black"
                            />
                        )}
                    </div>
                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
                            disabled={loading || updateUserMutation.isPending || uploadAvatarMutation.isPending}
                        >
                            {loading ? "Đang lưu..." : "Lưu"}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
