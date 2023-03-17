import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import CreateProductForm from "../../forms/CreateProductForm";
import { clearProduct } from "../../../actions/product";
import axios from "axios";
import ConfirmDialog from "../../ui/ConfirmDialog";
import { addResDialog } from "../../../actions/uiStyle";

const EditProductPage = ({ product, clearProduct, addResDialog }) => {
  const [prd, setPrd] = useState({});
  const history = useHistory();
  const [editProduct, setEditProduct] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  useEffect(() => {
    if (product.type) {
      let pro = Object.assign({}, product);
      pro.type = String(pro.type.typeId);
      let col = [];
      for (let i = 0; i < product.color.length; i++) {
        col.push(String(product.color[i].colorId));
      }
      pro.color = col;
      setPrd(pro);
    } else {
      history.push("/profile/myshop");
    }
  }, [history, product]);

  const submitEditProduct = () => {
    axios
      .put(
        `${process.env.REACT_APP_API_URL}/seller/products/put/${product.productId}`,
        editProduct,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "แก้ไขข้อมูลสินค้าสำเร็จ",
        };
        addResDialog(data);
      })
      .then(() => {
        clearProduct();
        history.push(`/product/${product.productId}`);
      })
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const receiveProduct = (data) => {
    setEditProduct(data);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะแก้ไขข้อมูลสินค้าไหม`,
    });
  };

  return (
    <>
      {" "}
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={submitEditProduct}
      />
      <CreateProductForm productToEdit={prd} submit={receiveProduct} />
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    product: state.product,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearProduct: () => dispatch(clearProduct()),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductPage);
