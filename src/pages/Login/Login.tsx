import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { FaFacebook, FaGoogle, FaInstagram, FaPrint } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import authApi from "@/services/authApi";
import { loginSuccess } from "@/redux/authSlice";
import AuthenticationReuquest from "@/model/Authentication";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3000);
  };

  const login = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      // console.log("Đăng nhập thành công", data);
      showToast("success", "Đăng nhập thành công!");

      dispatch(
        loginSuccess({ token: data.token, userResponse: data.userResponse })
      );
      localStorage.setItem("token", data.token);

      const roles = data.userResponse.roles;
      if (roles.includes("ADMIN")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    },
    onError: (error: any) => {
      console.error("Lỗi đăng nhập:", error);
      setError(error.response?.data?.message || "Đăng nhập không thành công");
      showToast(
        "error",
        error.response?.data?.message || "Đăng nhập không thành công"
      );
    },
  });

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Đăng nhập với", { email, password });
    event.preventDefault(); // Ngăn reload trang
    const authRequest: AuthenticationReuquest = { email, password };
    login.mutate(authRequest);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4 relative">
      {toast && (
        <div
          className={`fixed top-5 right-5 px-6 py-3 rounded shadow-lg text-white font-semibold
            ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
            animate-slideBounce
          `}
          style={{ zIndex: 1000 }}
        >
          {toast.message}
        </div>
      )}

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaPrint className="text-black text-xl" />
            <h3 className="text-lg font-bold text-black font-mono">
              CustomPrint
            </h3>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 font-serif">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 font-sans mt-1">
            Đăng nhập để tiếp tục
          </p>
        </div>

        <div className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {/* /auth/forgot-password */}
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                  in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <Button
              variant="outline"
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => {
                window.location.href =
                  "http://localhost:8080//api/oauth2/authorization/google";
              }}
            >
              <img
                src="https://tse4.mm.bing.net/th?id=OIP.dto_UknSThfSRMLbtm2PGQHaHh&pid=Api&P=0&h=220"
                alt="Google Logo"
                className="w-5 h-5"
              />
              Continue with Google
            </Button>
          </form>
        </div>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-600">Chưa có tài khoản?</span>{" "}
          <Link
            to="/register"
            className="text-black hover:underline font-medium"
          >
            Đăng ký
          </Link>
        </div>

        <div className="flex justify-center mt-6 space-x-6 text-xl text-gray-800">
          <FaFacebook className="hover:scale-110 transition-transform cursor-pointer" />
          <FaGoogle className="hover:scale-110 transition-transform cursor-pointer" />
          <FaInstagram className="hover:scale-110 transition-transform cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
