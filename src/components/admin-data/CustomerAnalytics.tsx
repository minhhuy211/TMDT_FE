import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { useTheme } from "next-themes"

const CustomerAnalytics: React.FC = () => {
    const { theme } = useTheme()

    return (
        <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
            <CardHeader>
                <CardTitle className={theme === "dark" ? "text-white" : ""}>Phân tích khách hàng</CardTitle>
                <CardDescription>Thông tin về khách hàng của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {[
                    { label: "Khách hàng mới", value: "245", progress: 45 },
                    { label: "Khách hàng quay lại", value: "568", progress: 75 },
                    { label: "Tỷ lệ chuyển đổi", value: "3.2%", progress: 32 },
                    { label: "Khách hàng VIP", value: "128", progress: 25 },
                ].map(({ label, value, progress }) => (
                    <div key={label} className="space-y-2">
                        <div className="flex justify-between">
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>{label}</span>
                            <span className={theme === "dark" ? "text-white font-medium" : "text-gray-900 font-medium"}>
                {value}
              </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default CustomerAnalytics
