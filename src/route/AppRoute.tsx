import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import { Product } from "../pages/Products/Product";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";

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
      { path: "/Login", element: <Login /> },
    ],
  },
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
