import React from "react";
import { Product } from "@/model/Product";
import ProductCard from "@/pages/Products/ProductCard";

interface Props {
    products: Product[];
    count?: number;
}

const RecommendedProducts: React.FC<Props> = ({ products, count = 4 }) => {
    if (!products || products.length === 0) return null;
    // Random nếu nhiều hơn count
    const displayList =
        products.length > count
            ? [...products].sort(() => Math.random() - 0.5).slice(0, count)
            : products;

    return (
        <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Sản phẩm cùng danh mục</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {displayList.map((product) => (
                    <ProductCard product={product} key={product.productId} />
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;
