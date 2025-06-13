import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export const Contact = () => {
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
    alert("Cảm ơn bạn! Tin nhắn của bạn đã được gửi.");
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">Liên Hệ</h2>
            <p className="text-sm text-gray-600 mt-1">
              Vui lòng điền vào biểu mẫu dưới đây và chúng tôi sẽ phản hồi bạn sớm nhất có thể.
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
                placeholder="Tin nhắn của bạn"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-md"
            />
            <Button
                type="submit"
                className="w-full bg-black text-white mt-4 hover:bg-gray-800 font-semibold"
            >
              Gửi Liên Hệ
            </Button>
          </form>

          {/* Thông tin liên hệ */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900">Thông Tin Liên Hệ</h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-gray-600" />
                <span className="text-gray-600">support@yourdomain.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-gray-600" />
                <span className="text-gray-600">+84 123 456 789</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
