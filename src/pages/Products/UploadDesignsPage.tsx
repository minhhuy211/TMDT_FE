import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import customApi from "@/services/customApi";

const UploadDesignPage = () => {

  const [files, setFiles] = useState<File[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [description, setDescription] = useState<string>("");
  const [previews, setPreviews] = useState<string[]>([]);

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
    <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Tải thiết kế của bạn lên</h2>

      <div className="space-y-4 mb-6">
        <input
          type="file"
          accept=".png,.jpg,.jpeg"
          multiple
          onChange={handleFileChange}
          className="block"
        />

        {previews.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {previews.map((src, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={src}
                  alt={`preview-${idx}`}
                  className="h-24 w-24 object-cover rounded border"
                />
                <button
                  onClick={() => removeFile(idx)}
                  className="absolute top-1 right-1 bg-white bg-opacity-80 text-red-500 px-2 rounded text-xs opacity-80 hover:opacity-100"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}

        <textarea
          placeholder="Mô tả bản thiết kế (dùng chung cho tất cả ảnh)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div>
          <label className="block font-medium mb-1">Số lượng:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          className="bg-black text-white px-6 py-2 rounded"
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
