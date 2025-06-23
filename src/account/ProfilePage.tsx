import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "@/services/userApi";
import type { UserResponse, UserUpdateRequest } from "@/model/User";
import Sidebar from "./sidebar";
import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@/services/api";
import AddressSection from "@/account/AddressSection";

const ProfilePage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<UserResponse>({
    queryKey: ["me"],
    queryFn: userApi.getMyInfo,
    refetchOnWindowFocus: false,
  });

  // State cho form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateUserMutation = useMutation({
    mutationFn: (data: UserUpdateRequest) => userApi.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      alert("Cập nhật thông tin thành công!");
    },
    onError: (err: any) => {
      alert(
        "Lỗi cập nhật: " + (err?.response?.data?.message || "Không xác định")
      );
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => userApi.uploadAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
      alert("Cập nhật ảnh đại diện thành công!");
    },
    onError: (err: any) => {
      alert(
        "Lỗi cập nhật avatar: " +
          (err?.response?.data?.message || "Không xác định")
      );
    },
  });

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setDob(user.dob || "");
      setPhone(user.phoneNumber || "");
      if (user.avatarUrl) {
        if (user.avatarUrl.startsWith("http")) {
          setPreview(user.avatarUrl);
        } else {
          setPreview(API_BASE_URL + user.avatarUrl);
        }
      } else {
        setPreview(null);
      }
      localStorage.setItem("user_email", user.email);
    }
  }, [user]);

  // Chọn ảnh mới
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Lưu cập nhật
  const handleSave = async () => {
    setLoading(true);
    try {
      await updateUserMutation.mutateAsync({
        firstName,
        lastName,
        phoneNumber: phone,
        dob: dob,
      });
      if (avatar) {
        await uploadAvatarMutation.mutateAsync(avatar);
        setAvatar(null);
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div className="p-10">Đang tải thông tin...</div>;
  if (!user)
    return (
      <div className="p-10 text-red-500">
        Không tìm thấy thông tin tài khoản.
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar />
      <main className="flex-1 bg-white p-6 rounded shadow">
        <h1 className="text-xl font-bold text-black mb-6">Hồ sơ của tôi</h1>
        <p className="text-sm text-gray-600 mb-4">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </p>
        <div className="space-y-4 max-w-xl">
          {/* Ảnh đại diện */}
          <div className="flex items-start gap-6 mt-4">
            <div>
              <label className="block font-semibold text-black mb-2">
                Ảnh đại diện
              </label>
              <input
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileChange}
              />
              <p className="text-xs text-gray-500 mt-1">
                Dung lượng tối đa 1 MB. Định dạng: .JPEG, .PNG
              </p>
            </div>
            {preview && (
              <img
                src={
                  preview ||
                  (user?.avatarUrl
                    ? `http://localhost:8080${user.avatarUrl}`
                    : "/placeholder-avatar.png")
                }
                alt="Avatar"
                className="w-24 h-24 rounded-full object-cover border mx-auto"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            )}
          </div>
          {/* Username (readonly) */}
          <div>
            <label className="block font-semibold text-black">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={user.username}
              disabled
              className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
            />
          </div>
          {/* Email (readonly) */}
          <div>
            <label className="block font-semibold text-black">Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
            />
          </div>
          {/* Họ */}
          <div>
            <label className="block font-semibold text-black">Họ</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded text-black"
            />
          </div>
          {/* Tên */}
          <div>
            <label className="block font-semibold text-black">Tên</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded text-black"
            />
          </div>
          {/* Số điện thoại */}
          <div>
            <label className="block font-semibold text-black">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded text-black"
              maxLength={15}
            />
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
          <div className="mt-10">
            <AddressSection />
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 disabled:opacity-60"
              disabled={
                loading ||
                updateUserMutation.isPending ||
                uploadAvatarMutation.isPending
              }
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
