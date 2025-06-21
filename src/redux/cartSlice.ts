// src/store/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { CartItemLocal } from "@/model/Cart";
import { getCartLocal } from "@/utils/localCart";

interface CartState {
  items: CartItemLocal[];
}

const initialState: CartState = {
  items: getCartLocal(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItemLocal[]>) => {
      state.items = action.payload;
    },
    // Dùng thêm clearCart cho các tác vụ đặc biệt
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selector tổng quantity (dùng cho badge icon giỏ hàng...)
export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);

// Selector tổng tiền (nếu cần)
export const selectCartTotal = (state: { cart: CartState }) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
