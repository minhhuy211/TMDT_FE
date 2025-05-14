import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

// Sample product data
const products = [
    {
        id: 1,
        name: "Móc treo 3D",
        category: "Gia dụng",
        image: "/imgs/BST171-400x400.png",
        price: 50000, // number type
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
    }
];

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const product = products.find(p => p.id.toString() === productId);

    const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
    const [selectedPrintLocation, setSelectedPrintLocation] = useState(product?.printLocations[0] || "");
    const [quantity, setQuantity] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newReview, setNewReview] = useState({
        author: "",
        comment: "",
        rating: 1
    });

    if (!product) return <div className="text-center mt-12 text-xl text-gray-700">Không tìm thấy sản phẩm.</div>;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            image: product.image,
            quantity,
            color: selectedColor,
            printLocation: selectedPrintLocation,
            price: product.price
        };

        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        cart.push(cartItem);
        localStorage.setItem("cart", JSON.stringify(cart));

        setIsModalOpen(true);
    };

    const handleBuyNow = () => {
        navigate("/checkout");
    };

    const handleReviewSubmit = () => {
        if (newReview.author && newReview.comment) {
            const updatedProduct = { ...product };
            updatedProduct.reviews.push({
                ...newReview,
                date: new Date().toISOString(),
            });
            // In a real-world scenario, save the updated product to the server or database.
            // For now, just log it for demo purposes.
            console.log(updatedProduct);
        }
    };

    const renderStars = (rating: number) => {
        return "★★★★★☆☆☆☆☆".slice(5 - rating, 10 - rating);
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto px-8 sm:px-16 py-12 relative bg-white">
            {/* ✅ Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center relative animate-fallDown">
                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 text-4xl mb-4" />
                        <h2 className="text-lg font-bold mb-2 text-gray-700">Đã thêm vào giỏ hàng!</h2>
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg" />
                            <div>
                                <p className="text-gray-600">{product.name} x {quantity}</p>
                                <p className="text-gray-600">{selectedColor} | {selectedPrintLocation}</p>
                                <p className="text-gray-800 font-semibold">{(product.price * quantity).toLocaleString()}đ</p>
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
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                </div>
            )}

            {/* Nội dung sản phẩm */}
            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex flex-col lg:w-2/5 gap-4">
                    <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded-lg shadow-md border border-gray-300" />
                    <div className="flex gap-4 overflow-x-auto pb-4">
                        {product.images.map((img, i) => (
                            <img key={i} src={img} alt={`thumb-${i}`} className="w-24 h-24 object-cover rounded-lg cursor-pointer border border-gray-300" />
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-700">{product.name}</h1>
                    <p className="text-lg text-gray-700 font-bold mt-2">{product.price.toLocaleString()}đ</p>
                    <p className="text-gray-700 mt-2">{product.description}</p>

                    {/* Màu sắc */}
                    <div className="mt-4">
                        <h3 className="font-semibold text-lg text-gray-700">Chọn màu:</h3>
                        <div className="flex gap-3 mt-2">
                            {product.colors.map(color => (
                                <button
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-4 py-1 rounded-md text-white duration-300 transform hover:cursor-pointer active:scale-95 transition-all ${selectedColor === color ? 'bg-gray-800 scale-105' : 'bg-gray-400 hover:bg-gray-500'}`}
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
                            {product.printLocations.map(location => (
                                <button
                                    key={location}
                                    onClick={() => setSelectedPrintLocation(location)}
                                    className={`px-4 py-1 rounded-md text-white duration-300 transform hover:cursor-pointer active:scale-95 transition-all ${selectedPrintLocation === location ? 'bg-gray-800 scale-105' : 'bg-gray-400 hover:bg-gray-500'}`}
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
                            >-</button>
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
                            >+</button>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="mt-6 flex gap-4">
                        <button
                            onClick={handleAddToCart}
                            className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md w-full max-w-xs flex items-center justify-center gap-2 hover:cursor-pointer active:scale-95 transition-all"
                        >
                            <FontAwesomeIcon icon={faCartPlus} className="w-5 h-5" />
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

            {/* Đánh giá */}
            <div className="mt-12">
                <h3 className="font-semibold text-lg text-gray-700 mb-4">Đánh giá:</h3>
                <div className="flex flex-col w-full max-w-lg">
                    {product.reviews.map((review, index) => (
                        <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
                            <p className="text-gray-800 text-lg font-semibold">{review.author}</p>
                            <p className="font-medium text-gray-800">{renderStars(review.rating)}</p>
                            <p className="text-gray-600">{review.comment}</p>
                            <p className="text-gray-400 text-sm mt-2">{new Date(review.date).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>

                {/* Đánh giá mới */}
                <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Nhận xét:</label>
                        <textarea
                            value={newReview.comment}
                            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-2 w-full"
                            rows={4}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Đánh giá:</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setNewReview({ ...newReview, rating: star })}
                                    className={`text-${newReview.rating >= star ? 'yellow' : 'gray'}-400`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                    </div>
                    <button
                        onClick={handleReviewSubmit}
                        className="bg-black text-white px-4 py-2 rounded-lg"
                    >
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
