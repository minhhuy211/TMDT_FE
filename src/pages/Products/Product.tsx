import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface Product {
    productId: number;
    productName: string;
    categoryName: string;
    img: string;
    price: number;
    description: string;
    stock: number;
}

interface Category {
    cate_ID: number;
    name: string;
    description: string;
    urlImage: string;
    count: number;
    productList: Product[];
}

const CategoryFilter = ({
                            categories,
                            selectedCategory,
                            setSelectedCategory,
                        }: {
    categories: string[];
    selectedCategory: string;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => (
    <>
        {categories.map((cat) => (
            <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 h-7 text-xs rounded-md font-medium duration-200 hover:cursor-pointer active:scale-95 transition-all
          ${
                    selectedCategory === cat
                        ? "bg-gray-800 text-white shadow-md scale-105"
                        : "bg-gray-300 text-black hover:bg-gray-600 hover:text-white border border-gray-800"
                }
          hover:scale-105`}
            >
                {cat}
            </button>
        ))}
    </>
);

const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg border border-gray-200 cursor-pointer transition h-full">
        <div className="relative">
            <img
                src={product.img}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-md mb-4"
            />
            <button
                className="absolute bottom-2 left-2 bg-white text-black p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800 hover:text-white"
                onClick={(e) => {
                    e.preventDefault();
                    alert(`Đã thêm "${product.productName}" vào giỏ hàng!`);
                }}
            >
                <FaShoppingCart className="inline mr-1" />
                <span className="text-sm font-bold">+</span>
            </button>
        </div>

        <div>
            <h2 className="text-lg font-semibold text-black">{product.productName}</h2>
            <p className="text-sm text-gray-700">{product.categoryName}</p>
            <p className="text-black font-bold mt-2">{product.price.toLocaleString("vi-VN")}đ</p>
        </div>
    </div>
);

export const Product = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [categoryNames, setCategoryNames] = useState<string[]>(["Tất cả"]);
    const [selectedCategory, setSelectedCategory] = useState("Tất cả");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/categories")
            .then((res) => res.json())
            .then((data) => {
                if (data.result && Array.isArray(data.result)) {
                    setCategories(data.result);

                    // Lấy danh sách tên category viết hoa chữ cái đầu
                    const names = data.result.map((cat: Category) =>
                        cat.name
                            .split(" ")
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                            .join(" ")
                    );
                    setCategoryNames(["Tất cả", ...names]);
                }
            })
            .catch((err) => console.error("Lỗi khi lấy danh mục:", err));
    }, []);

    // Lấy toàn bộ sản phẩm từ tất cả categories
    const allProducts = categories.flatMap((cat) => cat.productList);

    // Lọc sản phẩm theo category và tìm kiếm
    const filteredProducts = allProducts.filter((product) => {
        const matchCategory =
            selectedCategory === "Tất cả" ||
            product.categoryName.toLowerCase() === selectedCategory.toLowerCase();
        const matchSearch = product.productName
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-12 xl:px-20">
                <h1 className="text-4xl font-bold mt-2 mb-10 text-center text-black">
                    Sản phẩm của chúng tôi thiết kế cho bạn
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <div className="flex flex-wrap items-center gap-2">
                        <CategoryFilter
                            categories={categoryNames}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                        />
                    </div>

                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="border border-gray-600 h-7 px-2 text-xs rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Link to={`/product-detail/${product.productId}`} key={product.productId}>
                                <ProductCard product={product} />
                            </Link>
                        ))
                    ) : (
                        <p className="text-center col-span-full text-gray-500">
                            Không có sản phẩm phù hợp.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
