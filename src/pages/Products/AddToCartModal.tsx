import type React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductAPI {
    productId: string;
    productName: string;
    urlImage: string;
    price: number;
}

interface AddToCartModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    product: ProductAPI;
    quantity: number;
}

export const AddToCartModal = ({
                                   isModalOpen,
                                   setIsModalOpen,
                                   product,
                                   quantity,
                               }: AddToCartModalProps) => {
    const navigate = useNavigate();

    if (!isModalOpen) return null;

    return (
        <div
            className="fixed left-1/2 top-28 z-[100] flex justify-center w-full"
            style={{
                transform: "translateX(-50%)",
                minWidth: 360,
                maxWidth: "96vw",
                pointerEvents: "auto",
            }}
        >
            <Card className="w-full max-w-md bg-white border-0 rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-300 p-6">
                {/* Close Button */}
                <Button
                    onClick={() => setIsModalOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 rounded-full shadow-none"
                    aria-label="Đóng"
                >
                    <X className="w-6 h-6" />
                </Button>
                <CardHeader className="pb-2 flex flex-col items-center justify-center">
                    <CheckCircle className="text-emerald-500 w-14 h-14 mb-2 drop-shadow-lg animate-bounce" />
                    <CardTitle className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">Đã thêm vào giỏ hàng!</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col items-center">
                    <div className="flex items-center justify-center gap-6 mb-6">
                        <img
                            src={product.urlImage || "/placeholder.svg?height=80&width=80"}
                            alt={product.productName}
                            className="w-20 h-20 object-cover rounded-xl border-2 border-gray-200 shadow"
                        />
                        <div className="text-left space-y-1">
                            <div className="text-gray-900 font-bold text-lg">{product.productName}</div>
                            <div className="text-gray-500 text-base">Số lượng: <b>{quantity}</b></div>
                            <div className="text-emerald-700 font-bold text-lg">Tổng: {(product.price * quantity).toLocaleString("vi-VN")}₫</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 w-full mt-2">
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            variant="outline"
                            className="w-full border-2 border-gray-300 text-gray-800 font-semibold rounded-xl py-2 hover:bg-gray-100 transition"
                        >
                            Tiếp tục mua sắm
                        </Button>
                        <Button
                            onClick={() => {
                                setIsModalOpen(false);
                                navigate("/cart");
                            }}
                            className="w-full bg-emerald-600 text-white font-bold rounded-xl py-2 hover:bg-emerald-700 transition"
                        >
                            Xem giỏ hàng
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
