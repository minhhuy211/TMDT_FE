import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import customApi from "@/services/customApi";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiTrash2, FiImage, FiFileText, FiHash } from "react-icons/fi";

const UploadDesignPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [previews, setPreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: async () => {
      if (files.length === 0) throw new Error("Chưa chọn ảnh thiết kế");
      return await customApi.createOrder(quantity, description, files);
    },
    onSuccess: (data) => {
      alert("Tạo đơn hàng thành công!");
      console.log("Đơn hàng:", data);
      setFiles([]);
      setPreviews([]);
      setQuantity(1);
      setDescription("");
      navigate("/my-orders-custom");
    },
    onError: (err: any) => alert(err.message || "Tạo đơn thất bại"),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const imageFiles = Array.from(selectedFiles).filter((file) =>
          file.type.startsWith("image/")
      );

      if (imageFiles.length !== selectedFiles.length) {
        alert("Chỉ cho phép upload ảnh (png, jpg, jpeg)");
      }

      setFiles((prev) => [...prev, ...imageFiles]);
      const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }

    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
      <div className="max-w-3xl mx-auto my-12 bg-white shadow-2xl rounded-2xl p-10">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          Tải thiết kế của bạn lên
        </h2>

        <div className="space-y-6">
          <label className="flex items-center gap-3 cursor-pointer text-blue-600 font-medium hover:underline">
            <FiImage /> Chọn ảnh thiết kế
            <input
                type="file"
                accept=".png,.jpg,.jpeg"
                multiple
                onChange={handleFileChange}
                className="hidden"
            />
          </label>

          {previews.length > 0 && (
              <div className="flex gap-3 flex-wrap">
                {previews.map((src, idx) => (
                    <div key={idx} className="relative group shadow rounded-md">
                      <img
                          src={src}
                          alt={`preview-${idx}`}
                          className="h-24 w-24 object-cover rounded border"
                      />
                      <button
                          onClick={() => removeFile(idx)}
                          className="absolute top-1 right-1 bg-white bg-opacity-80 text-red-500 px-2 rounded-full text-sm hover:bg-opacity-100"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                ))}
              </div>
          )}

          <div>
            <label className="flex items-center gap-2 font-medium">
              <FiFileText /> Mô tả thiết kế
            </label>
            <textarea
                placeholder="Mô tả bản thiết kế (dùng chung cho tất cả ảnh)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border rounded-md shadow-sm"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 font-medium">
              Số lượng
            </label>
            <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full p-3 border rounded-md shadow-sm"
            />
          </div>

          <button
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60 w-full font-medium"
              disabled={files.length === 0 || createOrderMutation.isPending}
              onClick={() => createOrderMutation.mutate()}
          >
            {createOrderMutation.isPending ? "Đang tạo..." : "Tạo đơn hàng"}
          </button>
        </div>
      </div>
  );
};

export default UploadDesignPage;