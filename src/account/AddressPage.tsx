import React, { useState } from 'react';
import AddressModal from './AddressModal'; // Đảm bảo đường dẫn đúng
import Sidebar from './sidebar'; // Gọi Sidebar trong trang này

interface Address {
    name: string;
    phone: string;
    address: string;
}

const AddressPage: React.FC = () => {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addAddress = (newAddress: Address) => {
        setAddresses([...addresses, newAddress]);
        closeModal();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Gọi Sidebar */}
            <Sidebar />

            {/* Nội dung chính */}
            <div className="flex-1 p-6">
                <h1 className="text-xl font-bold text-black mb-6">Địa chỉ của tôi</h1>
                <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    + Thêm địa chỉ
                </button>

                <div className="space-y-4 mt-4">
                    {addresses.length === 0 ? (
                        <p className="text-gray-500">Bạn chưa có địa chỉ nào.</p>
                    ) : (
                        addresses.map((addr, index) => (
                            <div key={index} className="p-4 border rounded shadow-sm">
                                <p className="font-semibold">{addr.name}</p>
                                <p>{addr.phone}</p>
                                <p>{addr.address}</p>
                            </div>
                        ))
                    )}
                </div>

                {isModalOpen && <AddressModal onClose={closeModal} onSave={addAddress} />}
            </div>
        </div>
    );
};

export default AddressPage;
