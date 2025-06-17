"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface QuantitySelectorProps {
    quantity: number
    handleQuantityChange: (newQuantity: number) => void
    stock: number
    isOutOfStock: boolean
}

export const QuantitySelector = ({ quantity, handleQuantityChange, stock, isOutOfStock }: QuantitySelectorProps) => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
                <h3 className="font-semibold text-lg text-gray-700">Số lượng:</h3>
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1 || isOutOfStock}
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-full text-lg"
                    >
                        -
                    </Button>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(Number(e.target.value))}
                        min={1}
                        max={stock}
                        className="w-20 text-center h-9"
                        disabled={isOutOfStock}
                    />
                    <Button
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={quantity >= stock || isOutOfStock}
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 rounded-full text-lg"
                    >
                        +
                    </Button>
                </div>
            </div>
            <p className="text-lg font-medium text-gray-700">
                Tình trạng:{" "}
                <span className={isOutOfStock ? "text-red-600" : "text-green-600"}>
          {isOutOfStock ? "Hết hàng" : `Còn hàng (${stock})`}
        </span>
            </p>
        </div>
    )
}
