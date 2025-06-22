"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash } from "lucide-react";
import { ProductResponse, ProductStatus, statusOptions } from "@/model/Product";
import productApi from "@/services/productApi";
import CreateProductDialog from "./CreateProductDialog";

export default function ProductPage() {
  const [product, setProduct] = useState<ProductResponse[]>([]);
  const [search, setSearch] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productApi.getProducts(10, 0);
        setProduct(data);
      } catch (error) {
        console.error("Không lấy được sản phẩm", error);
      }
    };
    fetchProduct();
  }, []);

  const handleStatusChange = async (
    productId: string,
    newStatus: ProductStatus
  ) => {
    try {
      await productApi.updateStatus(productId, newStatus);
      setProduct((prev) =>
        prev.map((product) =>
          product.productId === productId
            ? { ...product, status: newStatus }
            : product
        )
      );
      alert("Cập nhật trạng thái thành công");
    } catch (error) {
      alert("Lỗi khi cập nhật trạng thái sản phẩm");
      console.error(error);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    const confirm = window.confirm(
      "Bạn có chắc chắn muốn xoá sản phẩm này không?"
    );
    if (!confirm) return;

    try {
      await productApi.updateStatus(productId, "INACTIVE"); // dùng PATCH
      setProduct((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, status: "INACTIVE" } : p
        )
      );
      alert("Đã ngừng bán sản phẩm.");
    } catch (error) {
      console.error("Lỗi khi xoá sản phẩm:", error);
      alert("Xoá thất bại. Vui lòng thử lại.");
    }
  };

  const handleProductCreated = async () => {
    const newProducts = await productApi.getProducts(10, 0);
    setProduct(newProducts);
  };

  const filteredProduct = product.filter(
    (cat) =>
      cat.categoryName.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Danh Sách sản phẩm</h1>
        <Button onClick={() => setShowDialog(true)}>
          <Plus className="w-4 h-4 mr-2" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Ảnh</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Chức năng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProduct.map((product) => (
            <TableRow key={product.productId}>
              <TableCell>{product.productName}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                {product.img ? (
                  <img
                    src={product.img}
                    alt={product.productName}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span className="text-gray-400 italic">Không có ảnh</span>
                )}
              </TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <select
                  value={product.status}
                  onChange={(e) =>
                    handleStatusChange(
                      product.productId,
                      e.target.value as ProductStatus
                    )
                  }
                  className="border px-2 py-1 rounded text-sm"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </TableCell>

              <TableCell className="text-right space-x-2">
                <Button size="icon" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-red-500"
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateProductDialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        onProductCreated={handleProductCreated}
      />
    </div>
  );
}
