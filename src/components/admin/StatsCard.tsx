import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { useTheme } from "next-themes"
import { cn } from "@/components/admin-ts/utils"
import { ReactNode } from "react"
import React from "react"

// Stats card data type
type StatsCardProps = {
    icon: ReactNode
    title: string
    value: string
    change: string
    trend: "up" | "down"
    bgColor: string
  }
  // Stats card component
function StatsCard({ icon, title, value, change, trend, bgColor }: StatsCardProps) {
    const { theme } = useTheme()
  
    return (    
      <Card
        className={cn(
          "overflow-hidden transition-all duration-300 hover:shadow-md",
          theme === "dark" ? "bg-gray-900 border-gray-800" : "",
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={cn("p-3 rounded-lg", bgColor)}>{icon}</div>
            <div className={cn("flex items-center gap-1", trend === "up" ? "text-green-500" : "text-red-500")}>
              {trend === "up" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
              <span className="text-sm font-medium">{change}</span>
            </div>
          </div>
          <div>
            <p className={cn("text-sm font-medium", theme === "dark" ? "text-gray-400" : "text-gray-500")}>{title}</p>
            <h4 className={cn("text-2xl font-bold mt-1", theme === "dark" ? "text-white" : "text-gray-900")}>{value}</h4>
          </div>
        </CardContent>
      </Card>
    )
  }

export default StatsCard