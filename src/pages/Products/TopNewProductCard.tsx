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

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addToCartLocal({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      urlImage: product.urlImage,
      categoryName: "",
      status: product.status,
      description: product.description,
    });
    dispatch(setCart(getCartLocal()));
  };

  return (
    <div className="group flex flex-col justify-between h-full overflow-hidden rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
      <Link to={`/product-detail/${product.productId}`} className="block">
        <div className="relative overflow-hidden rounded-t-2xl aspect-square">
          <img
            src={product.urlImage || "/placeholder.svg?height=400&width=400"}
            alt={product.productName}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
            {product.productName}
          </h3>
          <p className="text-lg font-bold text-primary">
            {product.price?.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button
          className="w-full bg-primary text-white hover:bg-primary/90 transition-colors duration-300 rounded-xl text-sm font-medium py-2"
          onClick={handleAddToCart}
        >
          <FaShoppingCart className="inline mr-2" />
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default TopNewProductCard;
