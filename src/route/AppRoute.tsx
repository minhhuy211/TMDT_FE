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
import ProductDetail from "../pages/Products/Product-detail";  // Trang chi tiết sản phẩm
import CheckoutPage from '../pages/Products/CheckoutPage';
import PaymentSuccessPage from "../pages/Products/PaymentSuccessPage"; // Import success page

const route = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/product", element: <Product /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/cart", element: <Cart /> },
      { path: "/login", element: <Login /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "/homepage", element: <HomePage /> },
      { path: "/successPayment", element: <PaymentSuccessPage /> }, // Route for payment success

      // Thêm route cho trang chi tiết sản phẩm
      { path: "/product-detail/:productId", element: <ProductDetail /> },
    ],
  },
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
