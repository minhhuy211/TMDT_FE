// src/components/ConfirmationModal.tsx

import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    details: {
        name: string;
        address: string;
        phone: string;
        paymentMethod: string;
    };
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, details }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold text-black mb-4">Xác nhận thông tin thanh toán</h2>
    <p><strong>Họ và tên:</strong> {details.name}</p>
    <p><strong>Địa chỉ giao hàng:</strong> {details.address}</p>
    <p><strong>Số điện thoại:</strong> {details.phone}</p>
    <p><strong>Phương thức thanh toán:</strong> {details.paymentMethod}</p>

    <div className="mt-4 flex justify-between">
    <button
        onClick={onCancel}
    className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
        >
        Hủy
        </button>
        <button
    onClick={onConfirm}
    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
        >
        Xác nhận
    </button>
    </div>
    </div>
    </div>
);
};

export default ConfirmationModal;
