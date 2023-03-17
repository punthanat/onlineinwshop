import { Grid, Hidden } from "@material-ui/core";
import React, { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { addToCart } from "../../actions/cart";
import { connect } from "react-redux";
import "../../css/addProductModal.css";
import { addResDialog } from "../../actions/uiStyle";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

const AddProductModal = (
  props,
  { addToCart, addResDialog, productCounter }
) => {
  const [colorChoose, setColorChoose] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [noColor, setNoColor] = useState(false);
  const [noQuantity, setNoQuantity] = useState(false);
  const prodToAdd = props.productCounter.filter((obj) => {
    return obj.productId === props.product.productId;
  });
  const minusQuantity = () => {
    if (quantity > 1) {
      let currentQuantity = quantity - 1;
      setQuantity(currentQuantity);
    }
  };

  const plusQuantity = () => {
    if (
      (prodToAdd.length === 0 && quantity < props.product.quantity) ||
      (prodToAdd[0] !== undefined &&
        quantity < props.product.quantity - prodToAdd[0].quantity)
    ) {
      setNoQuantity(false);
      if (String(quantity).length < 1) {
        setQuantity(1);
      } else {
        let currentQuantity = parseInt(quantity) + 1;
        setQuantity(currentQuantity);
      }
    }
  };

  const chooseColor = (e) => {
    setColorChoose(0);
    let color = e.target.value;
    setColorChoose(color);
    setNoColor(false);
  };

  const AddToCart = () => {
    if (colorChoose === 0) {
      setNoColor(true);
    } else {
      var productToCart = Object.assign({}, props.product);
      var intColor = parseInt(colorChoose);
      var colorObj = props.product.color.find((c) => c.colorId === intColor);
      let qty = parseInt(quantity);
      if (qty < 1 || String(quantity).length < 1) {
        setNoQuantity(true);
        return;
      }
      var orderDetails = {
        quantity: qty,
        totalPrice: productToCart.price * quantity,
        color: colorObj,
        product: productToCart,
      };
      const data = {
        status: 200,
        dialogContent: `เพิ่ม ${
          props.product.name.length > 25
            ? props.product.name.slice(0, props.product.name.length - 20) +
              `...`
            : props.product.name
        } ลงตะกร้า`,
      };
      props.addResDialog(data);

      props.addToCart(orderDetails);
      setNoColor(false);
      setColorChoose(0);
      setQuantity(1);
      props.close();
    }
  };

  const changeQuantity = (e) => {
    setNoQuantity(false);
    if (/[^0-9]/.test(e.target.value)) {
      return quantity;
    }

    if (
      prodToAdd[0] !== undefined &&
      e.target.value > props.product.quantity - prodToAdd[0].quantity
    ) {
      setQuantity(props.product.quantity - prodToAdd[0].quantity);
       return;
    }
    if (prodToAdd[0] === undefined && e.target.value > props.product.quantity) {
      setQuantity(props.product.quantity);
       return;
    } else {
      setQuantity(e.target.value);
       return;
    }
  };

  const productColor = props.product.color.map((color, i) => {
    return (
      <React.Fragment key={`colorInCard${color.colorId}`}>
        <input
          type="radio"
          id={color.colorName}
          name="color"
          value={`${color.colorId}`}
          onClick={chooseColor}
        />
        <label htmlFor={color.colorName}>{color.colorName}</label>
      </React.Fragment>
    );
  });

  return (
    <div className="modal">
      <div className="productModalContent">
        <div
          className="text-right w95 pt-10 baseColor2"
          style={{
            position: "relative",
            marginBottom: "-20px",
          }}
        >
          <CloseIcon className="hoverCursor" onClick={props.close} />
        </div>
        <Grid
          container
          justifyitems="center"
          alignItems="center"
          className="pt-20 pl-20"
        >
          <Grid item xs={12} sm={12} md={6} className="text-center">
            <img
              src={`${process.env.REACT_APP_API_URL}/getImage/${props.product.imageName}`}
              alt={`${props.product.imageName}`}
              style={{
                borderRadius: "10px 10px 10px 10px",
                width: "290px",
                maxHeight: "375px",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className="productNameInModal  ">{props.product.name}</div>
            <div className="f13 pt-10 normalFont">
              วันวางจำหน่าย {props.product.saleDate}
            </div>

            <div className="f13 normalFont pt-5">
              ขายโดย {props.product.user.userName} | มีสินค้า{" "}
              {props.product.quantity} ชิ้น
            </div>

            <div className="radioGroup w100 text-left pt-30 pb-30">
              <div className="b"> เลือกสีที่ต้องการ </div>
              {productColor}
            </div>
            <div className="b -mb-10 baseColor f24">฿{props.product.price}</div>
            <div className="plusMinus baseColor2">
              <h4>จำนวนที่ต้องการ</h4>
              <div className="plusMinusQuantity" style={{ width: "100px" }}>
                <button
                  className="minusButton pr-5 hoverCursor"
                  style={{ border: "none", background: "none" }}
                  onClick={minusQuantity}
                >
                  -
                </button>
                <div className="currentQuantity pr-5">
                  <input
                    value={quantity}
                    style={{
                      border: "none",
                      background: "none",
                      width: "60px",
                      textAlign: "center",
                      fontFamily: "Prompt, sans-serif",
                      fontWeight: "600",
                      fontSize: "16px",
                    }}
                    maxLength="10"
                    onChange={changeQuantity}
                  />
                </div>
                <button
                  className="plusButton hoverCursor"
                  style={{ border: "none", background: "none" }}
                  onClick={plusQuantity}
                >
                  +
                </button>
              </div>
              {noColor && (
                <h5 className="mt-5 baseColor3">กรุณาเลือกสีที่ต้องการ!</h5>
              )}
            </div>
            {noQuantity && (
              <h5 className="redb mb-10">กรุณาเพิ่มจำนวนสินค้า</h5>
            )}
            <div
              className="w90"
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              {prodToAdd.length === 0 ||
              (prodToAdd[0] !== undefined &&
                prodToAdd[0].quantity < props.product.quantity) ? (
                <button
                  className="AddButton mlr-5 w40  flex-center"
                  onClick={AddToCart}
                >
                  <Hidden smDown>
                    {" "}
                    <ShoppingCartOutlinedIcon className="mr-10" />
                  </Hidden>{" "}
                  เพิ่ม - ฿{(props.product.price * quantity).toFixed(2)}
                </button>
              ) : (
                <button className="disabledButton mlr-5 w40 flex-center">
                  <ErrorOutlineOutlinedIcon className="mr-10" />{" "}
                  <div> สินค้าเกินจำนวนที่มี</div>
                </button>
              )}
              <button className="delFromCart mlr-5 w40" onClick={props.close}>
                ยกเลิก
              </button>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productCounter: state.cart.productCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch(addToCart(product)),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductModal);
