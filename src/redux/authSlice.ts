import { createSlice } from '@reduxjs/toolkit';


const authToken = localStorage.getItem('authToken');
const initialState = {
  authenticated: false,
  token: '',
  user: null,
  isAuthenticated: !!authToken,
};



const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    loginSuccess: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.userResponse;
    },
    logout: (state) => {
      state.authenticated = false;
      state.token = '';
      localStorage.removeItem("token");
    },

  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
