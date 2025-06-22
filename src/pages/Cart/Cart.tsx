import { useEffect, useState } from "react";
import { getCartLocal, removeFromCartLocal, CartItemLocal, setCartLocal } from "@/utils/localCart";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Cart = () => {
  const [cart, setCart] = useState<CartItemLocal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCart(getCartLocal());
  }, []);

  const updateQty = (productId: string, delta: number) => {
    const newCart = cart.map(item =>
        item.productId === productId
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
    );
    setCartLocal(newCart);
    setCart(newCart);
  };

  const handleRemove = (productId: string) => {
    removeFromCartLocal(productId);
    setCart(getCartLocal());
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
      <div className="container mx-auto py-8 px-2 min-h-[70vh]">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <span role="img" aria-label="cart">🛒</span> Giỏ Hàng
        </h2>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cart Table */}
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-6">
            <table className="w-full">
              <thead>
              <tr className="border-b">
                <th className="py-3 text-left text-gray-700 font-semibold">Sản phẩm</th>
                <th className="py-3 text-center text-gray-700 font-semibold">Giá</th>
                <th className="py-3 text-center text-gray-700 font-semibold">Số lượng</th>
                <th className="py-3 text-center text-gray-700 font-semibold">Tổng</th>
                <th className="py-3"></th>
              </tr>
              </thead>
              <tbody>
              {cart.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 py-8">Giỏ hàng trống</td>
                  </tr>
              ) : (
                  cart.map(item => (
                      <tr key={item.productId} className="border-b hover:bg-gray-50 transition group">
                        <td className="py-3 flex items-center gap-3 min-w-[220px]">
                          <img src={item.img || "/placeholder.svg"} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                          <span className="font-medium">{item.productName}</span>
                        </td>
                        <td className="py-3 text-center text-primary font-semibold">{item.price.toLocaleString()} ₫</td>
                        <td className="py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="w-8 h-8 rounded border bg-gray-100 text-xl font-bold hover:bg-gray-200"
                                    onClick={() => updateQty(item.productId, -1)}>-</button>
                            <span className="px-3">{item.quantity}</span>
                            <button className="w-8 h-8 rounded border bg-gray-100 text-xl font-bold hover:bg-gray-200"
                                    onClick={() => updateQty(item.productId, 1)}>+</button>
                          </div>
                        </td>
                        <td className="py-3 text-center text-primary font-bold">{(item.price * item.quantity).toLocaleString()} ₫</td>
                        <td className="py-3 text-center">
                          <button className="p-2 text-red-500 hover:bg-red-50 rounded transition"
                                  onClick={() => handleRemove(item.productId)}
                                  title="Xóa sản phẩm khỏi giỏ">
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                  ))
              )}
              </tbody>
            </table>
            <div className="mt-8 flex justify-between items-center">
              <Button variant="outline" onClick={() => navigate("/product")}>
                Tiếp tục mua sắm
              </Button>
            </div>
          </div>
          {/* Cart Summary */}
          <div className="w-full md:w-96 bg-white rounded-2xl shadow-xl p-6 sticky top-8 self-start">
            <h3 className="text-xl font-semibold mb-6">Tóm tắt đơn hàng</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-base">
                <span>Tổng tiền hàng</span>
                <span className="font-semibold">{totalAmount.toLocaleString()} ₫</span>
              </div>

              <div className="flex justify-between text-lg border-t pt-4 font-bold">
                <span>Tổng cộng</span>
                <span className="text-green-700">{(totalAmount).toLocaleString()} ₫</span>
              </div>
            </div>
            {/*<div className="mb-6">*/}
            {/*  <label className="block mb-1 text-sm text-gray-600">Nhập mã giảm giá</label>*/}
            {/*  <div className="flex gap-2">*/}
            {/*    <input type="text" placeholder="Nhập mã giảm giá"*/}
            {/*           className="flex-1 px-3 py-2 rounded border focus:outline-none focus:ring"*/}
            {/*    />*/}
            {/*    <Button variant="secondary" className="font-semibold">Áp dụng</Button>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <Button
                className="w-full bg-primary text-white font-bold text-lg py-3 rounded-xl mb-3 shadow-md hover:bg-green-700 transition"
                onClick={() => navigate("/checkout")}
                disabled={cart.length === 0}
            >
              Thanh Toán
            </Button>
            <Button
                className="w-full bg-white border border-gray-300 text-gray-900 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
                variant="outline"
                onClick={() => navigate("/order-history")}
            >
              Xem Lịch Sử Đơn Hàng
            </Button>
          </div>
        </div>
      </div>
  );
};
