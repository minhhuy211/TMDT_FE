import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { About } from "../pages/About/About";
import { Contact } from "../pages/Contact/Contact";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import { Product } from "../pages/Products/Product";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import Dashboard from "@/components/admin/Dashboard";
import PageAdmin from "@/pages/admin/PageAdmin";

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
