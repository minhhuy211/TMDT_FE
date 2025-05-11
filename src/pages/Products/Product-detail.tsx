import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

// Dữ liệu mẫu sản phẩm
const products = [
    {
        id: 1,
        name: "Móc treo 3D",
        category: "Gia dụng",
        image: "/imgs/BST171-400x400.png",
        price: "50.000đ",
        description: "Móc treo tiện dụng in bằng công nghệ 3D, chịu lực tốt.",
        images: [
            "/imgs/BST171-400x400.png",
            "/imgs/BST171-400x400.png",
            "/imgs/BST171-400x400.png"
        ],
        colors: ["Đỏ", "Xanh", "Vàng"],
        printLocations: ["Trước", "Sau", "Bên hông"],
        reviews: [
            {
                rating: 5,
                comment: "Sản phẩm rất tiện lợi!",
                date: "2025-05-10",
                author: "Nguyễn Văn A"
            },
            {
                rating: 4,
                comment: "Tốt, nhưng cần cải thiện chất liệu.",
                date: "2025-05-08",
                author: "Trần Thị B"
            }
        ]
    },
    // Các sản phẩm khác ...
];

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>(); // Lấy productId từ URL
    const product = products.find((p) => p.id.toString() === productId);
    const navigate = useNavigate();  // Khởi tạo useNavigate

    const [selectedColor, setSelectedColor] = useState<string>(product?.colors[0] || "");
    const [selectedPrintLocation, setSelectedPrintLocation] = useState<string>(product?.printLocations[0] || "");
    const [quantity, setQuantity] = useState<number>(1);

    if (!product) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }

    // Xử lý khi người dùng chọn số lượng
    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    // Xử lý khi người dùng chọn màu
    const handleColorChange = (color: string) => {
        setSelectedColor(color);
    };

    // Xử lý khi người dùng chọn nơi in
    const handlePrintLocationChange = (location: string) => {
        setSelectedPrintLocation(location);
    };

    // Hàm hiển thị sao
    const renderStars = (rating: number) => {
        let stars = "";
        for (let i = 0; i < 5; i++) {
            stars += i < rating ? "★" : "☆";
        }
        return stars;
    };

    // Xử lý khi người dùng nhấn Mua ngay
    const handleBuyNow = () => {
        navigate('/checkout'); // Chuyển hướng đến trang thanh toán (checkout)
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-16 py-12">
            <div className="max-w-screen-xl mx-auto px-6 sm:px-10">
                {/* Phần chi tiết sản phẩm */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Hình ảnh sản phẩm */}
                    <div className="flex flex-col lg:w-2/5 gap-4">
                        <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`small-${index}`}
                                    className="w-24 h-24 object-cover rounded-lg cursor-pointer"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Thông tin sản phẩm */}
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-indigo-700">{product.name}</h1>
                        <p className="text-lg text-indigo-600 font-bold mt-2">{product.price}</p>
                        <p className="text-gray-700 mt-2">{product.description}</p>

                        {/* Chọn màu (Color Selection) */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg text-gray-700">Chọn màu:</h3>
                            <div className="flex gap-3 mt-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`px-4 py-1 rounded-md text-white transition duration-300 transform ${selectedColor === color ? 'bg-indigo-600 scale-105' : 'bg-gray-400 hover:bg-indigo-500'}`}
                                    >
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn nơi in (Print Location Selection) */}
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg text-gray-700">Chọn nơi in:</h3>
                            <div className="flex gap-3 mt-2">
                                {product.printLocations.map((location) => (
                                    <button
                                        key={location}
                                        onClick={() => handlePrintLocationChange(location)}
                                        className={`px-4 py-1 rounded-md text-white transition duration-300 transform ${selectedPrintLocation === location ? 'bg-indigo-600 scale-105' : 'bg-gray-400 hover:bg-indigo-500'}`}
                                    >
                                        {location}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Chọn số lượng */}
                        <div className="mt-4 flex items-center gap-4">
                            <h3 className="font-semibold text-lg text-gray-700">Số lượng:</h3>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    className="bg-gray-300 p-2 rounded-full text-xl"
                                    disabled={quantity <= 1}
                                >-</button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="border border-gray-300 rounded-md px-3 py-2 w-20 text-center"
                                />
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    className="bg-gray-300 p-2 rounded-full text-xl"
                                >+</button>
                            </div>
                        </div>

                        {/* Thêm vào giỏ hàng và Mua ngay */}
                        <div className="mt-6 flex gap-4">
                            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md w-full max-w-xs flex items-center justify-center gap-2">
                                <FontAwesomeIcon icon={faShoppingCart} className="w-5 h-5" />
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md w-full max-w-xs flex items-center justify-center gap-2"
                            >
                                Mua ngay
                            </button>


                    </div>
                    </div>
                </div>

                {/* Đánh giá */}
                <div className="mt-12">
                    <h3 className="font-semibold text-lg text-gray-700 mb-4">Đánh giá:</h3>
                    <div className="flex flex-col w-full max-w-lg">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                                <p className="text-gray-800 text-lg font-semibold">{review.author}</p>
                                <p className="font-medium text-indigo-700">{renderStars(review.rating)}</p>
                                <p className="text-gray-600">{review.comment}</p>
                                <p className="text-gray-400 text-sm mt-2">{new Date(review.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
