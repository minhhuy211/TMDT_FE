"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import categoryApi from "@/services/categoryApi"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash, Search, X, Package, Tag } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Category, CategoryRequest } from "@/model/Category"

function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                placeholder="Tìm kiếm danh mục..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-10"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => onChange("")}
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </div>
    )
}

function CategoryDialog({
                            category,
                            isOpen,
                            onClose,
                            onSave,
                            loading,
                        }: {
    category?: Category
    isOpen: boolean
    onClose: () => void
    onSave: (category: CategoryRequest) => void
    loading?: boolean
}) {
    const [name, setName] = useState(category?.name || "");
    const [description, setDescription] = useState(category?.description || "");
    const [imageUrl, setImageUrl] = useState(category?.urlImage || "");  // New state for the image URL

    useEffect(() => {
        setName(category?.name || "");
        setDescription(category?.description || "");
        setImageUrl(category?.urlImage || "");  // Set the image URL from category if editing
    }, [category]);

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Tên danh mục không được để trống");
            return;
        }
        // Save the category including the image URL
        onSave({ name: name.trim(), description: description.trim(), urlImage: imageUrl.trim() });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</DialogTitle>
                    <DialogDescription>
                        {category ? "Cập nhật thông tin danh mục" : "Tạo danh mục sản phẩm mới"}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Tên danh mục *</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Nhập tên danh mục"
                            disabled={loading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả danh mục"
                            rows={3}
                            disabled={loading}
                        />
                    </div>
                    {/* Image URL Input */}
                    <div className="grid gap-2">
                        <Label htmlFor="imageUrl">URL ảnh</Label>
                        <Input
                            id="imageUrl"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="Nhập URL ảnh"
                            disabled={loading}
                        />
                    </div>
                    {/* Preview Image */}
                    {imageUrl && (
                        <div className="mt-2">
                            <Label>Ảnh xem trước:</Label>
                            <img src={imageUrl} alt="Preview" className="max-h-48 mt-2" />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave} disabled={loading}>
                        {category ? "Cập nhật" : "Thêm mới"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function DeleteDialog({
                          category,
                          isOpen,
                          onClose,
                          onConfirm,
                          loading,
                      }: {
    category?: Category
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    loading?: boolean
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận xóa danh mục</AlertDialogTitle>
                    <AlertDialogDescription>
                        Bạn có chắc chắn muốn xóa danh mục "{category?.name}"?
                        {category?.count && category.count > 0 && (
                            <span className="text-red-600 font-medium">
                                <br />
                                Danh mục này có {category.count} sản phẩm. Hành động này không thể hoàn tác.
                            </span>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading}>Hủy</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-600 hover:bg-red-700"
                        disabled={loading}
                    >
                        {loading ? "Đang xóa..." : "Xóa"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

function StatsCards({ categories }: { categories: Category[] }) {
    const stats = useMemo(() => {
        const total = categories.length
        const totalProducts = categories.reduce((sum, c) => sum + (c.count || 0), 0)

        return { total, totalProducts }
    }, [categories])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng danh mục</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-blue-500" />
                        <span className="text-2xl font-bold">{stats.total}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span className="text-2xl font-bold">{stats.totalProducts}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [search, setSearch] = useState("")
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [deletingCategory, setDeletingCategory] = useState<Category | undefined>(undefined)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const data = await categoryApi.getCategories();
                setCategories(data);
            } catch (error) {
                toast.error("Lấy danh mục thất bại");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = useMemo(() => {
        return categories.filter((cat) =>
            (cat.name ?? "").toLowerCase().includes(search.toLowerCase())
        );
    }, [categories, search]);

    const openAddDialog = () => {
        setEditingCategory(undefined)
        setDialogOpen(true)
    }

    const openEditDialog = (category: Category) => {
        setEditingCategory(category)
        setDialogOpen(true)
    }

    const openDeleteDialog = (category: Category) => {
        setDeletingCategory(category)
        setDeleteDialogOpen(true)
    }

    const handleSaveCategory = async (category: CategoryRequest) => {
        setLoading(true);
        try {
            if (editingCategory) {
                // Edit existing category with imageUrl
                await categoryApi.updateCategory(editingCategory.cate_ID, category);
                toast.success("Cập nhật danh mục thành công");
            } else {
                // Create new category with imageUrl
                await categoryApi.createCategory(category);
                toast.success("Tạo danh mục mới thành công");
            }
            setDialogOpen(false);
            setEditingCategory(undefined);
            // Refetch categories after save
            const data = await categoryApi.getCategories();
            setCategories(data);
        } catch (error) {
            toast.error("Lỗi khi lưu danh mục");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async () => {
        if (!deletingCategory) return;

        setLoading(true);
        try {
            await categoryApi.deleteCategory(deletingCategory.cate_ID);
            toast.success("Xóa danh mục thành công");
            setDeleteDialogOpen(false);
            // Refetch categories after delete
            const data = await categoryApi.getCategories();
            setCategories(data);
        } catch (error) {
            toast.error("Lỗi khi xóa danh mục");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="primary"
                        onClick={openAddDialog}
                        disabled={loading}
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Thêm danh mục
                    </Button>
                    <SearchInput value={search} onChange={setSearch} />
                </div>
            </div>

            <StatsCards categories={categories} />

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Tên danh mục</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead>Ảnh</TableHead> {/* New header for the image */}
                        <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCategories.map((category) => (
                        <TableRow key={category.cate_ID}>
                            <TableCell>{category.name}</TableCell>
                            <TableCell>{category.description || "Không có mô tả"}</TableCell>
                            <TableCell>
                                {/* Display image preview if URL exists */}
                                {category.urlImage && <img src={category.urlImage} alt="Category" className="w-12 h-12 object-cover rounded-md" />}
                            </TableCell>
                            <TableCell className="text-center">
                                <Button
                                    variant="ghost"
                                    onClick={() => openEditDialog(category)}
                                    disabled={loading}
                                    className="mr-2"
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => openDeleteDialog(category)}
                                    disabled={loading}
                                >
                                    <Trash className="h-4 w-4 text-red-500" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Category Dialog */}
            <CategoryDialog
                category={editingCategory}
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCategory}
                loading={loading}
            />

            {/* Delete Dialog */}
            <DeleteDialog
                category={deletingCategory}
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteCategory}
                loading={loading}
            />
        </div>
    )
}
