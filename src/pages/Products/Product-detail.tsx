import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check, CircleX, ShoppingCart } from "lucide-react";

type ProductAPI = {
  productId: string;
  categoryName: string;
  productName: string;
  description: string;
  price: number;
  stock: number;
  imgUrl: string;
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<ProductAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI states
  const [selectedColor, setSelectedColor] = useState("Đỏ"); // default color demo
  const [selectedPrintLocation, setSelectedPrintLocation] = useState("Trước"); // default location demo
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    comment: "",
    rating: 1,
  });

  // Lấy dữ liệu từ API
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("http://localhost:8080/api/products")
        .then((res) => {
          if (!res.ok) throw new Error("Không thể tải dữ liệu sản phẩm");
          return res.json();
        })
        .then((data) => {
          // Tìm product theo productId trong param
          const prod = data.result.find(
              (p: ProductAPI) => p.productId === productId
          );
          if (!prod) {
            setError("Không tìm thấy sản phẩm.");
            setProduct(null);
          } else {
            setProduct(prod);
            // reset lựa chọn mặc định
            setSelectedColor("Đỏ");
            setSelectedPrintLocation("Trước");
          }
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  }, [productId]);

  if (loading)
    return (
        <div className="text-center mt-12 text-xl text-gray-700">Đang tải...</div>
    );

  if (error)
    return (
        <div className="text-center mt-12 text-xl text-red-500">{error}</div>
    );

  if (!product)
    return (
        <div className="text-center mt-12 text-xl text-gray-700">
          Không tìm thấy sản phẩm.
        </div>
    );

  // Các màu và vị trí in bạn tự thêm hoặc lấy từ đâu đó, demo tạm
  const colors = ["Đỏ", "Xanh", "Vàng"];
  const printLocations = ["Trước", "Sau", "Bên hông"];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.productId,
      name: product.productName,
      image: product.imgUrl,
      quantity,
      color: selectedColor,
      printLocation: selectedPrintLocation,
      price: product.price,
    };

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));

    setIsModalOpen(true);
  };

  const handleBuyNow = () => {
    navigate("/checkout");
  };

  const renderStars = (rating: number) => {
    return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
  };

  return (
      <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-16 py-12 relative bg-white">
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative animate-fallDown">
                <Check className="text-green-500 text-4xl mb-4" />
                <h2 className="text-lg font-bold mb-2 text-gray-700">
                  Đã thêm vào giỏ hàng!
                </h2>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <img
                      src={product.imgUrl}
                      alt={product.productName}
                      className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <p className="text-gray-600">
                      {product.productName} x {quantity}
                    </p>
                    <p className="text-gray-600">
                      {selectedColor} | {selectedPrintLocation}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {(product.price * quantity).toLocaleString()}đ
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-gray-700"
                  >
                    Tiếp tục mua
                  </button>
                  <button
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate("/cart");
                      }}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Xem giỏ hàng
                  </button>
                </div>
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <CircleX />
                </button>
              </div>
            </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex flex-col lg:w-2/5 gap-4">
            <img
                src={product.imgUrl}
                alt={product.productName}
                className="w-full h-96 object-cover rounded-lg shadow-md border border-gray-300"
            />
            {/* Nếu có nhiều ảnh thì map tương tự, hiện demo chỉ có 1 */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              <img
                  src={product.imgUrl}
                  alt={product.productName}
                  className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-300"
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-700">
              {product.productName}
            </h1>
            <p className="text-lg text-gray-700 font-bold mt-2">
              {product.price.toLocaleString()}đ
            </p>
            <p className="text-gray-700 mt-2">{product.description}</p>

            {/* Màu sắc */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-700">Chọn màu:</h3>
              <div className="flex gap-3 mt-2">
                {colors.map((color) => (
                    <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-1 rounded-md text-white duration-300 transform hover:cursor-pointer active:scale-95 transition-all ${
                            selectedColor === color
                                ? "bg-gray-800 scale-105"
                                : "bg-gray-400 hover:bg-gray-500"
                        }`}
                    >
                      {color}
                    </button>
                ))}
              </div>
            </div>

            {/* Nơi in */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-700">Chọn nơi in:</h3>
              <div className="flex gap-3 mt-2">
                {printLocations.map((location) => (
                    <button
                        key={location}
                        onClick={() => setSelectedPrintLocation(location)}
                        className={`px-4 py-1 rounded-md text-white duration-300 transform hover:cursor-pointer active:scale-95 transition-all ${
                            selectedPrintLocation === location
                                ? "bg-gray-800 scale-105"
                                : "bg-gray-400 hover:bg-gray-500"
                        }`}
                    >
                      {location}
                    </button>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="mt-4 flex items-center gap-4">
              <h3 className="font-semibold text-lg text-gray-700">Số lượng:</h3>
              <div className="flex items-center gap-2">
                <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                    className="bg-gray-300 p-2 rounded-full text-xl text-gray-700 hover:cursor-pointer active:scale-95 transition-all"
                >
                  -
                </button>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number(e.target.value))}
                    min="1"
                    className="border border-gray-300 rounded-md px-3 py-2 w-20 text-center text-gray-700 hover:cursor-pointer active:scale-95 transition-all"
                />
                <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-gray-300 p-2 rounded-full text-xl text-gray-700 hover:cursor-pointer active:scale-95 transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Nút hành động */}
            <div className="mt-6 flex gap-4">
              <button
                  onClick={handleAddToCart}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md w-full max-w-xs flex items-center justify-center gap-2 hover:cursor-pointer active:scale-95 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                Thêm vào giỏ hàng
              </button>
              <button
                  onClick={handleBuyNow}
                  className="bg-black text-white px-4 py-2 rounded-lg shadow-md w-full max-w-xs flex items-center justify-center gap-2 hover:cursor-pointer active:scale-95 transition-all"
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>

        {/* Phần đánh giá có thể giữ nguyên hoặc tạm ẩn nếu API không có */}
      </div>
  );
};

export default ProductDetail;
