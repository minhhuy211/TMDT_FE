import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import  {RootState} from "./store.tsx";

// User type khớp với JSON bạn đưa
interface UserInfo {
    id: string;
    username: string;
    password?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email: string;
    verificationCode?: string | null;
    verificationCodeExpireAt?: string | null;
    dob?: string | null;
    roles?: Role[] | null;
}

interface Role {
    id: string;
    roleCode: string;
    authority: string;
}

// State slice
interface UserState {
    userInfo: UserInfo | unknown;
}

const initialState: UserState = {
    userInfo: {},
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        loadUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
        logoutUser: (state) => {
            state.userInfo = {};
        },
    },
});

// Export action
export const { loadUserInfo, logoutUser } = userSlice.actions;

// Selector
export const selectUserInfo = (state: RootState) => state.userState.userInfo ?? {};

// Export reducer
export default userSlice.reducer;