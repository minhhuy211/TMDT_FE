import React, { useState } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  image: string;
  price: string;
  description: string;
}

const categories = ["Tất cả", "Quần áo", "Gia dụng", "Phụ kiện", "Văn phòng phẩm"];

const products = [
  {
    id: 1,
    name: "Móc treo 3D",
    category: "Gia dụng",
    image: "/imgs/BST171-400x400.png",  // Đường dẫn hình ảnh từ thư mục public/imgs
    price: "50.000đ",
    description: "Móc treo tiện dụng in bằng công nghệ 3D, chịu lực tốt.",
  },
  {
    id: 2,
    name: "Giá đỡ điện thoại 3D",
    category: "Phụ kiện",
    image: "/imgs/BST171-400x400.png",  // Đường dẫn hình ảnh từ thư mục public/imgs
    price: "70.000đ",
    description: "Giá đỡ điện thoại nhỏ gọn, thiết kế hiện đại.",
  },
  {
    id: 3,
    name: "Bút ký 3D",
    category: "Văn phòng phẩm",
    image: "/imgs/BST171-400x400.png",  // Đường dẫn hình ảnh từ thư mục public/imgs
    price: "30.000đ",
    description: "Bút ký độc đáo được in 3D với thiết kế tinh tế.",
  },
  {
    id: 4,
    name: "Móc khóa hoodie 3D",
    category: "Quần áo",
    image: "/imgs/BST171-400x400.png",  // Đường dẫn hình ảnh từ thư mục public/imgs
    price: "45.000đ",
    description: "Phụ kiện thời trang dành cho fan của hoodie.",
  },
];

export const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
      <div className="bg-gray-100 min-h-screen p-6">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Sản phẩm in 3D</h1>

        {/* Bộ lọc danh mục */}
        <div className="flex justify-center gap-6 mb-6 flex-wrap">
          {categories.map((cat) => (
              <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 text-lg font-semibold rounded-full transition-all duration-300 ${
                      selectedCategory === cat
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-600 border-2 border-indigo-600"
                  } hover:bg-indigo-500 hover:text-white`}
              >
                {cat}
              </button>
          ))}
        </div>

        {/* Ô tìm kiếm */}
        <div className="flex justify-center mb-8">
          <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 border-indigo-600 px-4 py-2 w-full max-w-md rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
              <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white border-2 border-indigo-200 p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                {/* Hình ảnh sản phẩm */}
                <img
                    src={product.image}
                    alt={product.name}
                    className="mb-4 w-full h-48 object-cover rounded-lg"  // Điều chỉnh chiều cao của hình ảnh
                />
                <h2 className="font-semibold text-xl text-indigo-600">{product.name}</h2>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="font-bold text-lg mt-2">{product.price}</p>
              </div>
          ))}
        </div>

        {/* Popup chi tiết sản phẩm */}
        {selectedProduct && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-xl relative">
                <button
                    onClick={() => setSelectedProduct(null)}
                    className="absolute top-2 right-2 text-black text-2xl"
                >
                  ×
                </button>
                <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{selectedProduct.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{selectedProduct.category}</p>
                <p className="mb-4">{selectedProduct.description}</p>
                <p className="font-bold text-xl text-indigo-600">{selectedProduct.price}</p>
              </div>
            </div>
        )}
      </div>
  );
};
