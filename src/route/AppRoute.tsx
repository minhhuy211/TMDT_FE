
// src/route/AppRoute.tsx

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import { Product } from "../pages/Products/Product";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";
import AddressPage from '@/account/AddressPage'; // hoặc đúng theo đường dẫn của bạn

import ProductDetail from "../pages/Products/Product-detail";  // Trang chi tiết sản phẩm
import CheckoutPage from '../pages/Products/CheckoutPage';
import PaymentSuccessPage from "../pages/Products/PaymentSuccessPage"; // Import success page
import { Register } from "../pages/Register/Register";
import Dashboard from "@/components/admin/Dashboard";
import PageAdmin from "@/pages/admin/PageAdmin";
import {ForgotPassword} from "@/pages/ForgetPassword/ForgotPassword.tsx";
import AccountManagement from '@/account/ProfilePage.tsx';
import ChangePassword from '@/account/ChangePassword';
import UserCart from '@/account/user-cart.tsx';

const route = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { path: "/address", element: <AddressPage /> },

      {path: "/forgot-password", element: <ForgotPassword/>},
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <Register /> },
      { path: "/product", element: <Product /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/account", element: <AccountManagement /> },
      { path: "/change-password", element: <ChangePassword /> },
      { path: "/user-cart", element: <UserCart /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/successPayment", element: <PaymentSuccessPage /> }, // Route for payment success

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
