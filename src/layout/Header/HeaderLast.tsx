import { IoPersonSharp } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const HeaderLast = () => {
  return (
    <>
      <div className="header_last">
        <div>
          <Link to="/cart" className="cart_icon">
            <FaShoppingCart />
          </Link>
        </div>
        <div>
          <Link to="/login" className="person_icon">
            <IoPersonSharp />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeaderLast;
