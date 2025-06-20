import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import  cartReducer  from "./cartSlice";
import  userReducer  from "./userSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    userState: userReducer,
  },
});

// Định nghĩa RootState để sử dụng trong toàn bộ ứng dụng
export type RootState = ReturnType<typeof store.getState>;

export default store;