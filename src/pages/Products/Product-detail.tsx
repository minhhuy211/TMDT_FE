// product-detail.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Để lấy ID từ URL
import { Link } from "react-router-dom"; // Dùng để quay lại trang danh sách sản phẩm

interface Product {
    id: number;
    name: string;
    category: string;
    image: string;
    price: string;
    description: string;
}

// Dữ liệu sản phẩm mẫu (thay thế bằng API hoặc dữ liệu thực tế)
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
    // Thêm các sản phẩm khác vào đây
];

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>(); // Lấy productId từ URL
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // Tìm sản phẩm trong danh sách theo ID
        const productData = products.find((prod) => prod.id.toString() === productId);
        setProduct(productData || null); // Set thông tin sản phẩm nếu tìm thấy
    }, [productId]);

    if (!product) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="container">
                <div className="back-button">
                    <Link to="/products" className="text-indigo-600">Quay lại danh sách sản phẩm</Link>
                </div>
                <div className="product-detail">
                    <div className="image-container">
                        <img src={product.image} alt={product.name} className="product-image" />
                    </div>
                    <div className="details-container">
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-category">Danh mục: {product.category}</p>
                        <p className="product-description">{product.description}</p>
                        <p className="product-price">{product.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
