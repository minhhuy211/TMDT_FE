import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram, FaPrint } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form);
      const token = response.data.result.token;
      const username = response.data.result.username;  // Lấy username từ response

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);       // Lưu username vào localStorage

      console.log(username);
      // Hiện toast thành công
      setToast({ type: "success", message: "Đăng nhập thành công!" });

      // Tự động ẩn toast sau 3s và chuyển hướng
      setTimeout(() => {
        setToast(null);
        navigate("/homepage");
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Đăng nhập thất bại");

      // Hiện toast lỗi
      setToast({ type: "error", message: err.response?.data?.message || "Đăng nhập thất bại" });
      setTimeout(() => setToast(null), 3000);
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 relative">

        {toast && (
            <div
                className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white font-semibold
      ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
      animate-slideBounce
    `}
                style={{ zIndex: 1000 }}
            >
              {toast.message}
            </div>
        )}


        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaPrint className="text-black text-xl" />
              <h3 className="text-lg font-bold text-black font-mono">CustomPrint</h3>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 font-serif">Welcome Back</h2>
            <p className="text-sm text-gray-600 font-sans mt-1">Đăng nhập để tiếp tục</p>
          </div>

          <div className="space-y-4">
            <Input
                name="email"
                placeholder="Email"
                className="w-full text-black"
                value={form.email}
                onChange={handleChange}
                type="email"
            />
            <Input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                className="w-full text-black"
                value={form.password}
                onChange={handleChange}
            />
          </div>

          <Link
              to="/forgot-password"
              className="text-right text-sm text-gray-700 hover:underline mt-2 cursor-pointer block"
          >
            Quên mật khẩu?
          </Link>

          {error && <p className="text-red-600 mt-2">{error}</p>}

          <Button
              onClick={handleSubmit}
              className="w-full bg-black text-white mt-4 hover:bg-gray-800 font-semibold"
          >
            Đăng nhập
          </Button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Chưa có tài khoản?</span>{" "}
            <Link to="/register" className="text-black hover:underline font-medium">
              Đăng ký
            </Link>
          </div>

          <div className="flex justify-center mt-6 space-x-6 text-xl text-gray-800">
            <FaFacebook className="hover:scale-110 transition-transform cursor-pointer" />
            <FaGoogle className="hover:scale-110 transition-transform cursor-pointer" />
            <FaInstagram className="hover:scale-110 transition-transform cursor-pointer" />
          </div>
        </div>
      </div>
  );
};
