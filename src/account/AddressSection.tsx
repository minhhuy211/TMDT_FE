import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { addressApi } from "@/services/addresses";
import { FaTrashAlt } from "react-icons/fa";

const AddressSection: React.FC = () => {
    const [newAddress, setNewAddress] = useState({ name: "", street: "", city: "" });

    // Lấy danh sách địa chỉ
    const { data: addresses = [], refetch } = useQuery({
        queryKey: ["addresses"],
        queryFn: addressApi.getAddresses,
        refetchOnWindowFocus: false,
    });

    // Thêm địa chỉ mới
    const addMutation = useMutation({
        mutationFn: () => addressApi.addAddress({ ...newAddress }),
        onSuccess: () => {
            setNewAddress({ name: "", street: "", city: "" });
            refetch();
            alert("Thêm địa chỉ thành công!");
        },
        onError: (err: any) => alert("Thêm địa chỉ thất bại: " + (err?.message || "Không xác định")),
    });

    // Xóa địa chỉ
    const deleteMutation = useMutation({
        mutationFn: (id: string) => addressApi.deleteAddress(id),
        onSuccess: () => {
            refetch();
            alert("Đã xóa địa chỉ!");
        },
        onError: (err: any) => alert("Xóa địa chỉ thất bại: " + (err?.message || "Không xác định")),
    });

    return (
        <div className="mt-4 p-4 bg-white rounded shadow max-w-xl">
            <h2 className="text-lg font-bold mb-3">Địa chỉ nhận hàng</h2>
            {/* List addresses */}
            {addresses.length === 0 ? (
                <div className="text-gray-500 mb-3">Bạn chưa có địa chỉ nào.</div>
            ) : (
                <ul className="mb-3 space-y-2">
                    {addresses.map(addr => (
                        <li key={addr.id} className="border rounded px-3 py-2 bg-gray-50 flex justify-between items-center">
                            <span>
                                <span className="font-semibold">{addr.name}</span>: {addr.street}{addr.city ? `, ${addr.city}` : ""}
                            </span>
                            <button
                                onClick={() => {
                                    if (window.confirm("Xác nhận xóa địa chỉ này?")) {
                                        deleteMutation.mutate(addr.id);
                                    }
                                }}
                                className="ml-2 text-red-600 hover:text-red-900"
                                title="Xóa địa chỉ"
                                disabled={deleteMutation.isPending}
                            >
                                <FaTrashAlt />
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* Add new address form */}
            <form
                className="grid grid-cols-1 md:grid-cols-3 gap-3"
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
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Địa chỉ (street)"
                    value={newAddress.street}
                    onChange={e => setNewAddress(v => ({ ...v, street: e.target.value }))}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Tỉnh/thành phố"
                    value={newAddress.city}
                    onChange={e => setNewAddress(v => ({ ...v, city: e.target.value }))}
                    className="border p-2 rounded"
                    required
                />
                <button
                    type="submit"
                    className="col-span-1 md:col-span-3 bg-black text-white px-4 py-2 rounded mt-2"
                    disabled={addMutation.isPending}
                >
                    {addMutation.isPending ? "Đang thêm..." : "Thêm địa chỉ mới"}
                </button>
            </form>
        </div>
    );
};

export default AddressSection;
