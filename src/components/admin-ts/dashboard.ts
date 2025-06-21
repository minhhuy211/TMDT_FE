import type { ReactNode } from "react"

export interface StatsCardProps {
    icon: ReactNode
    title: string
    value: string
    change: string
    trend: "up" | "down"
    bgColor: string
}

export interface Order {
    id: string
    customer: string
    date: string
    amount: string
    status: string
    statusColor: string
}

export interface Product {
    name: string
    category: string
    sales: number
    revenue: string
    growth: number
    positive: boolean
}
