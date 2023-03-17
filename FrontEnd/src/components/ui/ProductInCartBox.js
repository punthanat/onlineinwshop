import React from "react";
import PropTypes from "prop-types";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const ProductInCartBox = (props) => {
  return (
    <div className="productInCart">
      <div style={{ maxWidth: "100px" }}>
        <img
          src={`${process.env.REACT_APP_API_URL}/getImage/${props.orderDetail.product.imageName}`}
          alt="productInCart"
          className="imgInCart"
        />
      </div>

      <div style={{ margin: "0 3px" }}>
        <div className="InCartTitle b text-left">
          {props.orderDetail.product.name}
        </div>

        <div className="colorQuantity">
          สี {props.orderDetail.color.colorName} / จำนวน{" "}
          {props.orderDetail.quantity} ชิ้น
        </div>
      </div>

      <div
        style={{
          maxWidth: "45px",
        }}
      >
        <h5
          style={{ marginTop: "-3px" }}
          className={
            String(props.orderDetail.totalPrice).length > 6
              ? "f12 baseColor"
              : "f16 baseColor b"
          }
        >
          ฿{props.orderDetail.totalPrice}
        </h5>
        <span
          className="deleteIcon  flex-center"
          onClick={() => props.remove(props.orderDetail)}
        >
          <div className="b">ลบ </div> <DeleteOutlineIcon />
        </span>
      </div>
    </div>
  );
};

ProductInCartBox.propTypes = {
  remove: PropTypes.func.isRequired,
};

export default ProductInCartBox;
