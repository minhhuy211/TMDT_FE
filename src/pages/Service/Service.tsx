"use client"

import type React from "react"
import { useState, useCallback } from "react" // Added useCallback
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { UploadCloud, FileText } from "lucide-react" // Added Lucide icons for visual feedback

export const Service = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    designFile: null as File | null,
  })
  const [isDragging, setIsDragging] = useState(false) // State for drag-and-drop visual feedback

  // Xử lý thay đổi input (for traditional file input)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement

    if (name === "designFile" && files && files.length > 0) {
      setFormData({
        ...formData,
        designFile: files[0],
      })
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  // Xử lý kéo thả file
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        designFile: e.dataTransfer.files[0],
      }))
      e.dataTransfer.clearData()
    }
  }, [])

  // Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("Form Data Submitted:", formData)
    if (formData.designFile) {
      alert(`Cảm ơn bạn! Ý kiến và file thiết kế "${formData.designFile.name}" của bạn đã được gửi.`)
    } else {
      alert("Cảm ơn bạn! Ý kiến của bạn đã được gửi.")
    }

    // Optionally reset the form
    setFormData({
      name: "",
      phone: "",
      message: "",
      designFile: null,
    })
  }

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 py-12">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Yêu Cầu Dịch Vụ & Liên Hệ</h2>
            <p className="text-base text-gray-600 mt-2">
              Vui lòng điền thông tin và tải lên bản thiết kế của bạn để chúng tôi có thể hỗ trợ tốt nhất.
            </p>
            <p className="text-sm text-gray-500 mt-1">Chúng tôi sẽ liên hệ qua Zalo của bạn để xác nhận yêu cầu.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên của bạn
              </label>
              <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nhập tên của bạn"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full text-black"
                  required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại của bạn
              </label>
              <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full text-black"
                  required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Ý kiến/Phản hồi của bạn
              </label>
              <textarea
                  id="message"
                  name="message"
                  placeholder="Mô tả yêu cầu hoặc ý kiến của bạn"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-y"
              />
            </div>
            <div>
              <label htmlFor="designFile" className="block text-sm font-medium text-gray-700 mb-1">
                Tải lên bản thiết kế (tùy chọn)
              </label>
              <div
                  className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-md cursor-pointer transition-colors duration-200
                ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400"}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById("designFile")?.click()} // Trigger hidden input click
              >
                {formData.designFile ? (
                    <div className="flex items-center gap-2 text-gray-700">
                      <FileText className="w-6 h-6" />
                      <span className="text-base font-medium">{formData.designFile.name}</span>
                    </div>
                ) : (
                    <>
                      <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 text-center">
                        Kéo và thả file vào đây hoặc <span className="text-blue-600 font-semibold">nhấn để chọn file</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Hỗ trợ các định dạng: JPG, PNG, PDF, STL, OBJ, v.v.</p>
                    </>
                )}
                <input
                    id="designFile"
                    name="designFile"
                    type="file"
                    onChange={handleInputChange}
                    className="hidden" // Hide the actual input
                    aria-hidden="true" // Hide from screen readers as it's controlled by the div
                />
              </div>
              {formData.designFile && (
                  <p className="text-sm text-gray-500 mt-2">Đã chọn file: {formData.designFile.name}</p>
              )}
            </div>
            <Button
                type="submit"
                className="w-full bg-black text-white mt-4 hover:bg-gray-800 font-semibold py-2.5 text-base"
            >
              Gửi Yêu Cầu
            </Button>
          </form>

          {/* Thông tin về công ty */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thông Tin Công Ty</h3>
            <p className="text-gray-700 leading-relaxed">
              Chúng tôi chuyên cung cấp các sản phẩm in 3D chất lượng cao và dịch vụ thiết kế đồ họa chuyên nghiệp. Với
              đội ngũ nhân viên tận tâm và nhiều năm kinh nghiệm, chúng tôi cam kết mang đến cho bạn những sản phẩm và
              giải pháp tốt nhất, đáp ứng mọi yêu cầu từ mô hình anime, phụ kiện gaming đến các dự án tùy chỉnh.
            </p>
          </div>
        </div>
      </div>
  )
}
