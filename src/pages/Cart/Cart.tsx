import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number; // chuyển về kiểu number cho dễ tính toán
  quantity: number;
}

export const Cart = () => {
  // Giả sử đây là giỏ hàng mẫu (sẽ thay bằng context hoặc redux sau)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Móc treo 3D",
      image: "/imgs/BST171-400x400.png",
      price: 50000,
      quantity: 2,
    },
    // Thêm sản phẩm mẫu nếu muốn
  ]);

  // Tính tổng tiền
  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  // Xoá 1 sản phẩm
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Xoá toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([]);
  };

  return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-indigo-700">Giỏ hàng của bạn</h1>

        {cartItems.length === 0 ? (
            <p className="text-gray-500">Giỏ hàng đang trống.</p>
        ) : (
            <>
              <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div>
                          <h2 className="text-lg font-semibold">{item.name}</h2>
                          <p className="text-gray-600">Giá: {item.price.toLocaleString()}đ</p>
                          <p className="text-gray-600">Số lượng: {item.quantity}</p>
                          <p className="text-gray-800 font-semibold">
                            Thành tiền: {(item.price * item.quantity).toLocaleString()}đ
                          </p>
                        </div>
                      </div>
                      <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Xoá khỏi giỏ hàng"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                ))}
              </div>

              <div className="mt-6 text-right">
                <h3 className="text-xl font-bold text-indigo-800">Tổng cộng: {getTotal().toLocaleString()}đ</h3>
                <div className="flex justify-end gap-4 mt-4">
                  <button
                      onClick={clearCart}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Xoá tất cả
                  </button>
                  <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={() => alert("Chuyển sang trang thanh toán")}
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default Cart;
