import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/services/api"; // Thay bằng domain backend thực tế

interface DesignFile {
    id: string;
    fileName: string;
    url: string;
    description: string;
    uploadedAt: string;
}

const UploadDesignPage = () => {
    const queryClient = useQueryClient();
    // Mảng files và preview
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [selectedDesign, setSelectedDesign] = useState<DesignFile | null>(null);

    // Lấy danh sách file đã upload
    const { data: designs = [], isLoading } = useQuery<DesignFile[]>({
        queryKey: ["my-designs"],
        queryFn: async () => {
            const token = localStorage.getItem("token");
            const res = await fetch(`${API_BASE_URL}/designs/mine`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error("Không tải được danh sách thiết kế");
            return await res.json();
        }
    });

    // Upload từng file một
    const uploadMutation = useMutation({
        mutationFn: async () => {
            if (files.length === 0) throw new Error("Chưa chọn file");
            const token = localStorage.getItem("token");

            // Upload từng file
            for (let file of files) {
                const form = new FormData();
                form.append("file", file);
                form.append("description", description);
                const res = await fetch(`${API_BASE_URL}/designs/upload`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: form,
                });
                if (!res.ok) throw new Error("Lỗi upload file: " + file.name);
            }
            return true;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-designs"] });
            setFiles([]);
            setPreviews([]);
            setDescription("");
            alert("Tải lên thành công!");
        },
        onError: (err: any) => alert(err.message || "Upload thất bại"),
    });

    // Thêm từng file một vào list preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFiles((prev) => [...prev, file]);
            setPreviews((prev) => [...prev, URL.createObjectURL(file)]);
        }
        e.target.value = "";
    };

    // Xoá file khỏi list preview (tuỳ chọn)
    const removeFile = (idx: number) => {
        setFiles(files.filter((_, i) => i !== idx));
        setPreviews(previews.filter((_, i) => i !== idx));
    };

    return (
        <div className="max-w-2xl mx-auto my-10 bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Tải thiết kế của bạn lên</h2>
            <div className="space-y-4 mb-6">
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg,.stl"
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
                                >X</button>
                            </div>
                        ))}
                    </div>
                )}
                <textarea
                    placeholder="Mô tả bản thiết kế (áp dụng cho tất cả file)"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <button
                    className="bg-black text-white px-6 py-2 rounded"
                    disabled={files.length === 0 || uploadMutation.isPending}
                    onClick={() => uploadMutation.mutate()}
                >
                    {uploadMutation.isPending ? "Đang tải..." : "Tải lên tất cả"}
                </button>
            </div>

            <hr className="my-8" />

            <h3 className="text-xl font-semibold mb-4">Danh sách thiết kế của bạn</h3>
            {isLoading ? (
                <div>Đang tải danh sách...</div>
            ) : designs.length === 0 ? (
                <div>Chưa có bản thiết kế nào.</div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    {designs.map(d => (
                        <div
                            key={d.id}
                            className={`border rounded-lg p-2 cursor-pointer hover:bg-gray-100 ${selectedDesign?.id === d.id ? "ring-2 ring-blue-400" : ""}`}
                            onClick={() => setSelectedDesign(d)}
                        >
                            <img
                                src={d.url.startsWith("http") ? d.url : `${API_BASE_URL}${d.url}`}
                                alt={d.fileName}
                                className="h-28 w-full object-cover rounded mb-2"
                                onError={e => (e.currentTarget.src = "/placeholder-design.png")}
                            />
                            <div className="text-sm font-medium truncate">{d.fileName}</div>
                            <div className="text-xs text-gray-600">{d.description}</div>
                        </div>
                    ))}
                </div>
            )}

            {selectedDesign && (
                <div className="mt-8 p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-bold mb-2">Chi tiết thiết kế</h4>
                    <img
                        src={selectedDesign.url.startsWith("http") ? selectedDesign.url : `${API_BASE_URL}${selectedDesign.url}`}
                        alt={selectedDesign.fileName}
                        className="h-48 w-auto mx-auto rounded mb-2"
                        onError={e => (e.currentTarget.src = "/placeholder-design.png")}
                    />
                    <div><b>Tên file:</b> {selectedDesign.fileName}</div>
                    <div><b>Mô tả:</b> {selectedDesign.description}</div>
                    <div><b>Ngày upload:</b> {new Date(selectedDesign.uploadedAt).toLocaleString()}</div>
                </div>
            )}
        </div>
    );
};

export default UploadDesignPage;
