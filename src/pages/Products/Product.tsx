import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/pages/Products/ProductCard";
import { Category } from "@/model/Category";
import { Product } from "@/model/Product";
import categoryApi from "@/services/categoryApi";
import productApi from "@/services/productApi";


const ProductPage = () => {
    // selectedCateId giờ dùng để lưu categoryName
    const [selectedCateName, setSelectedCateName] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    // Lấy danh sách category từ API qua react-query
    const {
        data: categories = [],
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        refetch: refetchCategories,
    } = useQuery<Category[]>({
        queryKey: ["categories"],
        queryFn: categoryApi.getCategories,
        staleTime: 1000 * 60, // 1 phút cache
        retry: 1,
    });

    // Lấy danh sách sản phẩm (tất cả)
    const {
        data: products = [],
        isLoading: isLoadingProducts,
        isError: isErrorProducts,
        refetch: refetchProducts,
    } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: () => productApi.getProducts(100, 0),
        staleTime: 1000 * 60,
        retry: 1,
    });


    // Lọc sản phẩm theo categoryName (selectedCateName)
    const filteredByCategory = selectedCateName
        ? products.filter((p) => p.categoryName === selectedCateName)
        : products;

    // Lọc sản phẩm theo searchQuery
    const filteredProducts = filteredByCategory.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Tổng số lượng sản phẩm (tất cả)
    const allProductCount = products.length;

    // Hàm đếm số sản phẩm theo categoryName
    const getCategoryCount = (cateName: string) =>
        products.filter((p) => p.categoryName === cateName).length;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl md:text-5xl font-extrabold mt-2 mb-12 text-center text-gray-900 leading-tight">
                    Sản phẩm in 3D độc đáo dành cho <br className="hidden sm:inline" /> Fan Anime
                    & Game thủ
                </h1>

                {/* Category Filter và Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            onClick={() => setSelectedCateName(null)}
                            variant={selectedCateName === null ? "default" : "outline"}
                            className="h-8 px-4 text-xs rounded-md font-medium"
                        >
                            Tất cả ({allProductCount})
                        </Button>
                        {categories
                            .filter((cate): cate is Category => !!cate && !!cate.name)
                            .map((cate) => (
                                <Button
                                    key={cate.name}
                                    onClick={() => setSelectedCateName(cate.name)}
                                    variant={selectedCateName === cate.name ? "default" : "outline"}
                                    className="h-8 px-4 text-xs rounded-md font-medium"
                                >
                                    {cate.name} ({getCategoryCount(cate.name)})
                                </Button>
                            ))}
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 h-9 rounded-md border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 w-full sm:w-64"
                        />
                        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Loading/Error/Content */}
                {(isLoadingCategories || isLoadingProducts) ? (
                    <div className="text-center text-gray-500 py-10">Đang tải sản phẩm...</div>
                ) : (isErrorCategories || isErrorProducts) ? (
                    <div className="text-center text-red-500 py-10">
                        Không thể tải danh mục sản phẩm.
                        <Button className="ml-2" onClick={() => { refetchCategories(); refetchProducts(); }}>
                            Thử lại
                        </Button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <ProductCard product={product} key={product.productId} />
                            ))
                        ) : (
                            <p className="text-center col-span-full text-gray-500 text-lg py-10">
                                Không có sản phẩm phù hợp với tiêu chí tìm kiếm.
                            </p>
                        )}
                    </div>

                )}

            </div>
        </div>
    );
};

export default ProductPage;
