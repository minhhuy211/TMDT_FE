import { ProductRequest, ProductStatus, statusOptions } from "@/model/Product";
import productApi from "@/services/productApi";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Category } from "@/model/Category";
import categoryApi from "@/services/categoryApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  showDialog: boolean;
  setShowDialog: (v: boolean) => void;
  onProductCreated: () => void;
}

export default function CreateProductDialog({
  showDialog,
  setShowDialog,
  onProductCreated,
}: Props) {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    file: null as File | null, // thêm file
    cate_ID: "",
    status: "ACTIVE" as ProductStatus,
  });


  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.productName || !form.description || !form.cate_ID) {
      alert("Vui lòng nhập đầy đủ thông tin bắt buộc.");
      return;
    }

    try {
      const payload = {
        productName: form.productName,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        category: { cate_ID: form.cate_ID }, // ✅ chỉnh lại theo API mới
        status: form.status,
        file: form.file,
      };

      console.log("Payload gửi lên:", payload);

      await productApi.createProduct(payload);

      alert("Tạo sản phẩm thành công");
      setShowDialog(false);
      onProductCreated();
    } catch (err) {
      console.error("Lỗi tạo sản phẩm:", err);
      alert("Tạo thất bại");
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
    <DialogContent className="max-w-lg w-full"> {/* 👈 Chỉnh chiều rộng */}
      <DialogHeader>
        <DialogTitle>Thêm sản phẩm</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
        <Input
            placeholder="Tên sản phẩm"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            required
            className="w-full"
        />
        <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            className="w-full"
        />
        <Input
            placeholder="Giá"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            className="w-full"
        />
        <Input
            placeholder="Số lượng"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
            className="w-full"
        />
        <input
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, file: e.target.files?.[0] || null })}
            className="w-full"
        />

        <select
            value={form.cate_ID}
            onChange={(e) => setForm({ ...form, cate_ID: e.target.value })}
            required
            className="border px-2 py-1 rounded w-full"
        >
          <option value="">-- Chọn danh mục --</option>
          {categories.map((cate) => (
              <option key={cate.cate_ID} value={cate.cate_ID}>
                {cate.name}
              </option>
          ))}
        </select>

        <select
            value={form.status}
            onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as ProductStatus,
                })
            }
            className="border px-2 py-1 rounded w-full"
        >
          {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
          ))}
        </select>

        <DialogFooter className="col-span-2 mt-4">
          <Button type="submit">Lưu</Button>
          <Button variant="outline" onClick={() => setShowDialog(false)}>
            Huỷ
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  );
}
