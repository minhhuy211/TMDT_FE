export interface Comment {
    id: string
    content: string
    createdAt: string
    user: {
        fullName: string
        avatarUrl: string
    }
}

export interface CommentRequest {
    productId: string;
    content: string;
}