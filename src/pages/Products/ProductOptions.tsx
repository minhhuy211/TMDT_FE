"use client"

import type React from "react"
import { Button } from "@/components/ui/button"

interface ProductOptionsProps {
    colors: string[]
    printLocations: string[]
    materials: string[]
    sizes: string[]
    selectedColor: string
    setSelectedColor: React.Dispatch<React.SetStateAction<string>>
    selectedPrintLocation: string
    setSelectedPrintLocation: React.Dispatch<React.SetStateAction<string>>
    selectedMaterial: string
    setSelectedMaterial: React.Dispatch<React.SetStateAction<string>>
    selectedSize: string
    setSelectedSize: React.Dispatch<React.SetStateAction<string>>
}

export const ProductOptions = ({
                                   colors,
                                   printLocations,
                                   materials,
                                   sizes,
                                   selectedColor,
                                   setSelectedColor,
                                   selectedPrintLocation,
                                   setSelectedPrintLocation,
                                   selectedMaterial,
                                   setSelectedMaterial,
                                   selectedSize,
                                   setSelectedSize,
                               }: ProductOptionsProps) => {
    return (
        <div className="space-y-4 mb-6">
            <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Chọn màu vật liệu:</h3>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <Button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            variant={selectedColor === color ? "default" : "outline"}
                            className={`h-9 px-4 text-sm ${
                                selectedColor === color ? "bg-gray-800 text-white" : "border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            {color}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Chọn vị trí in 3D:</h3>
                <div className="flex flex-wrap gap-2">
                    {printLocations.map((location) => (
                        <Button
                            key={location}
                            onClick={() => setSelectedPrintLocation(location)}
                            variant={selectedPrintLocation === location ? "default" : "outline"}
                            className={`h-9 px-4 text-sm ${
                                selectedPrintLocation === location
                                    ? "bg-gray-800 text-white"
                                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            {location}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Chọn chất liệu:</h3>
                <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                        <Button
                            key={material}
                            onClick={() => setSelectedMaterial(material)}
                            variant={selectedMaterial === material ? "default" : "outline"}
                            className={`h-9 px-4 text-sm ${
                                selectedMaterial === material
                                    ? "bg-gray-800 text-white"
                                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            {material}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg text-gray-700 mb-2">Chọn kích thước:</h3>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            variant={selectedSize === size ? "default" : "outline"}
                            className={`h-9 px-4 text-sm ${
                                selectedSize === size ? "bg-gray-800 text-white" : "border-gray-300 text-gray-800 hover:bg-gray-100"
                            }`}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
