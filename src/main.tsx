// main.tsx hoặc App.tsx
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { StrictMode } from "react";
import { Provider } from 'react-redux';
import store from "./redux/store";
import { loginSuccess } from "./redux/authSlice";


const token = localStorage.getItem("token");
if (token) {
  store.dispatch(loginSuccess({ token })); // khôi phục token
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Provider store={store}>

      <App />
    </Provider>
    </StrictMode>
  );
}
