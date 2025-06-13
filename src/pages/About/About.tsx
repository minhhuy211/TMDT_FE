import React, { useState } from "react";
import { Input } from "../../components/ui/input"; // Đảm bảo đã tạo Input component
import { Button } from "../../components/ui/button"; // Đảm bảo đã tạo Button component

export const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Xử lý thay đổi input
  const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả sử gửi form thành công
    alert("Cảm ơn bạn! Ý kiến của bạn đã được gửi.");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Giới Thiệu</h2>
            <p className="text-sm text-gray-600 mt-1">
              Chúng tôi là một công ty chuyên cung cấp các sản phẩm chất lượng cao. Vui lòng điền thông tin vào biểu mẫu dưới đây để liên hệ với chúng tôi.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                name="name"
                type="text"
                placeholder="Tên của bạn"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full text-black"
            />
            <Input
                name="email"
                type="email"
                placeholder="Email của bạn"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full text-black"
            />
            <textarea
                name="message"
                placeholder="Ý kiến/Phản hồi của bạn"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md"
            />
            <Button
                type="submit"
                className="w-full bg-black text-white mt-4 hover:bg-gray-800 font-semibold"
            >
              Gửi Ý Kiến
            </Button>
          </form>

          {/* Thông tin về công ty */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Thông Tin Công Ty</h3>
            <p className="mt-2 text-gray-600">
              Chúng tôi cung cấp các sản phẩm in ấn và dịch vụ thiết kế đồ họa chuyên nghiệp. Với đội ngũ nhân viên tận tâm và nhiều năm kinh nghiệm, chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng nhất.
            </p>
          </div>
        </div>
      </div>
  );
};
