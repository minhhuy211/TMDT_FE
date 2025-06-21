"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash } from "lucide-react"

type Category = {
    id: number
    name: string
    description: string
}

export default function CategoryPage() {
    const [categories, setCategories] = useState<Category[]>([
        { id: 1, name: "Điện thoại", description: "Các loại smartphone" },
        { id: 2, name: "Laptop", description: "Máy tính xách tay" },
        { id: 3, name: "Phụ kiện", description: "Tai nghe, sạc, vỏ" },
    ])

    const [search, setSearch] = useState("")

    const filteredCategories = categories.filter(
        (cat) =>
            cat.name.toLowerCase().includes(search.toLowerCase()) ||
            cat.description.toLowerCase().includes(search.toLowerCase())
    )

    const handleAddCategory = () => {
        const newId = categories.length + 1
        setCategories([
            ...categories,
            { id: newId, name: `Danh mục mới ${newId}`, description: "Mô tả danh mục mới" },
        ])
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Danh mục sản phẩm</h1>
                <Button onClick={handleAddCategory}>
                    <Plus className="w-4 h-4 mr-2" /> Thêm danh mục
                </Button>
            </div>

            <div className="mb-4">
                <Input
                    placeholder="Tìm kiếm danh mục..."
                    className="w-full md:w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Tên danh mục</TableHead>
                        <TableHead>Mô tả</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredCategories.map((cat) => (
                        <TableRow key={cat.id}>
                            <TableCell>{cat.id}</TableCell>
                            <TableCell>{cat.name}</TableCell>
                            <TableCell>{cat.description}</TableCell>
                            <TableCell className="text-right space-x-2">
                                <Button size="icon" variant="ghost">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-500">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
