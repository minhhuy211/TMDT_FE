import logo from "../../assets/logo/logo.png";

const HeaderLogo = () => {
  return (
    <>
      <div className="header_logo">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="nav_logo">Triple D</h2>
      </div>
    </>
  );
};

export default HeaderLogo;
