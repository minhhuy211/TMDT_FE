    import React, { useState } from "react";
    import Sidebar from "./sidebar";
    import { ResetPasswordRequest } from "@/model/Authentication";
    import { useMutation } from "@tanstack/react-query";
    import userApi from "@/services/userApi";

    const ChangePassword: React.FC = () => {
    const email = localStorage.getItem("user_email");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const mutation = useMutation({
        mutationFn: userApi.changePassword,
        onSuccess: () => {
            console.log("Đặt lại mật khẩu thành công");
            localStorage.removeItem("user_email"); // Xoá email sau khi đổi mật khẩu
        setMessage("Đặt lại mật khẩu thành công");
        setError("");
        },
        onError: (err: any) => {
        setError(err.response?.data?.message || "Đặt lại mật khẩu thất bại");
        setMessage("");
        },
    });

    const handleChangePassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 🛑 Chặn reload
        if (newPassword !== confirmPassword) {
          setError("❌ Mật khẩu xác nhận không khớp.");
          return;
        }
      
        const request: ResetPasswordRequest = {
          email: email || "",
          newPassword,
          confirmPassword,
        };
        mutation.mutate(request);
      };

    return (
        <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar bên trái */}
        <Sidebar />

        {/* Form đổi mật khẩu */}
        <main className="flex-1 bg-white p-6 rounded shadow max-w-md mx-auto">
            <h1 className="text-xl font-bold text-black mb-4">Đổi Mật Khẩu</h1>
            <p className="text-sm text-gray-600 mb-6">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
            </p>

            <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
                <label className="block font-semibold text-black mb-1">
                Mật khẩu mới
                </label>
                <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded text-black"
                required
                />
            </div>

            <div>
                <label className="block font-semibold text-black mb-1">
                Xác nhận mật khẩu
                </label>
                <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-400 rounded text-black"
                required
                />
            </div>
            {message && <p className="text-green-600 mt-3">{message}</p>}
            {error && <p className="text-red-600 mt-3">{error}</p>}

            <button
                type="submit"
                className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
            >
                Đổi mật khẩu
            </button>
            </form>
        </main>
        </div>
    );
    };

    export default ChangePassword;
