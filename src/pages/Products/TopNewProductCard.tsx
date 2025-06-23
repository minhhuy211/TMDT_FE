import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { ProductResponse } from "@/model/Product";
import { addToCartLocal, getCartLocal } from "@/utils/localCart";
import { setCart } from "@/redux/cartSlice";

interface TopNewProductCardProps {
  product: ProductResponse;
}

const TopNewProductCard: React.FC<TopNewProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="group flex flex-col justify-between h-full overflow-hidden border rounded-lg shadow-sm">
      <Link to={`/product-detail/${product.productId}`} className="block">
        <div className="p-0">
          <img
            src={product.urlImage || "/placeholder.svg?height=300&width=300"}
            alt={product.productName}
            className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {product.productName}
          </h3>
          <p className="text-gray-900 font-bold text-lg">
            {product.price?.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button
          className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300"
          onClick={(e) => {
            e.preventDefault();
            addToCartLocal({
              productId: product.productId,
              productName: product.productName,
              price: product.price,
              urlImage: product.urlImage,
              categoryName: "", // không cần
              status: product.status,
              description: product.description,
            });
            dispatch(setCart(getCartLocal()));
          }}
        >
          <FaShoppingCart className="inline mr-2" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default TopNewProductCard;
