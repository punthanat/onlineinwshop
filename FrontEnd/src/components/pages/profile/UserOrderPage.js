import { Container, Grid, Hidden, Tooltip } from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import OrderDetail from "../../ui/OrderDetail";
import { addResDialog } from "../../../actions/uiStyle";
import { connect } from "react-redux";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import "../../../css/order.css";
import squidgirlnotfound from "../../../images/asset/squidgirlnotfound.png";

const UserOrderPage = ({ addResDialog, userInfo }) => {
  const [myOrder, setMyOrder] = useState([]);
  const [currentViewOrder, setCurrentViewOrder] = useState({});
  const [page, setPage] = useState(0);
  const [pageSize] = useState(10);

  const movePage = (n) => {
    if ((page === 0 && n === -1) || (myOrder.length < pageSize && n === 1)) {
      return;
    } else {
      setPage(page + n);
    }
  };

  const getMyOrderHistory = useCallback(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/user/getuserorder?pageNo=${page}&pageSize=${pageSize}`,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )
      .then((res) => setMyOrder(res.data))
      .catch((err) => {
        const data = {
          status: err.response.data.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog, page, pageSize]);

  useEffect(() => {
    getMyOrderHistory();

    return () => {};
  }, [getMyOrderHistory]);

  const showOrderDetail = (order) => {
    setCurrentViewOrder(order);
  };

  const computedPrice = (order) => {
    let total = 0;
    for (let i = 0; i < order.orderDetail.length; i++) {
      total += order.orderDetail[i].totalPrice;
    }
    return total.toFixed(2);
  };

  const formatDate = (orderDate) => {
    const buyDate = new Date(orderDate);
    let year = buyDate.getFullYear();
    let month = parseInt(buyDate.getMonth()) + 1;
    let date = buyDate.getDate();
    let hours = buyDate.getHours();
    let mins = buyDate.getMinutes();
    if (String(mins).length === 1) {
      mins = "0" + String(mins);
    }
    let dateformat = date + "/" + month + "/" + year + " " + hours + ":" + mins;
    return dateformat;
  };

  return (
    <>
      <Container
        maxWidth="lg"
        style={{
          padding: 25 + "px",
          paddingTop: "50px",
          marginTop: 2 + "rem",
          backgroundColor: "white",
          borderRadius: 10 + "px",
          boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
          textAlign: "center",
        }}
      >
        {Object.keys(currentViewOrder).length <= 0 ? (
          <>
            {" "}
            <h2>ประวัติการสั่งซื้อ </h2>
            <Hidden smDown>
              <table className="orderTable">
                <thead className="orderTableHeader">
                  <tr>
                    <th>หมายเลขคำสั่งซื้อ</th>
                    <th>วัน เวลา</th>
                    <th>ยอดซื้อ</th>
                    <th>สถานะ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {myOrder.map((order) => {
                    return (
                      <tr key={order.userOrderId}>
                        <td className="p-5">#{order.userOrderId}</td>
                        <td> {formatDate(order.date)}</td>
                        <td>฿{computedPrice(order)}</td>
                        <td>Success!</td>
                        <td>
                          <Tooltip title="ข้อมูลเพิ่มเติม" arrow>
                            <MoreHorizIcon
                              className="hoverCursor"
                              onClick={() => showOrderDetail(order)}
                            />
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })}

                  {myOrder.length === 0 && (
                    <tr>
                      <td colSpan="5">
                        <img
                          src={squidgirlnotfound}
                          className="squidgirlnotfound"
                          alt="squidgirl"
                        />
                        <div className="text-center b f18">
                          คุณยังไม่มีประวัติการสั่งซื้อ
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <FirstPageIcon
                  className={page > 0 ? "navigateIcon" : "disabledNavigateIcon"}
                  onClick={() => setPage(0)}
                />
                <NavigateBeforeIcon
                  className={page > 0 ? "navigateIcon" : "disabledNavigateIcon"}
                  onClick={() => movePage(-1)}
                />

                <div className="b" style={{ width: "15px" }}>
                  {" "}
                  {page + 1}
                </div>

                <NavigateNextIcon
                  className={
                    myOrder.length >= pageSize
                      ? "navigateIcon"
                      : "disabledNavigateIcon"
                  }
                  onClick={() => movePage(1)}
                />
              </div>
            </Hidden>
            <Hidden mdUp>
              <>
                {myOrder.map((order) => {
                  return (
                    <div
                      key={order.userOrderId}
                      className="roundContainer text-left mb-20"
                      style={{
                        padding: " 50px",
                      }}
                    >
                      <Grid container spacing={3}>
                        {" "}
                        <Grid item xs={6} style={{ fontWeight: "600" }}>
                          หมายเลขคำสั่งซื้อ
                        </Grid>
                        <Grid item xs={6}>
                          #{order.userOrderId}
                        </Grid>
                        <Grid item xs={6} style={{ fontWeight: "600" }}>
                          วันและเวลา
                        </Grid>
                        <Grid item xs={6}>
                          {formatDate(order.date)}
                        </Grid>
                        <Grid item xs={6} style={{ fontWeight: "600" }}>
                          ราคาสุทธิ
                        </Grid>
                        <Grid item xs={6}>
                          ฿{computedPrice(order)}
                        </Grid>
                        <Grid item xs={6} style={{ fontWeight: "600" }}>
                          สถานะ
                        </Grid>
                        <Grid item xs={6}>
                          Success!
                        </Grid>
                        <Grid item xs={12}>
                          <button
                            className="AddButton"
                            onClick={() => showOrderDetail(order)}
                          >
                            รายละเอียด
                          </button>
                        </Grid>
                      </Grid>
                    </div>
                  );
                })}
                {myOrder.length === 0 && (
                  <>
                    <img
                      src={squidgirlnotfound}
                      className="squidgirlnotfound"
                      alt="squidgirl"
                    />
                    <div className="text-center b f18">
                      คุณยังไม่มีประวัติการสั่งซื้อ
                    </div>
                  </>
                )}

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <FirstPageIcon
                    className={
                      page > 0 ? "navigateIcon" : "disabledNavigateIcon"
                    }
                    onClick={() => setPage(0)}
                  />
                  <NavigateBeforeIcon
                    className={
                      page > 0 ? "navigateIcon" : "disabledNavigateIcon"
                    }
                    onClick={() => movePage(-1)}
                  />

                  <div className="b" style={{ width: "15px" }}>
                    {" "}
                    {page + 1}
                  </div>

                  <NavigateNextIcon
                    className={
                      myOrder.length >= pageSize
                        ? "navigateIcon"
                        : "disabledNavigateIcon"
                    }
                    onClick={() => movePage(1)}
                  />
                </div>
              </>
            </Hidden>
          </>
        ) : (
          <OrderDetail
            order={currentViewOrder}
            backOrderList={() => setCurrentViewOrder({})}
          />
        )}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOrderPage);
