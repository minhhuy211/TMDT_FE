// hooks/use-user.ts
import { useEffect, useState } from "react"
import userApi from "@/services/userApi"

export type User = {
    id: string
    name: string
    email: string
    role: string
    username?: string
}

export function useUsers() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        setLoading(true)
        setError(null)
        try {
            const rawUsers = await userApi.getUsers()

            const mappedUsers = rawUsers.map((user): User => ({
                id: user.id,
                name: `${user.lastName || ""} ${user.firstName || ""}`.trim() || user.username || "Không rõ",
                email: user.email,
                role: user.roles?.[0] || "USER",
                username: user.username,
            }))

            setUsers(mappedUsers)
        } catch (err: any) {
            setError(err.message || "Lỗi khi tải người dùng")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return {
        users,
        loading,
        error,
        refetch: fetchUsers,
        createStaff: userApi.createStaff, // 👈 Thêm dòng này để gọi từ component
    }
}
