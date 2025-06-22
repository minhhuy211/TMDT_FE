
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { Contact } from "../pages/Contact/Contact";
import MasterLayout from "../layout/MasterLayout/MasterLayout";
import ProductPage from "../pages/Products/Product";
import { Cart } from "../pages/Cart/Cart";
import { Login } from "../pages/Login/Login";
import OrderHistory from "@/account/OrderHistory.tsx"
import ProductDetail from "../pages/Products/Product-detail";
import CheckoutPage from '../pages/Products/CheckoutPage';
import PaymentSuccessPage from "../pages/Products/PaymentSuccessPage"; // Import success page
// import NotificationsPage from "../account/NotificationsPage";

import Dashboard from "../components/admin/Dashboard.tsx";
import PageAdmin from "@/components/admin/SideBarData";
import {ForgotPassword} from "@/pages/ForgetPassword/ForgotPassword.tsx";
import AccountManagement from '@/account/ProfilePage.tsx';
import ChangePassword from '@/account/ChangePassword';
import UserCart from '@/account/user-cart.tsx';

import OAuth2RedirectHandler from "@/pages/Login/OAuth2RedirectHandler";
import ProfilePage from "@/account/ProfilePage.tsx";


import UploadDesignsPage from "@/pages/Products/UploadDesignsPage.tsx";

// giả sử file ở: src/pages/admin/CustomerPage.tsx
import CustomerPage from "../components/admin-data/CustomerPage";
import OrderPage from "@/components/admin-data/OrderPage";
import CategoryPage from "@/components/admin-data/CategoryPage";
import User from "@/components/admin-data/UserPage";
import VerifyPage from "@/pages/Register/Verify.tsx";
import Register from "@/pages/Register/Register.tsx";
import { Service } from "@/pages/Service/Service.tsx";



const route = createBrowserRouter([
  {
    path: "/",
    element: <MasterLayout />,
    children: [
      { path: "/verify", element: <VerifyPage /> },

      // {path :"/notifications", element: <NotificationsPage />},
      { path : "/order-history", element: <OrderHistory />},
      {path: "/forgot-password", element: <ForgotPassword/>},
      { path: "/", element: <HomePage /> },


      { path: "/product", element: <ProductPage /> },
      { path: "/productCustom", element: <UploadDesignsPage /> },
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
      { path: "/profile", element: <ProfilePage /> },


    ],
  },
  {
    path: "/admin",
    element: <PageAdmin />,
    children: [
      {path: "/admin", element: <Dashboard />},
      { path: "/admin/customer", element: <CustomerPage /> }, // 👈 đã thêm route customer
      { path: "/admin/order", element: <OrderPage /> }, // 👈 THÊM DÒNG NÀY
      {  path: "/admin/category", element: <CategoryPage />},
      {path: "/admin/user",element: <User/>}
    ],
  }
]);

const AppRoute = () => <RouterProvider router={route} />;

export default AppRoute;
