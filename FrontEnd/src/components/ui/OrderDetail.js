import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Hidden } from "@material-ui/core";
import OrderDetailRow from "./OrderDetailRow";

const OrderDetail = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total = 0;
    if (props.order) {
      for (let i = 0; i < props.order.orderDetail.length; i++) {
        total += props.order.orderDetail[i].totalPrice;
      }
    }
    setTotalPrice(total.toFixed(2));
  }, [props.order]);

  const formatDate = () => {
    const buyDate = new Date(props.order.date);
    const monthNames = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม",
    ];
    let year = buyDate.getFullYear();
    let month = buyDate.getMonth();
    let date = buyDate.getDate();
    let hours = buyDate.getHours();
    let mins = buyDate.getMinutes();
    if (String(mins).length === 1) {
      mins = "0" + String(mins);
    }
    let dateformat =
      date +
      " " +
      monthNames[month] +
      " " +
      year +
      " เวลา " +
      hours +
      ":" +
      mins;
    return dateformat;
  };

  return (
    <div className="orderDetailContainer">
      <div
        className="f20 b p-20 m-0"
        style={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          borderStyle: "solid",
          borderColor: "#e4e4e4",
          backgroundColor: "#fafafa",
          borderWidth: "0 0 1px 0",
        }}
      >
        <ArrowBackIcon
          className="hoverCursor"
          style={{ paddingRight: "20px" }}
          onClick={props.backOrderList}
        />{" "}
        หมายเลขคำสั่งซื้อ # {props.order.userOrderId}
      </div>

      <Hidden smDown>
        <div className="f16 b text-left p-20 pb-5">{formatDate()}</div>

        <div className="p-20 pt-10 f18 b text-left">สินค้าที่สั่งซื้อ</div>
        <table
          className="orderTable "
          style={{
            paddingBottom: "10px",
            position: "relative",
            textAlign: "center",
            margin: "auto",
            width: "90%",
            marginBottom: "30px",
          }}
        >
          <thead className="orderTableHeader">
            <tr>
              <th>สินค้า</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>สี</th>
              <th>รวม</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.order.orderDetail.map((odt) => {
              return <OrderDetailRow odt={odt} key={odt.orderDetailId} />;
            })}

            <tr>
              <td
                colSpan="10"
                className="text-right b"
                style={{
                  border: "none",
                }}
              >
                ราคาสุทธิ ฿{totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </Hidden>

      <Hidden mdUp>
        <div>
          {" "}
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
              fontWeight: "900",
              fontSize: "20px",
              borderStyle: "solid",
              borderColor: "#e4e4e4",
              backgroundColor: "#fafafa",
              borderWidth: "1px",
              borderRadius: "20px 20px 0 0",
              padding: "20px",
              margin: "5px",
              marginBottom: 0,
            }}
          >
            สินค้าที่สั่งซื้อ
          </div>
          <div
            style={{
              margin: "5px",
              marginTop: " 0",
              borderWidth: "1px",
              borderRadius: "0 0 20px 20px  ",
              borderStyle: "solid",
              borderColor: "#e4e4e4",
            }}
          >
            <div className="p-20 pb-20 f13 text-left">{formatDate()}</div>

            {props.order.orderDetail.map((odt) => {
              return (
                <React.Fragment key={odt.orderDetailId}>
                  <OrderDetailRow odt={odt} />{" "}
                </React.Fragment>
              );
            })}

            <div
              className="text-right b pb-20 pr-10"
              style={{
                paddingTop: "1px",
              }}
            >
              {" "}
              ราคาสุทธิ ฿{totalPrice}
            </div>
          </div>
        </div>
      </Hidden>
    </div>
  );
};

export default OrderDetail;
