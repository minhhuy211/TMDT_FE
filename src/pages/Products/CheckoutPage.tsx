import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../../components/modal/ConfirmationModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCartLocal, CartItemLocal } from "@/utils/localCart";
import userApi from "@/services/userApi";
import type { UserResponse } from "@/model/User";
import type { OrderRequest } from "@/model/Cart";
import { placeOrder } from "@/services/orderApi";
import { addressApi, Address } from "@/services/addresses";

// Helper: Tính ngày giao dự kiến (+3 ngày)
const getDefaultExpectedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date.toISOString().substring(0, 10); // yyyy-mm-dd
};

const CheckoutPage = () => {
    const [cart, setCart] = useState<CartItemLocal[]>([]);
    const [profile, setProfile] = useState<UserResponse | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string>("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Credit Card");
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(getDefaultExpectedDeliveryDate());
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCartLocal());
    }, []);

    useEffect(() => {
        userApi.getMyInfo().then((user: UserResponse) => {
            setProfile(user);
            setName(
                user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username || ""
            );
            setPhone(user.phoneNumber || "");

        });
        addressApi.getAddresses().then(addrs => {
            setAddresses(addrs);
            if (addrs.length > 0) setSelectedAddressId(addrs[0].id);
        });
    }, []);

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !phone || !paymentMethod) {
            alert("Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (!selectedAddressId) {
            alert("Vui lòng chọn địa chỉ giao hàng.");
            return;
        }
        if (cart.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }
        setIsModalOpen(true);
    };

    // Gửi đơn hàng lên backend
    const handleConfirm = async () => {
        if (!cart || cart.length === 0) {
            alert("Giỏ hàng trống!");
            return;
        }
        if (!selectedAddressId) {
            alert("Vui lòng chọn địa chỉ giao hàng.");
            return;
        }
        const orderItemRequests = cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity
            // Không gửi discount
        }));
        if (!profile || !profile.id) {
            alert("Không xác định được user. Vui lòng đăng nhập lại.");
            return;
        }

        // expectedDeliveryDate luôn là ISO string, không null
        const expectedDate = expectedDeliveryDate
            ? new Date(expectedDeliveryDate).toISOString()
            : getDefaultExpectedDeliveryDate() + "T00:00:00.000Z";

        const orderRequest: OrderRequest = {
            userId: profile?.id || "",
            orderDate: new Date().toISOString(),
            orderItemRequests,
            totalAmount,
            paymentMethod,
            expectedDeliveryDate: expectedDate,
            addressId: selectedAddressId,
        };
        try {
            await placeOrder(orderRequest);
            localStorage.removeItem("cart_items");
            setIsModalOpen(false);
            navigate("/successPayment");

        } catch (err: any) {
            alert("Đặt hàng thất bại! " + (err?.message || "Vui lòng thử lại."));
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => setIsModalOpen(false);

    return (
        <div className="w-full max-w-2xl mx-auto px-6 py-10 mt-10 mb-20 bg-white rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Thông tin thanh toán</h1>
            {/* Danh sách sản phẩm */}
            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Sản phẩm trong giỏ hàng</h3>
                {cart.length === 0 ? (
                    <div className="text-red-500">Không có sản phẩm nào trong giỏ hàng.</div>
                ) : (
                    <div className="divide-y border rounded-lg mb-2">
                        {cart.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4 py-3 px-2">
                                <img src={item.img || "/placeholder.svg"} alt={item.productName} className="w-12 h-12 rounded object-cover border" />
                                <div className="flex-1">
                                    <div className="font-medium">{item.productName}</div>
                                    <div className="text-xs text-gray-500">SL: {item.quantity}</div>
                                </div>
                                <div className="font-semibold text-right">{(item.price * item.quantity).toLocaleString()}đ</div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="flex justify-between items-center font-bold mt-4">
                    <span>Tổng cộng:</span>
                    <span className="text-xl text-emerald-600">{totalAmount.toLocaleString()}đ</span>
                </div>
            </div>

            {/* FORM THANH TOÁN */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="name" className="block text-base font-medium text-gray-700 mb-1">
                        Họ và tên:
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Nhập họ tên"
                        className="w-full text-black"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="address-select" className="block text-base font-medium text-gray-700 mb-1">
                        Địa chỉ giao hàng:
                    </Label>
                    <Select value={selectedAddressId} onValueChange={setSelectedAddressId}>
                        <SelectTrigger id="address-select" className="w-full text-black">
                            <SelectValue placeholder="Chọn địa chỉ giao hàng" />
                        </SelectTrigger>
                        <SelectContent>
                            {addresses.length === 0 ? (
                                <div className="text-center text-red-500 px-4 py-2 text-sm">
                                    Bạn chưa có địa chỉ nào
                                </div>
                            ) : (
                                addresses.map(addr => (
                                    <SelectItem key={addr.id} value={addr.id}>
                                        {addr.street}{addr.city ? ", " + addr.city : ""}
                                    </SelectItem>
                                ))
                            )}
                        </SelectContent>
                    </Select>
                    {addresses.length === 0 && (
                        <div className="mt-2 text-red-500 text-sm">
                            Bạn chưa có địa chỉ nào. Vui lòng thêm địa chỉ trong hồ sơ cá nhân trước khi đặt hàng.
                        </div>
                    )}
                </div>

                <div>
                    <Label htmlFor="phone" className="block text-base font-medium text-gray-700 mb-1">
                        Số điện thoại:
                    </Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Nhập số điện thoại của bạn"
                        className="w-full text-black"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="expectedDeliveryDate" className="block text-base font-medium text-gray-700 mb-1">
                        Ngày giao dự kiến:
                    </Label>
                    <Input
                        id="expectedDeliveryDate"
                        type="date"
                        value={expectedDeliveryDate}
                        onChange={e => setExpectedDeliveryDate(e.target.value)}
                        min={getDefaultExpectedDeliveryDate()}
                        className="w-full text-black"
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="payment-method" className="block text-base font-medium text-gray-700 mb-1">
                        Phương thức thanh toán:
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                        <SelectTrigger id="payment-method" className="w-full text-black">
                            <SelectValue placeholder="Chọn phương thức thanh toán" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Credit Card">Thẻ tín dụng</SelectItem>
                            <SelectItem value="PayPal">PayPal</SelectItem>
                            <SelectItem value="COD">Thanh toán khi nhận hàng</SelectItem>
                            <SelectItem value="QRCode">Quét mã QR</SelectItem>
                        </SelectContent>
                    </Select>
                    {paymentMethod === "QRCode" && (
                        <div className="mt-4 text-center p-4 border border-gray-200 rounded-md bg-gray-50">
                            <p className="text-gray-800 font-medium mb-3">Quét mã QR để thanh toán:</p>
                            <img
                                src="/placeholder.svg?height=200&width=200"
                                alt="QR Code"
                                className="mx-auto w-48 h-48 object-contain border border-gray-300 p-2 bg-white rounded-md"
                            />
                            <p className="text-sm text-gray-600 mt-3">
                                Vui lòng quét mã bằng MoMo, VNPay hoặc ứng dụng ngân hàng của bạn.
                            </p>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Button
                        type="submit"
                        className="w-full bg-black text-white py-2.5 text-base hover:bg-gray-800"
                        disabled={addresses.length === 0}
                    >
                        Thanh toán
                    </Button>
                </div>
            </form>

            <ConfirmationModal
                isOpen={isModalOpen}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
                details={{ name, phone, paymentMethod, cart, expectedDeliveryDate }}
            />
        </div>
    );
};

export default CheckoutPage;
