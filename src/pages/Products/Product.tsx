import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";  // Thêm biểu tượng giỏ hàng mới

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
  // Thêm các sản phẩm khác...
];

const CategoryFilter = ({
                          selectedCategory,
                          setSelectedCategory,
                        }: {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}) => (
    <>
      {categories.map((cat) => (
          <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 h-7 text-xs rounded-md font-medium duration-200 hover:cursor-pointer active:scale-95 transition-all
        ${selectedCategory === cat
                  ? "bg-gray-800 text-white shadow-md scale-105"
                  : "bg-gray-300 text-black hover:bg-gray-600 hover:text-white border border-gray-800"} 
        hover:scale-105`}
          >
            {cat}
          </button>
      ))}
    </>
);

// Component hiển thị thông tin sản phẩm
const ProductCard = ({ product }: { product: Product }) => (
    <div className="group bg-white flex flex-col justify-between p-4 rounded-lg shadow hover:shadow-lg border border-gray-200 cursor-pointer transition h-full">
      {/* Phần hình ảnh có icon giỏ hàng */}
      <div className="relative">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover rounded-md mb-4"
        />

        {/* Nút giỏ hàng có dấu +, chỉ hiện khi hover */}
        <button
            className="absolute bottom-2 left-2 bg-white text-black p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800 hover:text-white"
            onClick={(e) => {
              e.preventDefault(); // Ngăn chặn chuyển trang khi bấm nút
              alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
            }}
        >
          <FaShoppingCart className="inline mr-1" />
          <span className="text-sm font-bold">+</span>
        </button>
      </div>

      {/* Thông tin sản phẩm */}
      <div>
        <h2 className="text-lg font-semibold text-black">{product.name}</h2>
        <p className="text-sm text-gray-700">{product.category}</p>
        <p className="text-black font-bold mt-2">{product.price}</p>
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
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-12 xl:px-20">
          <h1 className="text-4xl font-bold mt-2 mb-10 text-center text-black">
            Sản phẩm của chúng tôi thiết kế cho bạn
          </h1>

          {/* Thanh lọc + tìm kiếm */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryFilter
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
