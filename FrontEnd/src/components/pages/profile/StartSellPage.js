import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { addResDialog } from "../../../actions/uiStyle";
import { getUser } from "../../../actions/user";
import ConfirmDialog from "../../ui/ConfirmDialog";
import squidgirl from "../../../images/asset/squidgirl.png";

const StartSellPage = (props, { addResDialog, getUser }) => {
  const history = useHistory();
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const startSell = () => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/promotTo?role=seller`)
      .then((res) => {
        const resData = {
          status: res.status,
          dialogContent: "ยินดีด้วยคุณได้เป็นผู้ขายแล้ว",
        };
        props.addResDialog(resData);
      })
      .then(() => {
        props.getUser();
        handleCloseConfirm();
      })
      .then(() => {
        history.push("/profile/myshop");
      })
      .catch((err) => {
        const resData = {
          status: "Error",
          dialogContent: err.message,
        };
        props.addResDialog(resData);
      });
  };
  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmBox = (data) => {
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันการสมัครเป็นผู้ขายกับเรา?`,
      warning: "***เมื่อคุณยืนยันการสมัครคุณจะสามารถลงขายสินค้าได้ทันที",
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={startSell}
      />
      <div className="profileBox">
        <div className="f20 b">
          ปลดล็อคสิทธิ์การเป็นผู้ขาย เพื่อขายสินค้ากับเรา
        </div>
        <div
          className="AddButton mt-20 text-center"
          style={{ width: "40%" }}
          onClick={openConfirmBox}
        >
          เริ่มเป็นผู้ขาย
        </div>

        <div className="text-center">
          <img
            src={squidgirl}
            style={{ maxWidth: "300px", width: "100%", opacity: "0.85" }}
            alt="bluehairgirl"
          />
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
    getUser: () => dispatch(getUser()),
  };
};

export default connect(null, mapDispatchToProps)(StartSellPage);
