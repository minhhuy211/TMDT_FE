"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom" // Using react-router-dom for navigation
import { FaShoppingCart, FaSearch } from "react-icons/fa" // Using react-icons/fa for icons

// Import shadcn/ui components
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Product {
    productId: string
    productName: string
    categoryName: string
    imgUrl: string
    price: number
    description: string
    stock: number
}

interface Category {
    cate_ID: string
    name: string
    description: string
    urlImage: string
    count: number
    productList: Product[]
}

// Sample data for v0 preview (will be overridden by your API if running locally)
const SAMPLE_MOCK_CATEGORIES: Category[] = [
    {
        cate_ID: "cat1",
        name: "Mô hình Anime",
        description: "Các mô hình 3D in ấn chất lượng cao từ các bộ anime yêu thích.",
        urlImage: "/placeholder.svg?height=100&width=100",
        count: 5,
        productList: [
            {
                productId: "a1",
                productName: "Mô hình Goku Super Saiyan",
                categoryName: "Mô hình Anime",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 850000,
                description: "Mô hình Goku chi tiết, tư thế Super Saiyan.",
                stock: 10,
            },
            {
                productId: "a2",
                productName: "Mô hình Luffy Gear 5",
                categoryName: "Mô hình Anime",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 920000,
                description: "Mô hình Luffy ở trạng thái Gear 5 đầy ấn tượng.",
                stock: 8,
            },
            {
                productId: "a3",
                productName: "Mô hình Nezuko Kamado",
                categoryName: "Mô hình Anime",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 780000,
                description: "Mô hình Nezuko đáng yêu từ Kimetsu no Yaiba.",
                stock: 12,
            },
        ],
    },
    {
        cate_ID: "cat2",
        name: "Phụ kiện Gaming",
        description: "Các phụ kiện in 3D độc đáo dành cho game thủ.",
        urlImage: "/placeholder.svg?height=100&width=100",
        count: 5,
        productList: [
            {
                productId: "g1",
                productName: "Keycap cơ khí custom",
                categoryName: "Phụ kiện Gaming",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 350000,
                description: "Bộ keycap in 3D với chủ đề game.",
                stock: 15,
            },
            {
                productId: "g2",
                productName: "Giá đỡ tai nghe RGB",
                categoryName: "Phụ kiện Gaming",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 420000,
                description: "Giá đỡ tai nghe có đèn RGB tích hợp.",
                stock: 10,
            },
            {
                productId: "g3",
                productName: "Đế sạc tay cầm PS5",
                categoryName: "Phụ kiện Gaming",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 280000,
                description: "Đế sạc đôi cho tay cầm PlayStation 5.",
                stock: 18,
            },
        ],
    },
    {
        cate_ID: "cat3",
        name: "Đạo cụ Cosplay",
        description: "Đạo cụ cosplay in 3D chân thực cho các nhân vật.",
        urlImage: "/placeholder.svg?height=100&width=100",
        count: 4,
        productList: [
            {
                productId: "c1",
                productName: "Kiếm Master Sword (Zelda)",
                categoryName: "Đạo cụ Cosplay",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 1500000,
                description: "Bản sao kiếm Master Sword in 3D.",
                stock: 5,
            },
            {
                productId: "c2",
                productName: "Mặt nạ Kakashi",
                categoryName: "Đạo cụ Cosplay",
                imgUrl: "/placeholder.svg?height=300&width=300",
                price: 600000,
                description: "Mặt nạ Anbu của Kakashi.",
                stock: 7,
            },
        ],
    },
]

const CategoryFilter = ({
                            categories,
                            selectedCategory,
                            setSelectedCategory,
                        }: {
    categories: string[]
    selectedCategory: string
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}) => (
    <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
            <Button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                variant={selectedCategory === cat ? "default" : "outline"}
                className={`h-8 px-4 text-xs rounded-md font-medium duration-200 hover:cursor-pointer active:scale-95 transition-all
          ${selectedCategory === cat ? "bg-gray-800 text-white shadow-md" : "border-gray-300 text-gray-800 hover:bg-gray-100"}
          hover:scale-105`}
            >
                {cat}
            </Button>
        ))}
    </div>
)

const ProductCard = ({ product }: { product: Product }) => (
    <Card className="group flex flex-col justify-between h-full overflow-hidden">
        <Link to={`/product-detail/${product.productId}`} className="block">
            <CardHeader className="p-0">
                <img
                    src={product.imgUrl || "/placeholder.svg?height=300&width=300"}
                    alt={product.productName}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                />
            </CardHeader>
            <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{product.productName}</CardTitle>
                <p className="text-sm text-gray-600 mb-2">{product.categoryName}</p>
                <p className="text-gray-900 font-bold text-lg">{product.price.toLocaleString("vi-VN")}đ</p>
            </CardContent>
        </Link>
        <CardFooter className="p-4 pt-0">
            <Button
                className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                onClick={(e) => {
                    e.preventDefault()
                    alert(`Đã thêm "${product.productName}" vào giỏ hàng!`)
                }}
            >
                <FaShoppingCart className="inline mr-2" />
                Thêm vào giỏ
            </Button>
        </CardFooter>
    </Card>
)

export const Product = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [categoryNames, setCategoryNames] = useState<string[]>(["Tất cả"])
    const [selectedCategory, setSelectedCategory] = useState("Tất cả")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        // Attempt to fetch from your local API first
        fetch("http://localhost:8080/api/categories")
            .then((res) => res.json())
            .then((data) => {
                if (data.result && Array.isArray(data.result)) {
                    setCategories(data.result)
                    const names = data.result.map((cat: Category) =>
                        cat.name
                            .split(" ")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                            .join(" "),
                    )
                    setCategoryNames(["Tất cả", ...names])
                } else {
                    // Fallback to sample data if API response is not as expected
                    console.warn("API response not valid, falling back to sample data.")
                    setCategories(SAMPLE_MOCK_CATEGORIES)
                    const names = SAMPLE_MOCK_CATEGORIES.map((cat: Category) =>
                        cat.name
                            .split(" ")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                            .join(" "),
                    )
                    setCategoryNames(["Tất cả", ...names])
                }
            })
            .catch((err) => {
                console.error("Lỗi khi lấy danh mục từ API, sử dụng dữ liệu mẫu:", err)
                // Use sample data if API fetch fails
                setCategories(SAMPLE_MOCK_CATEGORIES)
                const names = SAMPLE_MOCK_CATEGORIES.map((cat: Category) =>
                    cat.name
                        .split(" ")
                        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                        .join(" "),
                )
                setCategoryNames(["Tất cả", ...names])
            })
    }, [])

    const allProducts = categories.flatMap((cat) => cat.productList)

    const filteredProducts = allProducts.filter((product) => {
        const matchCategory =
            selectedCategory === "Tất cả" || product.categoryName.toLowerCase() === selectedCategory.toLowerCase()
        const matchSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCategory && matchSearch
    })

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-12 text-center text-gray-900 leading-tight">
                    Sản phẩm in 3D độc đáo dành cho <br className="hidden sm:inline" /> Fan Anime & Game thủ
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    <CategoryFilter
                        categories={categoryNames}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />

                    <div className="relative w-full sm:w-auto">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 h-9 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 w-full sm:w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => <ProductCard product={product} key={product.productId} />)
                    ) : (
                        <p className="text-center col-span-full text-gray-500 text-lg py-10">
                            Không có sản phẩm phù hợp với tiêu chí tìm kiếm.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
