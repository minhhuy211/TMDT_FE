"use client"

import { Bar } from "react-chartjs-2"
import { Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { getBarChartData, getChartOptions } from "../admin-ts/chart-config.ts"

export function RevenueChart() {
    const { theme } = useTheme()
    const barChartData = getBarChartData()
    const chartOptions = getChartOptions(theme)

    return (
        <Card className={theme === "dark" ? "bg-gray-900 border-gray-800" : ""}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className={theme === "dark" ? "text-white" : ""}>Doanh thu từng tháng</CardTitle>
                        <CardDescription>Biểu đồ doanh thu theo tháng trong năm</CardDescription>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Download size={18} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Xuất PNG</DropdownMenuItem>
                            <DropdownMenuItem>Xuất PDF</DropdownMenuItem>
                            <DropdownMenuItem>Xuất CSV</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="h-[300px]">
                    <Bar data={barChartData} options={chartOptions.bar} />
                </div>
            </CardContent>
        </Card>
    )
}
