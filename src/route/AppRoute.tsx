
// src/route/AppRoute.tsx

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { Service } from "@/pages/Service/Service.tsx";
import { Contact } from "../pages/Contact/Contact";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import { Product } from "../pages/Products/Product";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";
import AddressPage from '@/account/AddressPage'; // hoặc đúng theo đường dẫn của bạn
import OrderHistory from "@/account/OrderHistory.tsx"
import ProductDetail from "../pages/Products/Product-detail";  // Trang chi tiết sản phẩm
import CheckoutPage from '../pages/Products/CheckoutPage';
import PaymentSuccessPage from "../pages/Products/PaymentSuccessPage"; // Import success page
// import NotificationsPage from "../account/NotificationsPage";

import Dashboard from "@/components/admin/Dashboard";
import PageAdmin from "@/pages/admin/PageAdmin";
import {ForgotPassword} from "@/pages/ForgetPassword/ForgotPassword.tsx";
import AccountManagement from '@/account/ProfilePage.tsx';
import ChangePassword from '@/account/ChangePassword';
import UserCart from '@/account/user-cart.tsx';
import Register from "@/pages/register/Register";
import VerifyPage from "@/pages/register/Verify";
import OAuth2RedirectHandler from "@/pages/Login/OAuth2RedirectHandler";


const route = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { path: "/verify", element: <VerifyPage /> },

      { path: "/address", element: <AddressPage /> },
      // {path :"/notifications", element: <NotificationsPage />},
      { path : "/order-history", element: <OrderHistory />},
      {path: "/forgot-password", element: <ForgotPassword/>},
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <Register /> },
      { path: "/product", element: <Product /> },
      { path: "/about", element: <Service /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/account", element: <AccountManagement /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/user-cart", element: <UserCart /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/successPayment", element: <PaymentSuccessPage /> }, // Route for payment success
      { path: "/oauth2-redirect", element: <OAuth2RedirectHandler /> },

      // Thêm route cho trang chi tiết sản phẩm
      { path: "/product-detail/:productId", element: <ProductDetail /> },

      { path: "/register", element: <Register /> },


    ],
  },
  {
    path: "/admin",
    element: <PageAdmin />,
    children: [
      {path: "/admin", element: <Dashboard />},
      {path: "/admin/customer", element: <Product />},
    ],
  }
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
