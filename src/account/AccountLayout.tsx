// AccountLayout.tsx
import React from 'react';
import Sidebar from './sidebar';
import { Outlet } from 'react-router-dom';

const AccountLayout: React.FC = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <div className="w-64">
                <Sidebar />
            </div>
            <main className="flex-1 p-6">
                <Outlet />
            </main>
        </div>
    );
};

export default AccountLayout;
