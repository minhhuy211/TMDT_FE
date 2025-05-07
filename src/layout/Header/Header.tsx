import HeaderLast from "./HeaderLast";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";
import "./style.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <HeaderLogo />
        <HeaderNav />
        <HeaderLast />
      </div>
    </>
  );
};

export default Header;
