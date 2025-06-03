import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialEmail = location.state?.email || "";

    const [email] = useState(initialEmail); // không cần setEmail
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerify = async () => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/api/auth/verify", {
                email,
                verificationCode: code,
            });
            setMessage("✅ Xác thực thành công! Đang chuyển hướng...");
            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error: any) {
            setMessage(error.response?.data || "❌ Xác thực thất bại.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:8080/api/auth/resend?email=${email}`);
            setMessage("✅ Mã xác thực đã được gửi lại.");
        } catch {
            setMessage("❌ Gửi lại mã thất bại.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 font-serif">
                    Xác thực tài khoản
                </h2>

                <div className="space-y-4">
                    <Input
                        type="email"
                        value={email}
                        readOnly
                        className="bg-gray-100 text-gray-700 cursor-not-allowed"
                    />
                    <Input
                        placeholder="Nhập mã xác thực"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                </div>

                <Button
                    className="w-full bg-black text-white mt-4 hover:bg-gray-800"
                    onClick={handleVerify}
                    disabled={loading}
                >
                    {loading ? "Đang xác thực..." : "Xác thực"}
                </Button>

                <Button
                    className="w-full bg-gray-200 text-gray-800 mt-2 hover:bg-gray-300"
                    onClick={handleResend}
                    disabled={loading}
                >
                    Gửi lại mã
                </Button>

                {message && (
                    <p className="text-center mt-4 text-sm font-medium text-gray-700">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};
