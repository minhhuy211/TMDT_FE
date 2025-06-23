import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addressApi } from "@/services/addresses";
import { FaTrashAlt } from "react-icons/fa";

const AddressSection: React.FC = () => {
    const [newAddress, setNewAddress] = useState({ name: "", street: "", city: "" });

    const { data: addresses = [], refetch } = useQuery({
        queryKey: ["addresses"],
        queryFn: addressApi.getAddresses,
        refetchOnWindowFocus: false,
    });

    const addMutation = useMutation({
        mutationFn: () => addressApi.addAddress({ ...newAddress }),
        onSuccess: () => {
            setNewAddress({ name: "", street: "", city: "" });
            refetch();
            alert("Thêm địa chỉ thành công!");
        },
        onError: (err: any) => alert("Thêm địa chỉ thất bại: " + (err?.message || "Không xác định")),
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => addressApi.deleteAddress(id),
        onSuccess: () => {
            refetch();
            alert("Đã xóa địa chỉ!");
        },
        onError: (err: any) => alert("Xóa địa chỉ thất bại: " + (err?.message || "Không xác định")),
    });

    return (
        <div className="mt-8 p-6 bg-white rounded-xl shadow-md max-w-3xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Địa chỉ nhận hàng</h2>

            {addresses.length === 0 ? (
                <div className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào.</div>
            ) : (
                <ul className="mb-6 space-y-3">
                    {addresses.map(addr => (
                        <li
                            key={addr.id}
                            className="border rounded-lg px-4 py-3 bg-gray-50 flex justify-between items-center hover:shadow"
                        >
                            <span className="text-gray-700">
                                <span className="font-medium text-black">{addr.name}</span>: {addr.street}{addr.city ? `, ${addr.city}` : ""}
                            </span>
                            <button
                                onClick={() => {
                                    if (window.confirm("Xác nhận xóa địa chỉ này?")) {
                                        deleteMutation.mutate(addr.id);
                                    }
                                }}
                                className="text-red-500 hover:text-red-700 disabled:opacity-60"
                                title="Xóa địa chỉ"
                                disabled={deleteMutation.isPending}
                            >
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <form
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                onSubmit={e => {
                    e.preventDefault();
                    addMutation.mutate();
                }}
            >
                <input
                    type="text"
                    placeholder="Tên người nhận"
                    value={newAddress.name}
                    onChange={e => setNewAddress(v => ({ ...v, name: e.target.value }))}
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Địa chỉ (street)"
                    value={newAddress.street}
                    onChange={e => setNewAddress(v => ({ ...v, street: e.target.value }))}
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                    required
                />
                <input
                    type="text"
                    placeholder="Tỉnh/thành phố"
                    value={newAddress.city}
                    onChange={e => setNewAddress(v => ({ ...v, city: e.target.value }))}
                    className="border border-gray-300 p-2 rounded-md shadow-sm focus:ring-black focus:border-black"
                    required
                />
                <div className="md:col-span-3">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-60"
                        disabled={addMutation.isPending}
                    >
                        {addMutation.isPending ? "Đang thêm..." : "Thêm địa chỉ mới"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddressSection;