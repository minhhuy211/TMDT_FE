import {jwtDecode} from "jwt-decode";

type JwtPayload = {
    role?: string | string[];
    roles?: string[];
    scope?: string; // Thêm scope
    // các trường khác nếu cần
};

export function getUserRoleFromToken(): string | null {
    try {
        const token = localStorage.getItem("token");
        if (!token) return null;

        const decoded = jwtDecode<JwtPayload>(token);
        console.log("Dữ liệu giải mã từ token:", decoded);

        if (decoded.scope) {
            return decoded.scope;
        }

        if (decoded.role) {
            if (typeof decoded.role === "string") return decoded.role;
            if (Array.isArray(decoded.role) && decoded.role.length > 0) return decoded.role[0];
        }

        if (decoded.roles && decoded.roles.length > 0) {
            return decoded.roles[0];
        }

        return null;
    } catch (e) {
        console.error("Không thể decode token", e);
        return null;
    }
}
