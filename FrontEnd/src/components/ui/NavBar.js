import { Link } from "react-router-dom";
import { Hidden, Paper, Popper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import React, { useState } from "react";
import { connect } from "react-redux";
import { removeFromCart, clearCartItem } from "../../actions/cart";
import Cart from "./Cart";
import squidlogo from "../../images/asset/squidlogo.png";
import PersonIcon from "@material-ui/icons/Person";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { VpnKey } from "@material-ui/icons";
import {
  addResDialog,
  clickedFilter,
  openSearchModal,
} from "../../actions/uiStyle";
import ProfileDrawer from "./ProfileDrawer";
import SearchModal from "./SearchModal";
import GuestUserPage from "../pages/login/GuestUserPage";
import { logout } from "../../actions/user";
import { useEffect } from "react";
import "../../css/navbar.css";

const NavBar = ({
  userInfo,
  cart,
  uiStyle,
  logout,
  clickedFilter,
  removeFromCart,
  clearCartItem,
  openSearchModal,
  addResDialog,
}) => {
  const [isShowCart, setIsShowCart] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isShowProfileDrawer, setIsShowProfileDrawer] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const isToken = localStorage.token;
  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onChange = (e) => {
    setSearchVal(e.target.value);

    const body = document.querySelector("body");
    if (uiStyle.searchModalShow) {
      return;
    }
    if (searchVal.length > 0) {
      openSearchModal(true);
      body.style.overflow = "hidden";
    } else {
      openSearchModal(false);
      body.style.overflow = "auto";
    }
  };

  const handleCart = (open) => (event) => {
    setIsShowCart(open);
  };

  const handleProfileDrawer = (val) => {
    setIsShowProfileDrawer(val);
  };

  const handleSearchModal = (open) => (event) => {
    const body = document.querySelector("body");

    openSearchModal(open);
    if (open === false) {
      body.style.overflow = "auto";
      setSearchVal("");
    }
  };

  const handleShowGuestModal = (open) => (event) => {
    setShowGuestModal(open);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogout = () => {
    logout();
    let data = { status: 200, dialogContent: "คุณออกจากระบบแล้ว" };
    addResDialog(data);
  };

  useEffect(() => {
    setAnchorEl(null);
  }, [isToken]);

  return (
    <>
      <Cart
        listProduct={cart}
        onHandleCart={handleCart}
        isShowCart={isShowCart}
        remove={removeFromCart}
        clearCart={clearCartItem}
        isAuth={isToken ? true : false}
        filter={clickedFilter}
        userInfo={userInfo}
        showLoginForm={handleShowGuestModal(true)}
        addResDialog={addResDialog}
      />

      <ProfileDrawer
        open={isShowProfileDrawer}
        isAuth={isToken ? true : false}
        role={userInfo.role}
        showLoginForm={handleShowGuestModal(true)}
        close={() => handleProfileDrawer(false)}
        handleLogout={() => handleLogout()}
      />

      <SearchModal
        open={uiStyle.searchModalShow}
        close={handleSearchModal(false)}
        query={searchVal}
      />

      <GuestUserPage
        open={showGuestModal}
        close={handleShowGuestModal(false)}
      />

      <>
        <div className="navBar ">
          <div className="topNav ">
            <Link to="/shop">
              <div
                className="hoverCursor"
                onClick={() => {
                  openSearchModal(false);
                  setSearchVal("");
                }}
              >
                <img src={squidlogo} alt="โฮมเพจ" className="logoImage" />
              </div>
            </Link>

            <Hidden smDown>
              <div
                className="pr-50  "
                style={{
                  maxWidth: "570px",
                  width: "100%",

                  borderWidth: "0px",
                  zIndex: "2147483647",
                  position: "static",
                }}
              >
                <div className="searchBox">
                  <input
                    type="text"
                    name="searchNav"
                    placeholder="ค้นหา"
                    className="searchNav"
                    value={searchVal}
                    onChange={onChange}
                  />
                  <div
                    className="searchIcon hoverCursor"
                    onClick={() => openSearchModal(true)}
                  >
                    {" "}
                    <SearchIcon />
                  </div>
                </div>
              </div>
            </Hidden>

            <Hidden mdUp>
              <SearchIcon
                className="hoverCursor"
                onClick={handleSearchModal(true)}
              />
            </Hidden>

            <div
              className="iconNav hoverCursor"
              onMouseEnter={handleOpenMenu}
              onClick={() => {
                if (isToken) {
                  handleProfileDrawer(!isShowProfileDrawer);
                  setAnchorEl(null);
                } else {
                  setShowGuestModal(true);
                }
              }}
              aria-controls="menu"
              style={{ borderWidth: " 0 1px 0 1px", textAlign: "center" }}
            >
              <div>
                <PersonOutlineOutlinedIcon style={{ fontSize: "30px" }} />
              </div>
              <Hidden mdDown>
                <div className="f13">บัญชีผู้ใช้</div>
              </Hidden>
            </div>
            <div
              className="iconNav hoverCursor"
              style={{ textAlign: "center" }}
              onClick={handleCart(true)}
            >
              <div>
                <ShoppingCartOutlinedIcon
                  style={{ fontSize: "30x", postion: "absolute" }}
                />
                <div>
                  {cart.length > 0 && (
                    <div className="cartCount">{cart.length}</div>
                  )}
                </div>
              </div>
              <Hidden mdDown>
                {" "}
                <div className="f13 ">ตะกร้า</div>
              </Hidden>
            </div>
          </div>
          <div style={{ position: "absolute", paddingTop: "75px" }}></div>
        </div>
      </>
      {isToken && (
        <Hidden mdDown>
          <Popper
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onMouseLeave={() => setAnchorEl(null)}
            style={{ zIndex: "10" }}
          >
            <Paper
              id="menu"
              paperprops={{
                style: {
                  width: "250px",
                  display: "flex",
                  textAlign: "right",
                  marginTop: "35px",
                },
              }}
            >
              <>
                <Link to="/profile/info" className="link">
                  <div
                    onClick={() => {
                      setAnchorEl(null);

                      openSearchModal(false);
                    }}
                    style={{
                      fontSize: "14px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "left",
                      width: "250px",
                      fontWeight: "600",
                    }}
                    className="hoverCursor currentHoverStyle"
                  >
                    <PersonIcon className="pr-10" /> ข้อมูลของฉัน
                  </div>
                </Link>
                <Link to="/profile/changepassword" className="link">
                  <div
                    onClick={() => {
                      setAnchorEl(null);

                      openSearchModal(false);
                    }}
                    style={{
                      fontSize: "14px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: "600",
                      width: "250px",
                    }}
                    className="hoverCursor currentHoverStyle"
                  >
                    <VpnKey className="pr-10" /> เปลี่ยนรหัสผ่าน
                  </div>
                </Link>

                <Link to="/profile/order" className="link">
                  <div
                    onClick={() => {
                      setAnchorEl(null);

                      openSearchModal(false);
                    }}
                    style={{
                      fontSize: "14px",
                      padding: "10px",
                      display: "flex",
                      justifyContent: "left",
                      fontWeight: "600",
                      width: "250px",
                    }}
                    className="hoverCursor currentHoverStyle"
                  >
                    <ListAltIcon className="pr-10" /> คำสั่งซื้อ
                  </div>
                </Link>

                {userInfo.role === "ROLE_USER" && (
                  <Link to="/profile/startseller" className="link">
                    <div
                      onClick={() => {
                        setAnchorEl(null);

                        openSearchModal(false);
                      }}
                      style={{
                        fontSize: "14px",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "left",
                        fontWeight: "600",
                        width: "250px",
                      }}
                      className="hoverCursor currentHoverStyle"
                    >
                      {" "}
                      <ShoppingCartOutlinedIcon className="pr-10" />{" "}
                      เริ่มขายสินค้า
                    </div>
                  </Link>
                )}

                {userInfo.role === "ROLE_SELLER" ||
                  (userInfo.role === "ROLE_ADMIN" && (
                    <Link to="/profile/createproduct" className="link">
                      <div
                        onClick={() => {
                          setAnchorEl(null);

                          openSearchModal(false);
                        }}
                        style={{
                          fontSize: "14px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "left",
                          fontWeight: "600",
                          width: "250px",
                        }}
                        className="hoverCursor currentHoverStyle"
                      >
                        {" "}
                        <ShoppingCartOutlinedIcon className="pr-10" />{" "}
                        ลงขายสินค้า
                      </div>
                    </Link>
                  ))}

                <div
                  onClick={() => handleLogout()}
                  style={{
                    fontSize: "14px",
                    display: "flex",
                    justifyContent: "left",
                  }}
                  className="hoverCursor b p-10 currentHoverStyle"
                >
                  ออกจากระบบ
                </div>
              </>
            </Paper>
          </Popper>
        </Hidden>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
    cart: state.cart.cart,
    uiStyle: state.uiStyle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeFromCart: (product) => dispatch(removeFromCart(product)),
    clearCartItem: () => dispatch(clearCartItem()),
    openSearchModal: (open) => dispatch(openSearchModal(open)),
    clickedFilter: (e) => dispatch(clickedFilter(e)),
    logout: () => dispatch(logout()),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
