import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const HeaderLogo = () => {
    return (
        <div className="header_logo">
            <Link to="/homePage">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <h2 className="nav_logo">Triple D</h2>
        </div>
    );
};

export default HeaderLogo;
