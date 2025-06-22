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
    img: "",
    cate_ID: "",
    status: "ACTIVE" as ProductStatus,
  });

  const [newProduct, setNewProduct] = useState<ProductRequest>({
    productName: "",
    description: "",
    price: 0,
    stock: 0,
    img: "",
    cate_ID: "",
    status: "ACTIVE",
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
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      await productApi.createProduct(payload);
      alert("Tạo sản phẩm thành công");
      setShowDialog(false);
      onProductCreated(); // cập nhật lại danh sách
    } catch (err) {
      console.error(err);
      alert("Tạo thất bại");
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm sản phẩm</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 mt-2">
          <Input
            placeholder="Tên sản phẩm"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
            required
          />
          <Input
            placeholder="Mô tả"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
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
          <Input
            placeholder="URL ảnh"
            value={newProduct.img}
            onChange={(e) =>
              setNewProduct({ ...newProduct, img: e.target.value })
            }
            required
          />

          {/* Dropdown chọn danh mục */}
          <select
            value={newProduct.cate_ID}
            onChange={(e) =>
              setNewProduct({ ...newProduct, cate_ID: e.target.value })
            }
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

          {/* Dropdown status */}
          <select
            value={newProduct.status}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                status: e.target.value as ProductStatus,
              })
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
