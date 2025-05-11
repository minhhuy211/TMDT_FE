import { FaTrashAlt } from "react-icons/fa";
import "./style.scss";

export const Cart = () => {
  return (
      <div className="cart-container">
        <h2 className="cart-title">🛒 Giỏ Hàng</h2>

        <div className="cart-content">
          {/* Danh sách sản phẩm */}
          <div className="cart-items shadow-card">
            <table className="cart-table">
              <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Giá</th>
                <th>Số lượng</th>
                <th>Tổng</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="product-info">
                  <img src="/" alt="" />
                  <span>Mô hình </span>
                </td>
                <td>50.000 VND</td>
                <td>
                  <div className="quantity-control">
                    <button>-</button>
                    <span>2</span>
                    <button>+</button>
                  </div>
                </td>
                <td>100.000 VND</td>
                <td><FaTrashAlt className="trash-icon" /></td>
              </tr>
              </tbody>
            </table>

            <div className="cart-actions">
              <button className="outline-btn">Tiếp tục mua sắm</button>
            </div>
          </div>

          {/* Tổng đơn hàng */}
          <div className="cart-summary shadow-card">
            <h3>Tổng đơn hàng</h3>

            <div className="summary-row">
              <span>Tổng tiền hàng:</span>
              <span>100.000 VND</span>
            </div>
            <div className="summary-row">
              <span>Phí vận chuyển:</span>
              <span>20.000 VND</span>
            </div>
            <div className="summary-row total">
              <span>Tổng giá trị:</span>
              <span className="highlight">120.000 VND</span>
            </div>

            {/* Nhập mã giảm giá */}
            <div className="discount-code">
              <input type="text" placeholder="Nhập mã giảm giá"/>
              <button className="apply-btn">Áp dụng</button>
            </div>

            <button className="checkout-btn">Thanh Toán</button>
          </div>

        </div>
      </div>
  );
};
