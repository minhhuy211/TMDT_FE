import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE_URL } from "@/services/api";
import customApi from "@/services/customApi";
import { OrderCustomResponse, OrderCustomStatus } from "@/model/OrderCustom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyOrdersCustomPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-ordersCustom"],
    queryFn: customApi.getMyOrdersCustom,
  });

  const cancelMutation = useMutation({
    mutationFn: (id: string) => customApi.cancelOrderCustom(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
  });

  const confirmMutation = useMutation({
    mutationFn: (id: string) => customApi.confirmOrderCustom(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
  });

  const payMutation = useMutation({
    mutationFn: (id: string) => customApi.payOrderCustom(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-ordersCustom"] }),
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

  if (isLoading) return <div className="text-center py-10">Đang tải đơn hàng...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Lỗi tải dữ liệu!</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Đơn hàng của bạn</h2>
      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition duration-300"
            >
              <div className="text-sm text-gray-500 mb-1">
                Mã đơn: <span className="font-medium">{order.id}</span>
              </div>
              <div className="text-sm mb-1">Số lượng: {order.quantity}</div>
              <div className="text-sm mb-1">
                Trạng thái: <b>{order.status}</b>
              </div>
              {order.description && (
                <div className="text-sm mb-1 text-gray-700">Mô tả: {order.description}</div>
              )}
              <div className="text-sm mb-1 text-gray-700">Báo giá sản phẩm: {order.quotedPrice ?? "Chưa có"}</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {order.designFileUrls.map((url, idx) => (
                  <img
                    key={idx}
                    src={url.startsWith("http") ? url : `${API_BASE_URL}${url}`}
                    alt={`design-${idx}`}
                    className="w-20 h-20 object-cover border rounded"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/placeholder-design.png";
                    }}
                  />
                ))}
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
        <div className="text-center text-gray-600">Bạn chưa có đơn hàng nào.</div>
      )}
    </div>
  );
};

export default MyOrdersCustomPage;
