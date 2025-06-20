import { useQuery } from "@tanstack/react-query";
import userApi from "@/services/userApi";
import type { UserResponse } from "@/model/User";
import Sidebar from "./sidebar";
import React, { useState, useEffect } from "react";

const ProfilePage: React.FC = () => {
    // Lấy profile giống Header
    const { data: user, isLoading } = useQuery<UserResponse>({
        queryKey: ["me"],
        queryFn: userApi.getMyInfo,
        refetchOnWindowFocus: false,
    });

    // Quản lý ngày sinh và avatar trong local state (nếu muốn cho phép sửa)
    const [dob, setDob] = useState("");
    const [avatar, setAvatar] = useState<File | null>(null);

    useEffect(() => {
        setDob(user?.dob || "");
    }, [user?.dob]);

    const handleSave = () => {
        alert("Đã lưu thông tin!");
        // TODO: gọi API cập nhật nếu cần
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };

    if (isLoading) return <div className="p-10">Đang tải thông tin...</div>;
    if (!user) return <div className="p-10 text-red-500">Không tìm thấy thông tin tài khoản.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar />

            <main className="flex-1 bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold text-black mb-6">Hồ sơ của tôi</h1>
                <p className="text-sm text-gray-600 mb-4">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>

                <div className="space-y-4 max-w-xl">
                    {/* Tên đăng nhập */}
                    <div>
                        <label className="block font-semibold text-black">Tên đăng nhập</label>
                        <input
                            type="text"
                            value={user.username}
                            disabled
                            className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-semibold text-black">Email</label>
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block font-semibold text-black">Số điện thoại</label>
                        {user.phoneNumber ? (
                            <input
                                type="text"
                                value={user.phoneNumber}
                                disabled
                                className="w-full p-2 border border-gray-400 rounded text-black bg-gray-100"
                            />
                        ) : (
                            <button className="p-2 border border-black rounded text-sm text-black hover:bg-gray-200">
                                Thêm
                            </button>
                        )}
                    </div>

                    {/* Ngày sinh */}
                    <div>
                        <label className="block font-semibold text-black">Ngày sinh</label>
                        <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>

                    {/* Ảnh đại diện */}
                    <div className="flex items-start gap-6 mt-4">
                        <div>
                            <label className="block font-semibold text-black mb-2">Ảnh đại diện</label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange} />
                            <p className="text-xs text-gray-500 mt-1">
                                Dung lượng tối đa 1 MB. Định dạng: .JPEG, .PNG
                            </p>
                        </div>
                        {avatar && (
                            <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                className="w-24 h-24 object-cover rounded border border-black"
                            />
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
