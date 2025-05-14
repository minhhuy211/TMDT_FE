// src/pages/Products/PaymentSuccessPage.tsx

import React from 'react';

const PaymentSuccessPage = () => {
    return (
        <div className="w-full max-w-lg mx-auto px-8 py-12 bg-white">
            <h1 className="text-3xl font-bold text-center text-black mb-6">Thanh toán thành công!</h1>
            <p className="text-lg text-black text-center">
                Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi! Đơn hàng của bạn đã được xử lý thành công.
                Chúng tôi sẽ gửi thông tin giao hàng sớm nhất có thể.
            </p>
            <div className="mt-6 text-center">
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800"
                >
                    Quay về trang chủ
                </a>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
