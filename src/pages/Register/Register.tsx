import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { register } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    try {
      await register({
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });
      alert("Đăng ký thành công! Kiểm tra email để xác minh.");

      // ✅ Điều hướng sang trang xác thực email và truyền email nếu muốn
      navigate("/verify", { state: { email: form.email } });

    } catch (error: any) {
      alert("Lỗi: " + (error.response?.data?.message || "Đăng ký thất bại"));
    }
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 font-serif">Đăng ký</h2>
            <p className="text-sm text-gray-600 font-sans mt-1">Tạo tài khoản mới để bắt đầu</p>
          </div>

          <div className="space-y-4">
            <Input placeholder="Tên người dùng" name="username" value={form.username} onChange={handleChange} />
            <Input placeholder="Email" name="email" value={form.email} onChange={handleChange} />
            <Input type="password" placeholder="Mật khẩu" name="password" value={form.password} onChange={handleChange} />
            <Input type="password" placeholder="Nhập lại mật khẩu" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          </div>

          <Button className="w-full bg-black text-white mt-6 hover:bg-gray-800 font-semibold" onClick={handleSubmit}>
            Tạo tài khoản
          </Button>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-600">Đã có tài khoản?</span>{" "}
            <Link to="/login" className="text-black hover:underline font-medium">Đăng nhập</Link>
          </div>
        </div>
      </div>
  );
};
