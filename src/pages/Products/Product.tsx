// src/pages/Products/Product.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
}

// Các danh mục sản phẩm
const categories = ["Tất cả", "Quần áo", "Gia dụng", "Phụ kiện", "Văn phòng phẩm"];

// Dữ liệu mẫu sản phẩm
const products: Product[] = [
  {
    id: 1,
    name: "Móc treo 3D",
    category: "Gia dụng",
    image: "/imgs/BST171-400x400.png",
    price: "50.000đ",
    description: "Móc treo tiện dụng in bằng công nghệ 3D, chịu lực tốt.",
  },
  {
    id: 2,
    name: "Giá đỡ điện thoại 3D",
    category: "Phụ kiện",
    image: "/imgs/BST171-400x400.png",
    price: "70.000đ",
    description: "Giá đỡ điện thoại nhỏ gọn, thiết kế hiện đại.",
  },
  {
    id: 3,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 4,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 5,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 6,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 7,
    name: "Móc khóa hoodie 3D",
    category: "Quần áo",
    image: "/imgs/BST171-400x400.png",
    price: "45.000đ",
    description: "Phụ kiện thời trang dành cho fan của hoodie.",
  },
  {
    id: 8,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 9,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  // Bạn có thể thêm nhiều sản phẩm nữa ở đây
];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }: { selectedCategory: string, setSelectedCategory: React.Dispatch<React.SetStateAction<string>> }) => (
    <div className="flex justify-center gap-4 flex-wrap mb-8">
      {categories.map((cat) => (
          <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 
          ${selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-md scale-105" // Highlight selected category
                  : "bg-gray-200 text-gray-700 hover:bg-indigo-500 hover:text-white border border-indigo-600"} 
          hover:scale-105`}  // Hover effect
          >
            {cat}
          </button>
      ))}
    </div>
);

// Component hiển thị thông tin sản phẩm
const ProductCard = ({ product }: { product: Product }) => (
    <div
        className="bg-white flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg border border-gray-200 cursor-pointer transition h-full"
    >
      <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
      />
      <div>
        <h2 className="text-lg font-semibold text-indigo-700">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.category}</p>
        <p className="text-indigo-600 font-bold mt-2">{product.price}</p>
      </div>
    </div>
);

export const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  // Lọc sản phẩm theo danh mục và từ khóa tìm kiếm
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 xl:px-20">
          <h1 className="text-4xl font-bold mt-2 mb-10 text-center text-indigo-700">
            Sản phẩm của chúng tôi thiết kế cho bạn
          </h1>



          {/* Thanh lọc + tìm kiếm */}
          <div className="flex justify-between mb-10 gap-2 flex-wrap">
            <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />

            <div className="flex justify-end">
              <input
                  type="text"
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-1 border-indigo-400 px-2 py-0 text-sm w-48 max-w-xs rounded-md shadow focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
                <Link to={`/product-detail/${product.id}`} key={product.id}>
                  <ProductCard product={product} />
                </Link>
            ))}
          </div>
        </div>
      </div>
  );

};
