import React, {useEffect, useState} from 'react';
import Sidebar from './sidebar';
import { useSelector } from "react-redux";
import {selectUserInfo} from "@/store/features/userSlice.tsx"; // Ensure the path is correct

const ProfilePage: React.FC = () => {
    const userInfo = useSelector(selectUserInfo);
    const [dob, setDob] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);


    useEffect(() => {
        if (userInfo?.dob) {
            setDob(userInfo.dob);
        }
    }, [userInfo]);
    const handleSave = () => {
        alert('Đã lưu thông tin!');
    };



    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    };
    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar bên trái */}
            <Sidebar />

            {/* Nội dung chính */}
            <main className="flex-1 bg-white p-6 rounded shadow">
                <h1 className="text-xl font-bold text-black mb-6">Hồ sơ của tôi</h1>
                <p className="text-sm text-gray-600 mb-4">
                    Quản lý thông tin hồ sơ để bảo mật tài khoản
                </p>

                <div className="space-y-4 max-w-xl">
                    <div>
                        <label className="block font-semibold text-black">Tên đăng nhập</label>
                        <input
                            type="text"
                            value={userInfo.username || ''}
                            disabled
                            className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
                        />
                    </div>

                    <div>
                        <label className="block font-semibold text-black">Email</label>
                        <div className="flex space-x-2">
                            <input
                                type="email"
                                value={userInfo.email || ""}
                                disabled
                                className="flex-1 p-2 border border-gray-400 rounded text-black"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-semibold text-black">Số điện thoại</label>
                        {userInfo.phoneNumber ? (
                            <input
                                type="text"
                                value={userInfo.phoneNumber}
                                disabled
                                className="w-full p-2 border border-gray-400 rounded text-black bg-gray-100"
                            />
                        ) : (
                            <button
                                className="p-2 border border-black rounded text-sm text-black hover:bg-gray-200"
                            >
                                Thêm
                            </button>
                        )}
                    </div>


                    <div>
                        <label className="block font-semibold text-black">Ngày sinh</label>
                        <input
                            type="date"
                            value={userInfo.dob || ""}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full p-2 border border-gray-400 rounded text-black"
                        />
                    </div>

                    <div className="flex items-start gap-6 mt-4">
                        <div>
                            <label className="block font-semibold text-black mb-2">Ảnh đại diện</label>
                            <input type="file" accept=".png,.jpg,.jpeg" onChange={handleFileChange}/>
                            <p className="text-xs text-gray-500 mt-1">
                                Dung lượng tối đa 1 MB. Định dạng: .JPEG, .PNG
                            </p>
                        </div>

                        {avatar && (
                            <img
                                src={URL.createObjectURL(avatar)}
                                alt="avatar"
                                className="w-24 h-24 object-cover rounded border border-black"
                            />
                        )}
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleSave}
                            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
