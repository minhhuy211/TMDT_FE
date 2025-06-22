"use client"

import { useState, useMemo, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

// Define the CategoryRequest type (for better clarity)
type CategoryRequest = Omit<Category, "id" | "createdAt" | "productCount">;

type Category = {
    id: string
    name: string
    description: string
    productCount?: number
    createdAt?: string
    status?: "active" | "inactive"
}

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
    const [name, setName] = useState(category?.name || "")
    const [description, setDescription] = useState(category?.description || "")
    const [status, setStatus] = useState<"active" | "inactive">(category?.status || "active")

    useEffect(() => {
        setName(category?.name || "")
        setDescription(category?.description || "")
        setStatus(category?.status || "active")
    }, [category, isOpen])

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Tên danh mục không được để trống")
            return
        }
        onSave({ name: name.trim(), description: description.trim(), status })
    }

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
                    <div className="grid gap-2">
                        <Label htmlFor="status">Trạng thái</Label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                            disabled={loading}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
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
    )
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
                        {category?.productCount && category.productCount > 0 && (
                            <span className="text-red-600 font-medium">
                                <br />
                                Danh mục này có {category.productCount} sản phẩm. Hành động này không thể hoàn tác.
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
        const active = categories.filter((c) => c.status === "active").length
        const inactive = categories.filter((c) => c.status === "inactive").length
        const totalProducts = categories.reduce((sum, c) => sum + (c.productCount || 0), 0)

        return { total, active, inactive, totalProducts }
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
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Đang hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {stats.active}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Không hoạt động</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                            {stats.inactive}
                        </Badge>
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
        async function fetchCategories() {
            setLoading(true);
            try {
                const data = await categoryApi.getCategories();
                setCategories(data.map(cat => ({
                    id: cat.id,
                    name: cat.name,
                    description: cat.description,
                    productCount: cat.productCount,
                    status: cat.status ?? "active"
                })));
            } catch (error) {
                console.error(error);
                toast.error("Lấy danh mục thất bại");
            } finally {
                setLoading(false);
            }
        }
        fetchCategories();
    }, []);  // Gọi khi trang tải lần đầu

// Sau khi thực hiện các thao tác CRUD, cần lấy lại danh mục (update lại state)
    useEffect(() => {
        async function fetchCategories() {
            const data = await categoryApi.getCategories();
            setCategories(data);
        }
        if (loading === false) {
            fetchCategories(); // Lấy lại dữ liệu sau khi thao tác hoàn tất
        }
    }, [loading]); // Khi loading thay đổi, fetch lại danh mục

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
        if (!category.id) {
            toast.error("Danh mục không hợp lệ để xóa (thiếu ID)");
            return;
        }
        setDeletingCategory(category);
        setDeleteDialogOpen(true);
    };

    const handleCreateCategory = async (categoryData: CategoryRequest) => {
        setLoading(true);
        try {
            const created = await categoryApi.createCategory(categoryData);
            setCategories((prev) => [...prev, created]);  // Thêm mới danh mục vào danh sách
            toast.success("Thêm danh mục thành công");
            setDialogOpen(false);  // Đóng dialog sau khi thêm
        } catch (error) {
            toast.error(`Thêm danh mục thất bại: ${error.message}`);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCategory = async (categoryData: CategoryRequest) => {
        if (!editingCategory) return;
        setLoading(true);
        try {
            const updatedCategory = await categoryApi.updateCategory(editingCategory.id, categoryData);
            setCategories((prevCategories) =>
                prevCategories.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))  // Cập nhật danh mục
            );
            toast.success("Cập nhật danh mục thành công");
            setDialogOpen(false);  // Đóng dialog sau khi sửa
        } catch (error) {
            toast.error(`Cập nhật danh mục thất bại: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingCategory || !deletingCategory.id) {
            toast.error("Không tìm thấy danh mục để xóa");
            return;
        }
        setLoading(true);
        try {
            await categoryApi.deleteCategory(deletingCategory.id);
            setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id));  // Loại bỏ danh mục đã xóa khỏi danh sách
            toast.success("Xóa danh mục thành công");
            setDeleteDialogOpen(false);  // Đóng dialog xóa
            setDeletingCategory(undefined);  // Reset danh mục đang xóa
        } catch (error) {
            console.error("Delete category failed:", error);
            toast.error("Xóa danh mục thất bại");
        } finally {
            setLoading(false);
        }
    };

    // Handle save category (create or update)
    const handleSaveCategory = (categoryData: CategoryRequest) => {
        if (editingCategory) {
            handleUpdateCategory(categoryData);
        } else {
            handleCreateCategory(categoryData);
        }
    };

    // Handle category deletion

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Quản lý danh mục</h1>

            <StatsCards categories={categories} />

            <div className="flex justify-between items-center my-4 gap-4">
                <SearchInput value={search} onChange={setSearch} />
                <Button onClick={openAddDialog} leftIcon={<Plus />}>
                    Thêm danh mục
                </Button>
            </div>

            <Card>
                <CardContent className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Tên danh mục</TableHead>
                                <TableHead>Mô tả</TableHead>
                                <TableHead>Số sản phẩm</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead>Hành động</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCategories.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-4">
                                        Không tìm thấy danh mục nào
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredCategories.map((category) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{category.id}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.description}</TableCell>
                                        <TableCell>{category.productCount ?? 0}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={category.status === "active" ? "success" : "secondary"}
                                                className="capitalize"
                                            >
                                                {category.status || "inactive"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openEditDialog(category)}
                                                className="mr-2"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => openDeleteDialog(category)}
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <CategoryDialog
                category={editingCategory}
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCategory}
                loading={loading}
            />

            <DeleteDialog
                category={deletingCategory}
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                loading={loading}
            />

        </div>
    )
}
