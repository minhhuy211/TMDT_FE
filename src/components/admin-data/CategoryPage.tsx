"use client"

import {useState, useMemo, useEffect} from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import categoryService from "@/services/categoryApi"  // đường dẫn chính xác của bạn

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
import { Plus, Edit, Trash, Search, X, Package, Tag, Filter } from "lucide-react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

type Category = {
    id: number
    name: string
    description: string
    productCount?: number
    createdAt?: string
    status?: "active" | "inactive"
}
function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4"/>
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
                    <X className="h-3 w-3"/>
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
                        }: {
    category?: Category
    isOpen: boolean
    onClose: () => void
    onSave: (category: Omit<Category, "id" | "createdAt" | "productCount">) => void
}) {
    const [name, setName] = useState(category?.name || "")
    const [description, setDescription] = useState(category?.description || "")
    const [status, setStatus] = useState<"active" | "inactive">(category?.status || "active")

    const handleSave = () => {
        if (!name.trim()) {
            toast.error("Tên danh mục không được để trống")
            return
        }

        onSave({ name: name.trim(), description: description.trim(), status })
        onClose()
        setName("")
        setDescription("")
        setStatus("active")
    }

    const handleClose = () => {
        onClose()
        setName(category?.name || "")
        setDescription(category?.description || "")
        setStatus(category?.status || "active")
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
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
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên danh mục" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Nhập mô tả danh mục"
                            rows={3}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="status">Trạng thái</Label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value as "active" | "inactive")}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="active">Hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                        </select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button onClick={handleSave}>{category ? "Cập nhật" : "Thêm mới"}</Button>
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
                      }: {
    category?: Category
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
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
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
                        Xóa
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | undefined>()
    const [deletingCategory, setDeletingCategory] = useState<Category | undefined>()
    const [loading, setLoading] = useState(false);
    const filteredCategories = useMemo(() => {
        if (!search.trim()) return categories
        const searchText = search.toLowerCase().trim()
        return categories.filter(
            (cat) => cat.name.toLowerCase().includes(searchText) || cat.description.toLowerCase().includes(searchText),
        )
    }, [categories, search])
    const handleAddCategory = () => {
        setEditingCategory(undefined)
        setDialogOpen(true)
    }
    useEffect(() => {
        async function fetchCategories() {
            try {
                const data = await categoryService.getCategories();
                setCategories(data);
            } catch (error) {
                toast.error("Lấy danh mục thất bại");
                console.error(error);
            }
        }
        fetchCategories();
    }, []);
    const handleEditCategory = (category: Category) => {
        setEditingCategory(category)
        setDialogOpen(true)
    }

    const handleDeleteCategory = (category: Category) => {
        setDeletingCategory(category)
        setDeleteDialogOpen(true)
    }

    const handleSaveCategory = async (
        categoryData: Omit<Category, "id" | "createdAt" | "productCount">
    ) => {
        try {
            if (editingCategory) {
                // Gọi API cập nhật
                const updated = await categoryService.updateCategory(editingCategory.id, categoryData);
                setCategories((prev) =>
                    prev.map((cat) => (cat.id === updated.id ? updated : cat))
                );
                toast.success("Cập nhật danh mục thành công");
            } else {
                // Gọi API tạo mới
                const created = await categoryService.createCategory(categoryData);
                setCategories((prev) => [...prev, created]);
                toast.success("Thêm danh mục thành công");
            }
        } catch (error) {
            toast.error("Lưu danh mục thất bại");
            console.error(error);
        }
    };
    const handleConfirmDelete = async () => {
        if (deletingCategory) {
            try {
                await categoryService.deleteCategory(deletingCategory.id);
                setCategories((prev) => prev.filter((cat) => cat.id !== deletingCategory.id));
                toast.success("Xóa danh mục thành công");
            } catch (error) {
                toast.error("Xóa danh mục thất bại");
                console.error(error);
            } finally {
                setDeleteDialogOpen(false);
                setDeletingCategory(undefined);
            }
        }
    };

    const getStatusBadge = (status: "active" | "inactive") => {
        return status === "active" ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Hoạt động
            </Badge>
        ) : (
            <Badge variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
                Không hoạt động
            </Badge>
        )
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Tag className="h-6 w-6" />
                        Danh mục sản phẩm
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Quản lý các danh mục sản phẩm trong hệ thống</p>
                </div>
                <Button onClick={handleAddCategory}>
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm danh mục
                </Button>
            </div>

            {/* Stats Cards */}
            <StatsCards categories={categories} />

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span>
            Hiển thị {filteredCategories.length} / {categories.length} danh mục
          </span>
                </div>
            </div>

            {/* Categories Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Danh sách danh mục</CardTitle>
                    <CardDescription>Quản lý tất cả danh mục sản phẩm</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[80px]">ID</TableHead>
                                    <TableHead>Tên danh mục</TableHead>
                                    <TableHead>Mô tả</TableHead>
                                    <TableHead className="text-center">Sản phẩm</TableHead>
                                    <TableHead className="text-center">Trạng thái</TableHead>
                                    <TableHead className="text-right">Hành động</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredCategories.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                            {search ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào"}
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredCategories.map((cat) => (
                                        <TableRow key={cat.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                            <TableCell className="font-medium">{cat.id}</TableCell>
                                            <TableCell>
                                                <div>
                                                    <div className="font-medium">{cat.name}</div>
                                                    {cat.createdAt && (
                                                        <div className="text-sm text-gray-500">
                                                            Tạo: {new Date(cat.createdAt).toLocaleDateString("vi-VN")}
                                                        </div>
                                                    )}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-xs truncate" title={cat.description}>
                                                    {cat.description}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">{cat.productCount || 0}</Badge>
                                            </TableCell>
                                            <TableCell className="text-center">{getStatusBadge(cat.status || "active")}</TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleEditCategory(cat)}
                                                        className="h-8 w-8"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        onClick={() => handleDeleteCategory(cat)}
                                                        className="h-8 w-8 text-red-500 hover:text-red-700"
                                                    >
                                                        <Trash className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Dialogs */}
            <CategoryDialog
                category={editingCategory}
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveCategory}
            />

            <DeleteDialog
                category={deletingCategory}
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
            />
        </div>
    )
}
