import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import authApi from "@/services/authApi";
import { ResetPasswordRequest } from "@/model/Authentication";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const storedEmail = localStorage.getItem("forgot_password_email");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!storedEmail) {
      navigate("/forgot-password");
    }
  }, [storedEmail, navigate]);

  const mutation = useMutation({
    mutationFn: authApi.resetPassword,
    onSuccess: () => {
        localStorage.removeItem("forgot_password_email"); // Xoá email sau khi reset mật khẩu
      setMessage(
        "✅ Đặt lại mật khẩu thành công. Vui lòng đăng nhập. Đang chuyển trang..."
      );
      setError("");
      setTimeout(() => navigate("/login"), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Đặt lại mật khẩu thất bại");
      setMessage("");
    },
  });

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp.");
      return;
    }
    const request: ResetPasswordRequest = {
      email: storedEmail!,
      newPassword,
      confirmPassword,
    };
    mutation.mutate(request);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Đặt lại mật khẩu
        </h2>

        <div className="space-y-4">
          <Input
            id="email"
            type="email"
            value={storedEmail || ""}
            readOnly
            className="bg-gray-100 text-gray-700 cursor-not-allowed"
          />

          <Input
            type="password"
            placeholder="Mật khẩu mới"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <Button
          onClick={handleResetPassword}
          disabled={mutation.isPending}
          className="w-full mt-6 bg-black text-white hover:bg-gray-800"
        >
          {mutation.isPending ? "Đang xử lý..." : "Đặt lại mật khẩu"}
        </Button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
