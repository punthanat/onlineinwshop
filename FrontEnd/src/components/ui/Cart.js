import { Drawer, Hidden, List, ListItem } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductInCartBox from "./ProductInCartBox";

import "../../css/cart.css";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
const Cart = (props) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const body = document.querySelector("body");
    if (props.isShowCart) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [props]);

  useEffect(() => {
    let total = 0;
    if (props.listProduct) {
      for (let i = 0; i < props.listProduct.length; i++) {
        total += props.listProduct[i].totalPrice;
      }
    }
    setTotalPrice(total);
  }, [props.listProduct]);

  const handleCheckOut = () => {
    if (props.isAuth) {
      var currentDate = new Date();
      let order = {
        date: currentDate.toISOString(),
        orderDetail: props.listProduct,
        user: {
          userId: props.userInfo.userId,
          userName: props.userInfo.userName,
        },
      };
      const json = JSON.stringify(order);

      axios
        .post(`${process.env.REACT_APP_API_URL}/user/addorder`, json, {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
        .then((res) => {
          const data = {
            status: res.status,
            dialogContent: "ซื้อสินค้าสำเร็จ!!",
          };
          props.addResDialog(data);
        })

        .catch((err) => {
          const data = {
            status: err.response.status,
            dialogContent: err.response.data.message,
          };
          props.addResDialog(data);
        })
        .then(props.onHandleCart(false))
        .then(props.clearCart())
        .then(props.filter("all"));
    } else {
      props.showLoginForm();
    }
  };

  return (
    <>
      <Hidden mdUp>
        <Drawer
          open={props.isShowCart}
          anchor={"right"}
          onClose={props.onHandleCart(false)}
        >
          <List style={{ paddingLeft: "15px" }}>
            {props.listProduct.length === 0 ? (
              <ListItem style={{ fontWeight: 800 }}>
                ไม่มีสินค้าในตะกร้า
              </ListItem>
            ) : (
              <div className="cartHead pt-10 pb-10">
                <div className="pl-10">ตะกร้าสินค้า : </div>
                <div>
                  <button
                    className="delFromCart text-right mr-5 "
                    onClick={() => props.clearCart()}
                  >
                    ลบทั้งหมด
                  </button>{" "}
                </div>
              </div>
            )}
            {props.listProduct.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ProductInCartBox orderDetail={item} remove={props.remove} />
                </ListItem>
              );
            })}
            <h4 className="text-right mr-30">
              ราคารวมทั้งหมด : ฿ {totalPrice.toFixed(2)}
            </h4>
            <ListItem>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                  width: "100%",
                }}
              >
                {props.listProduct.length > 0 && (
                  <button
                    className="AddButton"
                    style={{ paddingLeft: "30px", paddingRight: "30px" }}
                    onClick={handleCheckOut}
                  >
                    สั่งซื้อ
                  </button>
                )}
                <button
                  className="delFromCart"
                  style={{
                    marginLeft: 10 + "px",
                    paddingTop: 5 + "px",
                    paddingBottom: 5 + "px",
                    marginBottom: 5 + "px",
                    paddingLeft: 30 + "px",
                    paddingRight: "30px",
                  }}
                  onClick={props.onHandleCart(false)}
                >
                  ปิด
                </button>{" "}
              </div>
            </ListItem>
          </List>
        </Drawer>
      </Hidden>

      <Hidden smDown>
        <Drawer
          open={props.isShowCart}
          anchor={"right"}
          onClose={props.onHandleCart(false)}
          style={{ overflowX: "hidden" }}
        >
          <List style={{ width: "550px", maxWidth: "550px" }}>
            {props.listProduct.length === 0 ? (
              <ListItem
                style={{
                  fontWeight: 800,
                  borderStyle: "solid",
                  borderWidth: "0 0 1px 0",
                  maxWidth: "90%",
                  marginLeft: "20px",
                }}
              >
                ไม่มีสินค้าในตะกร้า
              </ListItem>
            ) : (
              <>
                <div
                  className="cartHead"
                  style={{
                    maxWidth: "90%",
                    padding: "15px",
                    marginLeft: "20px",
                  }}
                >
                  <div>ตะกร้าสินค้า :</div>
                  <div style={{ textAlign: "right", marginRight: 25 + "px" }}>
                    <button
                      className="delFromCart"
                      style={{
                        padding: "3px",
                        borderRadius: "5px",
                        alignItems: "center",
                        display: "flex",
                      }}
                      onClick={() => props.clearCart()}
                    >
                      <div>ลบทั้งหมด</div>
                      <DeleteOutlineIcon style={{ fontSize: "15px" }} />
                    </button>
                  </div>
                </div>
              </>
            )}
            {props.listProduct.map((item, index) => {
              return (
                <ListItem key={index}>
                  <ProductInCartBox orderDetail={item} remove={props.remove} />
                </ListItem>
              );
            })}
            <h4 style={{ textAlign: "right", marginRight: 25 + "px" }}>
              ราคาสุทธิ ฿ {totalPrice.toFixed(2)}
            </h4>
            <div className="text-right pr-20">
              {props.listProduct.length > 0 && (
                <button
                  className="AddButton"
                  style={{ padding: "5px 30px" }}
                  onClick={handleCheckOut}
                >
                  สั่งซื้อ
                </button>
              )}
              <button
                className="delFromCart  ml-5"
                style={{ padding: "5px 30px" }}
                onClick={props.onHandleCart(false)}
              >
                ปิด
              </button>{" "}
            </div>
          </List>
        </Drawer>
      </Hidden>
    </>
  );
};

export default Cart;
