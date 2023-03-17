import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../../css/order.css";
import squidgirlnotfound from "../../../images/asset/squidgirlnotfound.png";

const MySellHistoryPage = () => {
  const [mySell, setMySell] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/seller/order`)
      .then((res) => {
        setMySell(res.data);
      });
  }, []);

  return (
    <div className="profileBox">
      <div className="f24 b text-center pt-30">ประวัติการขายสินค้าของคุณ</div>

      <table
        className="orderTable "
        style={{
          paddingBottom: "10px",
          position: "relative",
          textAlign: "center",
          margin: "auto",
          width: "100%",
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        <thead className="orderTableHeader">
          <tr className="f13 b">
            <th>สินค้า</th>
            <th>สี</th>
            <th>จำนวน</th>
            <th>ราคารวม</th>
          </tr>
        </thead>
        <tbody>
          {mySell.map((sell) => {
            return (
              <tr key={`sellerproduct${sell.orderDetailId}`} className="f13 b">
                <td className="p-20-5 ">{sell.product.name}</td>
                <td className="p-20-5">{sell.color.colorName}</td>
                <td className="p-20-5">{sell.quantity}</td>
                <td className="p-20-5">฿{sell.totalPrice}</td>
              </tr>
            );
          })}

          {mySell.length === 0 && (
            <tr>
              <td colSpan="4">
                <img
                  src={squidgirlnotfound}
                  className="squidgirlnotfound"
                  alt="squidgirl"
                />
                <div className="text-center b f18">
                  คุณยังไม่มีประวัติการขาย
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MySellHistoryPage;
