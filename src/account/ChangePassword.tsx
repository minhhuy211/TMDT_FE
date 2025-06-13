import React, { useState } from 'react';
import Sidebar from './sidebar';

const ChangePassword: React.FC = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Mật khẩu mới không khớp!');
            return;
        }
        alert('Mật khẩu đã được đổi thành công!');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar bên trái */}
            <Sidebar />

            {/* Form đổi mật khẩu */}
            <main className="flex-1 bg-white p-6 rounded shadow max-w-md mx-auto">
                <h1 className="text-xl font-bold text-black mb-4">Đổi Mật Khẩu</h1>
                <p className="text-sm text-gray-600 mb-6">
                    Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                </p>

                <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                        <label className="block font-semibold text-black mb-1">Mật khẩu mới</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-black mb-1">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 text-sm"
                    >
                        Đổi mật khẩu
                    </button>
                </form>
            </main>
        </div>
    );
};

export default ChangePassword;
