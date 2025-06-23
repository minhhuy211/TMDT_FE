import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaPrint } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import authApi from "@/services/authApi";
import { ForgotPasswordRequest } from "@/model/Authentication";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: authApi.forgotPassword,
    onSuccess: () => {
      setMessage("✅ Mã xác minh đã được gửi về email của bạn. Đang chuyển trang tới trang xác minh...");
      setError("");
      setTimeout(() =>  navigate("/verify-reset-password"), 3000);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || "Gửi mã thất bại");
      setMessage("");
    },
  });

  const handleSendResetCode = () => {
    const request: ForgotPasswordRequest = { email };
    localStorage.setItem("forgot_password_email", email);
    mutation.mutate(request); // Gọi mutation
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaPrint className="text-black text-xl" />
            <h3 className="text-lg font-bold text-black font-mono">
              CustomPrint
            </h3>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 font-serif">
            Quên mật khẩu
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1">
            Nhập email hoặc tên đăng nhập để nhận hướng dẫn đặt lại mật khẩu
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <Input
            className="w-full text-black"
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Gửi yêu cầu */}
        <Button
          onClick={handleSendResetCode}
          disabled={mutation.isPending}
          className="w-full bg-black text-white mt-6 hover:bg-gray-800 font-semibold"
        >
          {mutation.isPending ? "Đang gửi..." : "Gửi yêu cầu đặt lại mật khẩu"}
        </Button>

        {message && <p className="text-green-600 mt-3">{message}</p>}
        {error && <p className="text-red-600 mt-3">{error}</p>}

        {/* Link quay lại đăng nhập */}
        <div className="text-center text-sm mt-6">
          <span className="text-gray-600">Đã nhớ mật khẩu?</span>{" "}
          <Link to="/login" className="text-black hover:underline font-medium">
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};
