import React from "react";
import {
  FiUser,
  FiLock,
  FiShoppingBag,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = React.memo(() => {
  const linkClass =
      "flex items-center gap-2 hover:text-blue-600 transition-colors";
  const activeClass = "text-blue-600 font-semibold";

  return (
      <aside className="w-64 bg-white p-4 border-r border-gray-200 text-sm space-y-6">
        {/* Tài khoản */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-black">Tài khoản của tôi</h2>
          <div className="space-y-2">
            <NavLink
                to="/account"
                className={({ isActive }) =>
                    `flex items-center gap-2 border p-2 rounded-lg shadow-sm ${isActive ? activeClass : "text-gray-700"}`
                }
            >
              <FiUser /> Hồ sơ
            </NavLink>
            <NavLink
                to="/change-password"
                className={({ isActive }) =>
                    `flex items-center gap-2 border p-2 rounded-lg shadow-sm ${isActive ? activeClass : "text-gray-700"}`
                }
            >
              <FiLock /> Đổi mật khẩu
            </NavLink>
          </div>
        </div>

        {/* Đơn hàng */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-black">Đơn hàng</h2>
          <div className="space-y-2">
            <NavLink
                to="/order-history"
                className={({ isActive }) =>
                    `flex items-center gap-2 border p-2 rounded-lg shadow-sm ${isActive ? activeClass : "text-gray-700"}`
                }
            >
              <FiShoppingBag /> Đơn mua
            </NavLink>
            <NavLink
                to="/my-orders-custom"
                className={({ isActive }) =>
                    `flex items-center gap-2 border p-2 rounded-lg shadow-sm ${isActive ? activeClass : "text-gray-700"}`
                }
            >
              <FiShoppingBag /> Đơn hàng thiết kế
            </NavLink>
          </div>
        </div>
      </aside>
  );
});

export default Sidebar;
