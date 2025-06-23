import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductRequest, ProductStatus, statusOptions } from "@/model/Product";
import { Category } from "@/model/Category";
import productApi from "@/services/productApi";
import categoryApi from "@/services/categoryApi";

interface Props {
  showDialog: boolean;
  setShowDialog: (v: boolean) => void;
  onProductUpdated: () => void;
  product: ProductRequest & { productId: string };
}

export default function EditProductDialog({
  showDialog,
  setShowDialog,
  onProductUpdated,
  product,
}: Props) {
  const [form, setForm] = useState({
    productName: "",
    description: "",
    price: "",
    stock: "",
    urlImage: "",
    cate_ID: "",
    status: "ACTIVE" as ProductStatus,
    file: null as File | null, // <== thêm field file
  });

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await categoryApi.getCategories();
      setCategories(res);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    setForm({
      productName: product.productName,
      description: product.description,
      price: String(product.price),
      stock: String(product.stock),
      urlImage: product.urlImage,
      cate_ID: product.cate_ID ?? "",
      status: product.status,
      file: null,
    });
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.cate_ID) {
      alert("Vui lòng chọn danh mục sản phẩm");
      return;
    }

    try {
      const payload: ProductRequest & {
        file?: File | null;
        urlImage?: string;
      } = {
        productName: form.productName,
        description: form.description,
        price: Number(form.price),
        stock: Number(form.stock),
        cate_ID: form.cate_ID,
        status: form.status,
        file: form.file,
      };

      // Nếu không có ảnh mới thì giữ lại ảnh cũ
      if (!form.file) {
        payload.urlImage = form.urlImage;
      }

      console.log("Gửi payload updateProduct:", payload);

      await productApi.updateProduct(product.productId, payload);

      alert("Cập nhật sản phẩm thành công");
      setShowDialog(false);
      onProductUpdated();
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại");
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <Input
            placeholder="Tên sản phẩm"
            value={form.productName}
            onChange={(e) => setForm({ ...form, productName: e.target.value })}
            required
          />
          <Input
            placeholder="Mô tả"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <Input
            placeholder="Giá"
            type="number"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <Input
            placeholder="Số lượng"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setForm({ ...form, file: e.target.files?.[0] || null })
            }
          />

          {form.file ? (
            <div>
              <p className="text-sm text-gray-500 mb-1">Ảnh mới:</p>
              <img
                src={URL.createObjectURL(form.file)}
                alt="Preview mới"
                className="w-32 h-32 object-cover border rounded"
              />
            </div>
          ) : (
            form.urlImage && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Ảnh hiện tại:</p>
                <img
                  src={form.urlImage}
                  alt="Preview cũ"
                  className="w-32 h-32 object-cover border rounded"
                />
              </div>
            )
          )}

          <select
            value={form.cate_ID}
            onChange={(e) => setForm({ ...form, cate_ID: e.target.value })}
            required
            className="border px-2 py-1 rounded"
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
              setForm({ ...form, status: e.target.value as ProductStatus })
            }
            className="border px-2 py-1 rounded"
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
