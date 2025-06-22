import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/services/api";
import customApi from "@/services/customApi";
import { OrderCustomResponse, OrderCustomStatus } from "@/model/OrderCustom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/account/sidebar";

const FILTERS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Chờ báo giá", value: OrderCustomStatus.PENDING_QUOTE },
  { label: "Đã báo giá", value: OrderCustomStatus.QUOTED },
  { label: "Chờ thanh toán", value: OrderCustomStatus.AWAITING_PAYMENT },
  { label: "Đã thanh toán", value: OrderCustomStatus.PAID },
  //   { label: "Đã hủy", value: OrderCustomStatus.CANCELLED },
];

const MyOrdersCustomPage = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-ordersCustom", statusFilter],
    queryFn: () =>
      statusFilter === "ALL"
        ? customApi.getMyOrdersCustom()
        : customApi.getOrderCustomsByStatus(statusFilter),
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => customApi.cancelOrderCustom(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) => customApi.confirmOrderCustom(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
  });

  const payMutation = useMutation({
    mutationFn: (id: string) => customApi.payOrderCustom(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
  });

  const handleAction = (order: OrderCustomResponse) => {
    switch (order.status) {
      case OrderCustomStatus.PENDING_QUOTE:
        cancelMutation.mutate(order.id);
        break;
      case OrderCustomStatus.QUOTED:
        confirmMutation.mutate(order.id);
        break;
      case OrderCustomStatus.AWAITING_PAYMENT:
        navigate(`/payment/${order.id}`);
        break;
    }
  };

  const filteredOrders =
    statusFilter === "ALL"
      ? data
      : data?.filter((order) => order.status === statusFilter);

  if (isLoading)
    return <div className="text-center py-10">Đang tải đơn hàng...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu!</div>
    );

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />
      <div className="max-w-8xl mx-3.5 p-6 w-full" >
        <h2 className="text-2xl font-bold mb-6">Đơn hàng tuỳ chỉnh</h2>

        {/* Filter */}
        <div className="flex gap-3 mb-6">
          {FILTERS.map((filter) => (
            <Button
              key={filter.value}
              variant={statusFilter === filter.value ? "default" : "outline"}
              onClick={() => setStatusFilter(filter.value)}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {filteredOrders && filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
              >
                <div className="text-sm text-gray-500 mb-1">
                  Mã đơn: <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex gap-4">
                  {/* Hình ảnh bên trái */}
                  <div className="flex flex-col gap-2">
                    <img
                      src={
                        `${API_BASE_URL}${order.designFileUrls[0]}` ||
                        "/placeholder-design.png"
                      }
                      alt={`design-${order.id}`}
                      className="w-24 h-24 object-cover border rounded"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "/placeholder-design.png";
                      }}
                    />
                  </div>

                  {/* Thông tin bên phải */}
                  <div className="flex-1">
                    <div className="text-sm mb-1">
                      Số lượng: {order.quantity}
                    </div>
                    <div className="text-sm mb-1">
                      Trạng thái: <b>{order.status}</b>
                    </div>
                    <div className="text-sm mb-1 text-gray-700">
                      Mô tả: {order.description ?? "Không có mô tả"}
                    </div>
                    <div className="text-sm mb-1 text-gray-700">
                      Báo giá sản phẩm: {order.quotedPrice ?? "Chờ báo giá"}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  Ngày tạo: {new Date(order.createdAt).toLocaleString("vi-VN")}
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  {order.status === OrderCustomStatus.PENDING_QUOTE && (
                    <Button
                      variant="destructive"
                      onClick={() => handleAction(order)}
                      disabled={cancelMutation.isPending}
                    >
                      Hủy đơn
                    </Button>
                  )}

                  {order.status === OrderCustomStatus.QUOTED && (
                    <Button
                      onClick={() => handleAction(order)}
                      disabled={confirmMutation.isPending}
                    >
                      Xác nhận báo giá
                    </Button>
                  )}

                  {order.status === OrderCustomStatus.AWAITING_PAYMENT && (
                    <Button
                      onClick={() => handleAction(order)}
                      disabled={payMutation.isPending}
                    >
                      Thanh toán
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600">
            Không có đơn hàng phù hợp.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersCustomPage;
