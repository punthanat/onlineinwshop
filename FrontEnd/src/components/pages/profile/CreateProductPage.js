import CreateProductForm from "../../forms/CreateProductForm";
import { addResDialog } from "../../../actions/uiStyle";
import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import ConfirmDialog from "../../ui/ConfirmDialog";

const CreateProductPage = ({ addResDialog, userInfo }) => {
  const [productData, setProductData] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const [clearForm, setClearForm] = useState(false);
  const submit = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/seller/products/add`,
        productData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "ลงขายสำเร็จ!",
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm())
      .then(setClearForm(true))
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

  const openConfirmBox = (data) => {
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่ลงขายสินค้าไหม?`,
      warning: "***หากคุณยืนยันการลงขาย สินค้าจะถูกลงขายทันที",
    });
    setProductData(data);
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={submit}
      />

      <CreateProductForm
        submit={openConfirmBox}
        user={userInfo}
        clearForm={clearForm}
        alreadyClear={() => {
          setClearForm(false);
        }}
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProductPage);
