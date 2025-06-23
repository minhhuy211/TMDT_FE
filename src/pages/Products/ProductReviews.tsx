"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import commentApi from "@/services/commentApi"
import type { Comment } from "@/model/Comment"
import {useSelector} from "react-redux";

interface Props {
    productId: string
}

export function ProductReviews({ productId }: Props) {
    const queryClient = useQueryClient()
    const [newComment, setNewComment] = useState("")
    const { data: comments = [], isLoading, isError } = useQuery<Comment[]>({
        queryKey: ["comments", productId],
        queryFn: () => commentApi.getByProduct(productId),
        enabled: !!productId,
    })
    console.log("COMMENTS:", comments);
    const mutation = useMutation({
        mutationFn: (data: { productId: string; content: string }) => commentApi.create(data),
        onSuccess: () => {
            setNewComment("")
            queryClient.invalidateQueries({ queryKey: ["comments", productId] })
        },
    })

    return (
        <div className="mt-12 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Đánh giá sản phẩm</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Form gửi đánh giá */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-2">Viết đánh giá của bạn:</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Nhập đánh giá của bạn..."
                            className="w-full border p-3 rounded-md mb-2"
                            rows={4}
                        />
                        <Button
                            onClick={() => mutation.mutate({ productId, content: newComment })}
                            disabled={mutation.isPending || newComment.trim() === ""}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {mutation.isPending ? "Đang gửi..." : "Gửi đánh giá"}
                        </Button>
                        {mutation.isError && (
                            <p className="text-red-600 mt-2 text-sm">Gửi đánh giá thất bại. Hãy thử lại!</p>
                        )}
                    </div>

                    {/* Danh sách đánh giá */}
                    {isLoading && <p>Đang tải bình luận...</p>}
                    {isError && <p>Không thể tải bình luận.</p>}
                    {!isLoading && comments.length === 0 && (
                        <p className="text-gray-600">Chưa có đánh giá nào.</p>
                    )}

                    <div className="space-y-6">
                        {[...comments]
                            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            .map((review) => (
                            <Card key={review.id} className="border-l-4 border-l-blue-500">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <Avatar className="w-12 h-12">
                                            <AvatarImage src={review.user?.avatarUrl || "/placeholder.svg"} />
                                            <AvatarFallback>
                                                <User className="w-6 h-6" />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h4 className="font-semibold">
                                                    {review.user?.fullName || "Người dùng ẩn danh"}
                                                </h4>

                                                <span className="text-sm text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed">{review.content}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductReviews
