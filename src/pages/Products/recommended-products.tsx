"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface RecommendedProduct {
    id: string
    name: string
    image: string
    price: number
    originalPrice?: number
    rating: number
    reviewCount: number
    category: string
    discount?: number
    isHot?: boolean
    isBestSeller?: boolean
}

const RECOMMENDED_PRODUCTS: RecommendedProduct[] = [
    {
        id: "r1",
        name: "Mô hình Naruto Hokage",
        image: "/placeholder.svg?height=300&width=300",
        price: 780000,
        originalPrice: 950000,
        rating: 4.9,
        reviewCount: 234,
        category: "Mô hình Anime",
        discount: 18,
        isHot: true,
    },
    {
        id: "r2",
        name: "Keycap Dragon Ball Z",
        image: "/placeholder.svg?height=300&width=300",
        price: 420000,
        rating: 4.8,
        reviewCount: 156,
        category: "Phụ kiện Gaming",
        isBestSeller: true,
    },
    {
        id: "r3",
        name: "Mô hình Vegeta Blue",
        image: "/placeholder.svg?height=300&width=300",
        price: 890000,
        originalPrice: 1050000,
        rating: 4.7,
        reviewCount: 189,
        category: "Mô hình Anime",
        discount: 15,
    },
    {
        id: "r4",
        name: "Giá đỡ controller RGB Pro",
        image: "/placeholder.svg?height=300&width=300",
        price: 350000,
        rating: 4.6,
        reviewCount: 98,
        category: "Phụ kiện Gaming",
        isHot: true,
    },
    {
        id: "r5",
        name: "Mô hình Ichigo Bankai",
        image: "/placeholder.svg?height=300&width=300",
        price: 920000,
        rating: 4.8,
        reviewCount: 167,
        category: "Mô hình Anime",
        isBestSeller: true,
    },
    {
        id: "r6",
        name: "Bộ keycap Cyberpunk",
        image: "/placeholder.svg?height=300&width=300",
        price: 480000,
        originalPrice: 580000,
        rating: 4.5,
        reviewCount: 123,
        category: "Phụ kiện Gaming",
        discount: 17,
    },
]

export function RecommendedProducts() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const itemsPerView = 4
    const maxIndex = Math.max(0, RECOMMENDED_PRODUCTS.length - itemsPerView)

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
    }

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`w-3 h-3 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        )
    }

    const handleAddToCart = (product: RecommendedProduct) => {
        // Add to cart logic here
        console.log("Added to cart:", product.name)
    }

    return (
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 py-8 bg-white">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Sản phẩm được đánh giá tốt</h2>
                    <p className="text-gray-600">Những sản phẩm có điểm đánh giá cao từ khách hàng</p>
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={prevSlide}
                        disabled={currentIndex === 0}
                        className="w-10 h-10 p-0"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={nextSlide}
                        disabled={currentIndex >= maxIndex}
                        className="w-10 h-10 p-0"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="relative overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out gap-4"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                    }}
                >
                    {RECOMMENDED_PRODUCTS.map((product) => (
                        <Card
                            key={product.id}
                            className="flex-shrink-0 w-[calc(25%-12px)] hover:shadow-lg transition-shadow duration-200 group cursor-pointer"
                        >
                            <CardContent className="p-0">
                                <div className="relative">
                                    <img
                                        src={product.image || "/placeholder.svg"}
                                        alt={product.name}
                                        className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-200"
                                    />

                                    {/* Badges */}
                                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                                        {product.discount && (
                                            <Badge className="bg-red-500 text-white text-xs px-2 py-1">
                                                -{product.discount}%
                                            </Badge>
                                        )}
                                        {product.isHot && (
                                            <Badge className="bg-orange-500 text-white text-xs px-2 py-1">
                                                HOT
                                            </Badge>
                                        )}
                                        {product.isBestSeller && (
                                            <Badge className="bg-green-500 text-white text-xs px-2 py-1">
                                                BÁN CHẠY
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Quick Add to Cart */}
                                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <Button
                                            size="sm"
                                            className="w-8 h-8 p-0 bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleAddToCart(product)
                                            }}
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-4">
                                    <Badge variant="secondary" className="text-xs mb-2">
                                        {product.category}
                                    </Badge>

                                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {product.name}
                                    </h3>

                                    <div className="flex items-center gap-2 mb-3">
                                        {renderStars(product.rating)}
                                        <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                      <span className="text-lg font-bold text-gray-900">
                        {product.price.toLocaleString("vi-VN")}đ
                      </span>
                                            {product.originalPrice && (
                                                <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice.toLocaleString("vi-VN")}đ
                        </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default RecommendedProducts
