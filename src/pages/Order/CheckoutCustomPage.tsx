import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import ConfirmationModal from "@/components/modal/ConfirmationModal";
import { addressApi, Address } from "@/services/addresses";
import userApi from "@/services/userApi";
import customApi from "@/services/customApi";
import { OrderCustomResponse } from "@/model/OrderCustom";
import type { UserResponse } from "@/model/User";
import { API_BASE_URL } from "@/services/api";

// Helper
const getDefaultExpectedDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().slice(0, 10);
};

const CheckoutCustomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery<OrderCustomResponse>({
    queryKey: ["orderCustomDetail", id],
    queryFn: () => customApi.getOrderCustomById(id!),
    enabled: !!id,
  });

  const [profile, setProfile] = useState<UserResponse | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState(
    getDefaultExpectedDeliveryDate()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    userApi.getMyInfo().then((user) => {
      setProfile(user);
      setName(
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username || ""
      );
      setPhone(user.phoneNumber || "");
    });
    addressApi.getAddresses().then((addrs) => {
      setAddresses(addrs);
      if (addrs.length > 0) setSelectedAddressId(addrs[0].id);
    });
  }, []);

  const payMutation = useMutation({
    mutationFn: (id: string) => customApi.payOrderCustom(id),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !paymentMethod || !selectedAddressId) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    try {
      if (!id) return;
      await payMutation.mutateAsync(id); // gọi API thanh toán
      setIsModalOpen(false);
      navigate("/successPayment");
    } catch (err: any) {
      alert("Thanh toán thất bại: " + (err.message || "Vui lòng thử lại"));
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => setIsModalOpen(false);

  if (isLoading)
    return (
      <div className="text-center py-10">Đang tải thông tin đơn hàng...</div>
    );
  if (isError || !data)
    return (
      <div className="text-center text-red-500 py-10">
        Không thể tải đơn hàng!
      </div>
    );

  return (
    <div className="w-full max-w-2xl mx-auto px-6 py-10 mt-10 mb-20 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
        Thông tin thanh toán
      </h1>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Sản phẩm trong đơn hàng</h3>
        {data.quantity === 0 ? (
          <div className="text-red-500">Không có sản phẩm nào.</div>
        ) : (
          <div className="divide-y border rounded-lg mb-2">
            <div className="flex items-center gap-4 py-3 px-2">
              <img
                src={`${API_BASE_URL}${data.designFileUrls[0]}`}
                alt={data.description}
                className="w-12 h-12 rounded object-cover border"
              />
              <div className="flex-1">
                <div className="font-medium">{data.description}</div>
                <div className="text-xs text-gray-500">SL: {data.quantity}</div>
              </div>
              <div className="font-semibold text-right">
                {data.quotedPrice}đ
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center font-bold mt-4">
          <span>Tổng cộng:</span>
          <span className="text-xl text-emerald-600">{data.quotedPrice}đ</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Họ và tên:</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="address-select">Địa chỉ giao hàng:</Label>
          <Select
            value={selectedAddressId}
            onValueChange={setSelectedAddressId}
          >
            <SelectTrigger id="address-select">
              <SelectValue placeholder="Chọn địa chỉ giao hàng" />
            </SelectTrigger>
            <SelectContent>
              {addresses.map((addr) => (
                <SelectItem key={addr.id} value={addr.id}>
                  {addr.street}
                  {addr.city ? `, ${addr.city}` : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {addresses.length === 0 && (
            <div className="text-red-500 mt-1 text-sm">
              Bạn chưa có địa chỉ nào.
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại:</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="expectedDeliveryDate">Ngày giao dự kiến:</Label>
          <Input
            id="expectedDeliveryDate"
            type="date"
            value={expectedDeliveryDate}
            onChange={(e) => setExpectedDeliveryDate(e.target.value)}
            min={getDefaultExpectedDeliveryDate()}
            required
          />
        </div>

        <div>
          <Label htmlFor="payment-method">Phương thức thanh toán:</Label>
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger id="payment-method">
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
            <div className="mt-4 p-4 border rounded bg-gray-50 text-center">
              <p className="mb-2 font-medium">Quét mã QR để thanh toán:</p>
              <img
                src="/placeholder.svg"
                alt="QR Code"
                className="mx-auto w-48 h-48 object-contain border p-2 bg-white rounded"
              />
              <p className="text-sm text-gray-600 mt-2">
                Vui lòng dùng MoMo, VNPay hoặc app ngân hàng để quét mã.
              </p>
            </div>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-black text-white py-2.5 text-base hover:bg-gray-800"
          disabled={addresses.length === 0}
        >
          Thanh toán
        </Button>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        details={{ name, phone, paymentMethod, address: addresses.find(addr => addr.id === selectedAddressId)?.street || "" }}
      />
    </div>
  );
};

export default CheckoutCustomPage;
