import React from 'react';
import {
    FiUser, FiCreditCard, FiLock,
    FiBell, FiSettings, FiInbox, FiShoppingBag,
    FiTag
} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = React.memo(() => {
    const linkClass =
        'flex items-center gap-2 hover:underline cursor-pointer transition-colors';
    const activeClass =
        'text-blue-600 font-semibold'; // Hoặc màu bạn muốn

    return (
        <aside className="w-64 bg-white p-4 border-r border-gray-300 text-sm space-y-6">
            {/* Phần Tài khoản của tôi */}
            <div className="space-y-4">
                <h2 className="text-base font-semibold mb-2 text-black">Tài khoản của tôi</h2>
                <div className="space-y-2">
                    <div className="border p-2 rounded-lg shadow-sm">
                        <NavLink to="/account" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                            <FiUser /> Hồ sơ
                        </NavLink>
                    </div>
                    {/*<div className="border p-2 rounded-lg shadow-sm">*/}
                    {/*    <div className={linkClass}>*/}
                    {/*        <FiCreditCard /> Ngân hàng*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="border p-2 rounded-lg shadow-sm">
                        <NavLink to="/change-password" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                            <FiLock /> Đổi mật khẩu
                        </NavLink>
                    </div>
                    <div className="border p-2 rounded-lg shadow-sm">
                        <div className={linkClass}>
                            <FiBell /> Cài đặt thông báo
                        </div>
                    </div>
                    <div className="border p-2 rounded-lg shadow-sm">
                        <div className={linkClass}>
                            <FiSettings /> Những thiết lập riêng tư
                        </div>
                    </div>
                </div>
            </div>

            {/* Phần khác (Thông báo, Đơn mua, Kho voucher, Shopee Xu) */}
            <div className="space-y-4">
                <div className="space-y-2">
                    <div className="border p-4 rounded-lg shadow-sm">
                        <NavLink to="/notifications" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>
                            <FiInbox /> Thông báo
                        </NavLink>
                    </div>
                    <div className="border p-4 rounded-lg shadow-sm">
                        <NavLink to="/order-history" className={({ isActive }) => `${linkClass} ${isActive ? activeClass : ''}`}>

                        <div className={linkClass}>
                            <FiShoppingBag /> Đơn Mua
                        </div>
                        </NavLink>
                    </div>
                    <div className="border p-4 rounded-lg shadow-sm">
                        <div className={linkClass}>
                            <FiTag /> Kho Voucher
                        </div>
                    </div>

                </div>
            </div>
        </aside>
    );
});

export default Sidebar;
