import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/model/Product";
import {addToCartLocal} from "@/utils/localCart.ts";

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void; // Optional callback nếu muốn custom xử lý giỏ hàng
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
    // Destructuring cho gọn và rõ ràng
    const { productId, img, productName, price, category } = product;

    return (
        <Card className="group flex flex-col justify-between h-full overflow-hidden">
            <Link to={`/product-detail/${productId}`} className="block">
                <CardHeader className="p-0">
                    <img
                        src={img || "/placeholder.svg?height=300&width=300"}
                        alt={productName}
                        className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                    />
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-lg font-semibold text-gray-900 mb-1">{productName}</CardTitle>
                    <p className="text-sm text-gray-600 mb-2">{category?.name || "Không rõ danh mục"}</p>
                    <p className="text-gray-900 font-bold text-lg">{price.toLocaleString("vi-VN")}đ</p>
                </CardContent>
            </Link>
            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
                    onClick={e => {
                        e.preventDefault();
                        if (onAddToCart) {
                            onAddToCart(product);
                        } else {
                            addToCartLocal(product);
                            alert(`Đã thêm "${product.productName}" vào giỏ hàng!`);
                        }
                    }}
                >
                    <FaShoppingCart className="inline mr-2" />
                    Thêm vào giỏ
                </Button>
            </CardFooter>
        </Card>
    );
};

export default ProductCard;
