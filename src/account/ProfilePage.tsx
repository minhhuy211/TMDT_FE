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
      <main className="flex-1 p-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hồ sơ cá nhân
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Cập nhật thông tin để bảo vệ tài khoản của bạn
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Họ
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={15}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Ảnh đại diện
                </label>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500"
                />
                {preview && (
                  <div className="mt-3">
                    <img
                      src={preview}
                      alt="Avatar preview"
                      className="w-24 h-24 rounded-full object-cover border shadow"
                      style={{ aspectRatio: "1 / 1" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <AddressSection />
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={handleSave}
              disabled={
                loading ||
                updateUserMutation.isPending ||
                uploadAvatarMutation.isPending
              }
              className="inline-block bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-60"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
