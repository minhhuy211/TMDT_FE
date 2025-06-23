"use client"

import {useState, useMemo, useEffect} from "react"
import { User, Users, Filter, RefreshCw, Search, X, AlertCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useUsers, type User as UserType } from "@/components/admin-data/hooks/use-user"
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { getUserRoleFromToken } from "@/decode/getUserRoleFromToken";

// Helper functions
const getRoleColor = (role: string) => {
    switch (role.toUpperCase()) {
        case "ADMIN":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
        case "MODERATOR":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
        case "USER":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
        default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
}

const getRoleLabel = (role: string) => {
    switch (role.toUpperCase()) {
        case "ADMIN":
            return "Quản trị viên"
        case "MODERATOR":
            return "Điều hành viên"
        case "USER":
            return "Người dùng"
        default:
            return role
    }
}

// Loading Skeleton Component
function LoadingSkeleton() {
    return (
        <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                    <div className="flex-1 space-y-2">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                    </div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
                </div>
            ))}
        </div>
    )
}

// Search Input Component
function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
    return (
        <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                placeholder="Tìm kiếm theo tên, email, vai trò..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-10"
            />
            {value && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => onChange("")}
                >
                    <X className="h-3 w-3" />
                </Button>
            )}
        </div>
    )
}

// Error Message Component
function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
    return (
        <Alert variant="destructive" className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
                <span>{message}</span>
                {onRetry && (
                    <Button variant="outline" size="sm" onClick={onRetry} className="ml-2 h-6">
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Thử lại
                    </Button>
                )}
            </AlertDescription>
        </Alert>
    )
}

// User Table Component
function UserTable({ users, loading }: { users: UserType[]; loading: boolean }) {
    if (loading) {
        return <LoadingSkeleton />
    }

    if (users.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>Không tìm thấy người dùng nào</p>
            </div>
        )
    }

    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">ID</TableHead>
                        <TableHead>Người dùng</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Vai trò</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        <AvatarFallback className="text-xs">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium">{user.name}</div>
                                        {user.username && <div className="text-sm text-gray-500">@{user.username}</div>}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="text-sm">{user.email}</div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="secondary" className={getRoleColor(user.role)}>
                                    {getRoleLabel(user.role)}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

// Stats Cards Component
function StatsCards({ users }: { users: UserType[] }) {
    const stats = useMemo(() => {
        const total = users.length
        const admins = users.filter((u) => u.role.toUpperCase() === "ADMIN").length
        const moderators = users.filter((u) => u.role.toUpperCase() === "MODERATOR").length
        const regularUsers = users.filter((u) => u.role.toUpperCase() === "USER").length
        return { total, admins, moderators, regularUsers }
    }, [users])

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Tổng người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        <span className="text-2xl font-bold">{stats.total}</span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Quản trị viên</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                            {stats.admins}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Điều hành viên</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge
                            variant="secondary"
                            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        >
                            {stats.moderators}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Người dùng</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {stats.regularUsers}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default function UserPage() {
    const [search, setSearch] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newStaff, setNewStaff] = useState({ username: "", email: "", password: "" });
    const [creating, setCreating] = useState(false);
    const { users, loading, error, refetch, createStaff } = useUsers();

    const currentUserRole = getUserRoleFromToken()?.toUpperCase() || "USER";

    useEffect(() => {
        console.log("Users hiện tại với role:", users.map(u => ({ username: u.username, role: u.role })));
        console.log("Role user hiện tại:", currentUserRole);
    }, [users, currentUserRole]);

    const filteredUsers = useMemo(() => {
        let filteredList = users;

        if (currentUserRole === "STAFF") {
            filteredList = users.filter(u => u.role.toUpperCase() === "USER");
        }

        if (!search.trim()) return filteredList;

        const searchText = search.toLowerCase().trim();

        return filteredList.filter(user => {
            const name = user.name?.toLowerCase() || "";
            const email = user.email?.toLowerCase() || "";
            const role = user.role?.toLowerCase() || "";
            const username = user.username?.toLowerCase() || "";

            return (
                name.includes(searchText) ||
                email.includes(searchText) ||
                role.includes(searchText) ||
                username.includes(searchText)
            );
        });
    }, [users, search, currentUserRole]);

    const handleCreateStaff = async () => {
        if (currentUserRole === "STAFF") {
            alert("Bạn không có quyền tạo nhân viên mới.");
            return;
        }
        setCreating(true);
        try {
            console.log("Dữ liệu gửi đi:", { ...newStaff, roles: ["STAFF"] });

            await createStaff({
                ...newStaff,
                roles: ["STAFF"],
            });

            await refetch();
            setIsDialogOpen(false);
            setNewStaff({ username: "", email: "", password: "" });
        } catch (err: any) {
            if (err.response && err.response.data) {
                console.error("Lỗi tạo nhân viên:", err.response.data);
                alert("Lỗi tạo nhân viên: " + JSON.stringify(err.response.data));
            } else if (err.message) {
                console.error("Lỗi tạo nhân viên:", err.message);
                alert("Lỗi tạo nhân viên: " + err.message);
            } else {
                console.error("Lỗi tạo nhân viên:", err);
                alert("Lỗi tạo nhân viên: Không xác định");
            }
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <User className="h-6 w-6" />
                        Quản lý người dùng
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        Quản lý và theo dõi thông tin người dùng trong hệ thống
                    </p>
                </div>

                <Button onClick={refetch} disabled={loading}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
                    Làm mới
                </Button>

                {/* Chỉ hiển thị form tạo nhân viên nếu không phải STAFF */}
                {currentUserRole !== "STAFF" && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="secondary">+ Thêm nhân viên</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Thêm nhân viên mới</DialogTitle>
                                <DialogDescription>
                                    Nhập thông tin để tạo một nhân viên với vai trò STAFF
                                </DialogDescription>
                            </DialogHeader>

                            <div className="space-y-4 py-2">
                                <Input
                                    placeholder="Tên người dùng"
                                    value={newStaff.username}
                                    onChange={(e) => setNewStaff(prev => ({ ...prev, username: e.target.value }))}
                                />
                                <Input
                                    placeholder="Email"
                                    type="email"
                                    value={newStaff.email}
                                    onChange={(e) => setNewStaff(prev => ({ ...prev, email: e.target.value }))}
                                />
                                <Input
                                    placeholder="Mật khẩu"
                                    type="password"
                                    value={newStaff.password}
                                    onChange={(e) => setNewStaff(prev => ({ ...prev, password: e.target.value }))}
                                />
                            </div>

                            <DialogFooter>
                                <Button onClick={handleCreateStaff} disabled={creating}>
                                    {creating ? "Đang tạo..." : "Tạo nhân viên"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            {/* Stats Cards */}
            {!loading && !error && <StatsCards users={users} />}

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <SearchInput value={search} onChange={setSearch} />
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Filter className="h-4 w-4" />
                    <span>
            Hiển thị {filteredUsers.length} / {users.length} người dùng
          </span>
                </div>
            </div>

            {/* Error State */}
            {error && <ErrorMessage message={error} onRetry={refetch} />}

            {/* User Table */}
            {!error && (
                <Card>
                    <CardHeader>
                        <CardTitle>Danh sách người dùng</CardTitle>
                        <CardDescription>
                            Thông tin chi tiết về tất cả người dùng trong hệ thống
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <UserTable users={filteredUsers} loading={loading} />
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
