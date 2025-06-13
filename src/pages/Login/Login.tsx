import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram, FaPrint } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@/context/UserContext";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUsername } = useUser();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      showToast("error", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8080/api/auth/login", form);
      const token = data.result.token;
      const username = data.result.username;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);

      setUsername(username); // set username trong context để Header nhận

      showToast("success", "Đăng nhập thành công!");
      setTimeout(() => navigate("/homepage"), 3000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Đăng nhập thất bại";
      setError(msg);
      showToast("error", msg);
    } finally {
      setLoading(false);
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
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full text-black"
                disabled={loading}
            />
            <Input
                name="password"
                type="password"
                placeholder="Mật khẩu"
                value={form.password}
                onChange={handleChange}
                className="w-full text-black"
                disabled={loading}
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
              disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
