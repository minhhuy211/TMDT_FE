"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, User, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Review {
    id: string
    userName: string
    userAvatar?: string
    rating: number
    date: string
    title: string
    content: string
    helpful: number
    notHelpful: number
    verified: boolean
    images?: string[]
}

const MOCK_REVIEWS: Review[] = [
    {
        id: "1",
        userName: "Nguyễn Văn A",
        rating: 5,
        date: "2024-01-15",
        title: "Chất lượng tuyệt vời!",
        content:
            "Mô hình rất đẹp, chi tiết sắc nét. Chất liệu PLA in ra rất mịn và bền. Đóng gói cẩn thận, giao hàng nhanh. Sẽ mua thêm những sản phẩm khác.",
        helpful: 24,
        notHelpful: 2,
        verified: true,
        images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    },
    {
        id: "2",
        userName: "Trần Thị B",
        rating: 4,
        date: "2024-01-10",
        title: "Đáng tiền",
        content: "Sản phẩm ổn, giá cả hợp lý. Màu sắc như mô tả. Chỉ có điều thời gian giao hàng hơi lâu một chút.",
        helpful: 18,
        notHelpful: 1,
        verified: true,
    },
    {
        id: "3",
        userName: "Lê Minh C",
        rating: 5,
        date: "2024-01-08",
        title: "Hoàn hảo cho bộ sưu tập",
        content:
            "Mình đã mua nhiều mô hình ở đây, chất lượng luôn ổn định. Mô hình này đặc biệt đẹp, chi tiết rất tốt. Recommend!",
        helpful: 31,
        notHelpful: 0,
        verified: true,
        images: ["/placeholder.svg?height=100&width=100"],
    },
    {
        id: "4",
        userName: "Phạm Thị D",
        rating: 3,
        date: "2024-01-05",
        title: "Tạm ổn",
        content:
            "Sản phẩm nhìn chung ổn nhưng có một vài chi tiết nhỏ chưa được hoàn thiện lắm. Với mức giá này thì cũng chấp nhận được.",
        helpful: 8,
        notHelpful: 5,
        verified: false,
    },
    {
        id: "5",
        userName: "Hoàng Văn E",
        rating: 5,
        date: "2024-01-02",
        title: "Xuất sắc!",
        content:
            "Chất lượng in 3D rất tốt, không có lỗi nào. Màu sắc sống động, đúng như hình ảnh. Shop phục vụ nhiệt tình, giao hàng nhanh.",
        helpful: 42,
        notHelpful: 1,
        verified: true,
    },
]

const ratingDistribution = [
    { stars: 5, count: 89, percentage: 71 },
    { stars: 4, count: 23, percentage: 18 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 4, percentage: 3 },
    { stars: 1, count: 2, percentage: 2 },
]

export function ProductReviews() {
    const [reviews, setReviews] = useState<Review[]>(MOCK_REVIEWS)
    const [sortBy, setSortBy] = useState("newest")
    const [filterRating, setFilterRating] = useState("all")

    const totalReviews = 126
    const averageRating = 4.6

    const handleHelpful = (reviewId: string, isHelpful: boolean) => {
        setReviews((prev) =>
            prev.map((review) => {
                if (review.id === reviewId) {
                    return {
                        ...review,
                        helpful: isHelpful ? review.helpful + 1 : review.helpful,
                        notHelpful: !isHelpful ? review.notHelpful + 1 : review.notHelpful,
                    }
                }
                return review
            }),
        )
    }

    const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
        const sizeClasses = {
            sm: "w-3 h-3",
            md: "w-4 h-4",
            lg: "w-5 h-5",
        }

        return (
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="mt-12 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Đánh giá sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Rating Overview */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900 mb-2">{averageRating}</div>
                            <div className="flex justify-center mb-2">{renderStars(Math.round(averageRating), "lg")}</div>
                            <p className="text-gray-600">{totalReviews} đánh giá</p>
                        </div>

                        <div className="space-y-2">
                            {ratingDistribution.map((item) => (
                                <div key={item.stars} className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 w-12">
                                        <span className="text-sm">{item.stars}</span>
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    </div>
                                    <Progress value={item.percentage} className="flex-1 h-2" />
                                    <span className="text-sm text-gray-600 w-8">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">Lọc và sắp xếp:</span>
                        </div>
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Mới nhất</SelectItem>
                                <SelectItem value="oldest">Cũ nhất</SelectItem>
                                <SelectItem value="highest">Điểm cao nhất</SelectItem>
                                <SelectItem value="lowest">Điểm thấp nhất</SelectItem>
                                <SelectItem value="helpful">Hữu ích nhất</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filterRating} onValueChange={setFilterRating}>
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả đánh giá</SelectItem>
                                <SelectItem value="5">5 sao</SelectItem>
                                <SelectItem value="4">4 sao</SelectItem>
                                <SelectItem value="3">3 sao</SelectItem>
                                <SelectItem value="2">2 sao</SelectItem>
                                <SelectItem value="1">1 sao</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                        {reviews.map((review) => (
                            <Card key={review.id} className="border-l-4 border-l-blue-500">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                <User className="w-6 h-6" />
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-semibold">{review.userName}</h4>
                                                {review.verified && (
                                                    <Badge variant="secondary" className="text-xs">
                                                        Đã xác minh
                                                    </Badge>
                                                )}
                                                <span className="text-sm text-gray-500">{review.date}</span>
                                            </div>

                                            <div className="flex items-center gap-2 mb-3">
                                                {renderStars(review.rating)}
                                                <h5 className="font-medium">{review.title}</h5>
                                            </div>

                                            <p className="text-gray-700 mb-4 leading-relaxed">{review.content}</p>

                                            {review.images && review.images.length > 0 && (
                                                <div className="flex gap-2 mb-4">
                                                    {review.images.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={image || "/placeholder.svg"}
                                                            alt={`Review image ${index + 1}`}
                                                            className="w-20 h-20 object-cover rounded-lg border"
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-4">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleHelpful(review.id, true)}
                                                    className="text-gray-600 hover:text-green-600"
                                                >
                                                    <ThumbsUp className="w-4 h-4 mr-1" />
                                                    Hữu ích ({review.helpful})
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleHelpful(review.id, false)}
                                                    className="text-gray-600 hover:text-red-600"
                                                >
                                                    <ThumbsDown className="w-4 h-4 mr-1" />
                                                    Không hữu ích ({review.notHelpful})
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Load More Button */}
                    <div className="text-center mt-8">
                        <Button variant="outline" className="px-8">
                            Xem thêm đánh giá
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductReviews
