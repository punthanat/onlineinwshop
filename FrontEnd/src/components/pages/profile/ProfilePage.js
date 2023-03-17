import { Grid, Container, Hidden } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ChangePasswordForm from "../../forms/ChangePasswordForm";
import InfoPage from "./InfoPage";
import UserOrderPage from "./UserOrderPage";
import { Route, Switch, useLocation } from "react-router";
import { Link } from "react-router-dom";
import CreateProductPage from "./CreateProductPage";
import { addResDialog } from "../../../actions/uiStyle";
import { connect } from "react-redux";
import EditProductPage from "./EditProductPage";
import UserListPage from "./UserListPage";
import ListBaseDataPage from "./ListBaseDataPage";
import { logout, getUser } from "../../../actions/user";
import MyShopPage from "./MyShopPage";
import StartSellPage from "./StartSellPage";
import MySellHistoryPage from "./MySellHistoryPage";
import "../../../css/profileMenu.css";

const ProfilePage = ({ userInfo, logout, addResDialog }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {};
  }, []);

  const handleLogOut = () => {
    logout();
    let data = { status: 200, dialogContent: "คุณออกจากระบบแล้ว" };
    addResDialog(data);
  };

  const [currentClickStyle, setCurrentClickStyle] = useState("");
  const currentPath = useLocation().pathname;

  useEffect(() => {
    setCurrentClickStyle(currentPath);
  }, [currentPath]);

  return (
    <>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          style={{ marginTop: 3 + "rem" }}
        >
          <Grid item xs={12} md={4}>
            {" "}
            <Hidden smDown>
              <div className="menuProfile">
                <Link
                  to="/profile/info"
                  className={
                    currentClickStyle === "/profile/info"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                  style={{ marginTop: "30px" }}
                >
                  <div>ข้อมูลของฉัน</div>
                </Link>
                <Link
                  to="/profile/changepassword"
                  className={
                    currentClickStyle === "/profile/changepassword"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>เปลี่ยนรหัสผ่าน</div>
                </Link>
                <Link
                  to="/profile/order"
                  className={
                    currentClickStyle === "/profile/order"
                      ? "clickChangeBackground p-10 "
                      : "hoverChangeBackground p-10"
                  }
                >
                  <div>คำสั่งซื้อ</div>
                </Link>
                {userInfo.role === "ROLE_USER" && (
                  <Link
                    to="/profile/startseller"
                    className={
                      currentClickStyle === "/profile/startseller"
                        ? "clickChangeBackground p-10 "
                        : "hoverChangeBackground p-10"
                    }
                  >
                    <div>เริ่มขายสินค้า</div>
                  </Link>
                )}

                {userInfo.role === "ROLE_SELLER" && (
                  <>
                    <Link
                      to="/profile/createproduct"
                      className={
                        currentClickStyle === "/profile/createproduct"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ลงขายสินค้า</div>
                    </Link>

                    <Link
                      to="/profile/myshop"
                      className={
                        currentClickStyle === "/profile/myshop"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ร้านค้าของฉัน</div>
                    </Link>

                    <Link
                      to="/profile/mysellhistory"
                      className={
                        currentClickStyle === "/profile/mysellhistory"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ประวัติการขาย</div>
                    </Link>
                  </>
                )}
                {userInfo.role === "ROLE_ADMIN" && (
                  <>
                    <Link
                      to="/profile/createproduct"
                      className={
                        currentClickStyle === "/profile/createproduct"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ลงขายสินค้า</div>
                    </Link>

                    <Link
                      to="/profile/myshop"
                      className={
                        currentClickStyle === "/profile/myshop"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ร้านค้าของฉัน</div>
                    </Link>
                    <Link
                      to="/profile/mysellhistory"
                      className={
                        currentClickStyle === "/profile/mysellhistory"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>ประวัติการขาย</div>
                    </Link>
                    <Link
                      to="/profile/admin/basedata"
                      className={
                        currentClickStyle === "/profile/admin/basedata"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>จัดการข้อมูลพื้นฐาน</div>
                    </Link>

                    <Link
                      to="/profile/admin/users"
                      className={
                        currentClickStyle === "/profile/admin/users"
                          ? "clickChangeBackground p-10 "
                          : "hoverChangeBackground p-10"
                      }
                    >
                      <div>จัดการข้อมูลผู้ใช้</div>
                    </Link>
                  </>
                )}
                <div
                  className="hoverChangeBackground mb-20"
                  style={{ padding: "10px 40px" }}
                  onClick={() => handleLogOut()}
                >
                  ออกจากระบบ
                </div>
              </div>{" "}
            </Hidden>
          </Grid>

          <Grid item xs={12} md={8}>
            <Switch>
              <Route path={"/profile/info"}>
                <InfoPage />
              </Route>
              <Route path={"/profile/changepassword"}>
                {" "}
                <ChangePasswordForm />
              </Route>
              <Route path={"/profile/order"}>
                {" "}
                <UserOrderPage />
              </Route>

              {userInfo.role === "ROLE_USER" && (
                <Route path={"/profile/startseller"}>
                  {" "}
                  <StartSellPage />
                </Route>
              )}

              {userInfo.role === "ROLE_SELLER" && (
                <Switch>
                  <Route path={"/profile/createproduct"}>
                    {" "}
                    <CreateProductPage />
                  </Route>
                  <Route path={"/profile/myshop"}>
                    {" "}
                    <MyShopPage />
                  </Route>
                  <Route path={"/profile/mysellhistory"}>
                    {" "}
                    <MySellHistoryPage />
                  </Route>
                  <Route path={"/profile/editproduct"}>
                    {" "}
                    <EditProductPage />
                  </Route>
                </Switch>
              )}
              {userInfo.role === "ROLE_ADMIN" && (
                <Switch>
                  <Route path={"/profile/createproduct"}>
                    {" "}
                    <CreateProductPage />
                  </Route>
                  <Route path={"/profile/myshop"}>
                    {" "}
                    <MyShopPage />
                  </Route>
                  <Route path={"/profile/mysellhistory"}>
                    {" "}
                    <MySellHistoryPage />
                  </Route>
                  <Route path={"/profile/editproduct"}>
                    {" "}
                    <EditProductPage />
                  </Route>
                  <Route path={"/profile/admin/"}>
                    <Route path={"/profile/admin/basedata"}>
                      <ListBaseDataPage />
                    </Route>
                    <Route path={"/profile/admin/users"}>
                      <UserListPage />
                    </Route>
                  </Route>{" "}
                </Switch>
              )}
            </Switch>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
    getUser: () => dispatch(getUser()),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
