import React, { useState } from 'react';

interface Address {
    name: string;
    phone: string;
    city: string;
    district: string;
    ward: string;
    specificAddress: string;
    addressType: string;
}

interface AddressModalProps {
    onClose: () => void;
    onSave: (newAddress: Address) => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [ward, setWard] = useState('');
    const [specificAddress, setSpecificAddress] = useState('');
    const [addressType, setAddressType] = useState('Nhà Riêng');

    const handleSave = () => {
        if (!name || !phone || !city || !district || !ward || !specificAddress) {
            alert('Vui lòng điền đầy đủ thông tin!');
            return;
        }

        const newAddress: Address = {
            name,
            phone,
            city,
            district,
            ward,
            specificAddress,
            addressType,
        };

        onSave(newAddress);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80%] overflow-y-auto shadow-lg"> {/* Tăng chiều rộng của modal */}
                <h2 className="text-lg font-bold mb-4">Địa chỉ mới</h2>
                {/* Họ và tên, Số điện thoại cùng 1 hàng */}
                <div className="grid grid-cols-2 gap-4 mb-3">
                    {/* Họ và tên */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Họ và tên</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>

                    {/* Số điện thoại */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>

                {/* Tỉnh/Thành phố, Quận/Huyện, Phường/Xã */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Tỉnh/Thành phố</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Quận/Huyện</label>
                        <input
                            type="text"
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Phường/Xã</label>
                        <input
                            type="text"
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mt-1"
                        />
                    </div>
                </div>

                {/* Địa chỉ cụ thể */}
                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700">Địa chỉ cụ thể</label>
                    <input
                        type="text"
                        value={specificAddress}
                        onChange={(e) => setSpecificAddress(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded mt-1"
                    />
                </div>

                {/* Loại địa chỉ */}
                <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-700">Loại địa chỉ</label>
                    <div className="flex gap-4">
                        <label>
                            <input
                                type="radio"
                                value="Nhà Riêng"
                                checked={addressType === 'Nhà Riêng'}
                                onChange={() => setAddressType('Nhà Riêng')}
                            />
                            Nhà Riêng
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Văn Phòng"
                                checked={addressType === 'Văn Phòng'}
                                onChange={() => setAddressType('Văn Phòng')}
                            />
                            Văn Phòng
                        </label>
                    </div>
                </div>

                {/* Thêm Vị trí */}
                <div className="mb-3">
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full">Thêm vị trí</button>
                </div>

                {/* Nút Trở lại và Hoàn thành */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={onClose}
                        className="text-gray-500 px-4 py-2 rounded hover:bg-gray-100"
                    >
                        Trở Lại
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Hoàn Thành
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddressModal;
