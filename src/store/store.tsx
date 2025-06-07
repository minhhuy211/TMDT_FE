import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import authReducer from './features/authSlice';

// Kết hợp các reducer
const rootReducer = combineReducers({
    userState: userReducer,
    auth: authReducer,
});

// Tạo Redux store
export const store = configureStore({
    reducer: rootReducer,
});

// Tạo type cho RootState và AppDispatch (best practice)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
