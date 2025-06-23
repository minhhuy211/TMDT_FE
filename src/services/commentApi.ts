import api from "@/services/api";
import type { Comment, CommentRequest } from "@/model/Comment";

interface APIResponse<T> {
    result: T;
}

const commentApi = {
    getByProduct(productId: string): Promise<Comment[]> {
        return api.get<Comment[]>(`/comments/product/${productId}`);
    },

    create(data: CommentRequest): Promise<Comment> {
        return api
            .post<APIResponse<Comment>>(`/comments`, data)
            .then((res) => {
                console.log("📤 Response from create comment:", res);
                return res.result;
            });
    },
};

export default commentApi;
