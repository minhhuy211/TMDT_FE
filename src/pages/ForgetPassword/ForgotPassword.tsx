import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaPrint } from "react-icons/fa";
import { Link } from "react-router-dom";

export const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <FaPrint className="text-black text-xl" />
                        <h3 className="text-lg font-bold text-black font-mono">CustomPrint</h3>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 font-serif">Quên mật khẩu</h2>
                    <p className="text-sm text-gray-600 font-sans mt-1">
                        Nhập email hoặc tên đăng nhập để nhận hướng dẫn đặt lại mật khẩu
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <Input placeholder="Email hoặc tên đăng nhập" className="w-full text-black" />
                </div>

                {/* Gửi yêu cầu */}
                <Button className="w-full bg-black text-white mt-6 hover:bg-gray-800 font-semibold">
                    Gửi yêu cầu đặt lại mật khẩu
                </Button>

                {/* Link quay lại đăng nhập */}
                <div className="text-center text-sm mt-6">
                    <span className="text-gray-600">Đã nhớ mật khẩu?</span>{" "}
                    <Link to="/login" className="text-black hover:underline font-medium">
                        Quay lại đăng nhập
                    </Link>
                </div>
            </div>
        </div>
    );
};
