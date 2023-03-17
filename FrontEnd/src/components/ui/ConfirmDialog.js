import { Dialog, TextField } from "@material-ui/core";
import React, { useState } from "react";
import "../../css/confirmDialog.css";
import squidgirl from "../../images/asset/squidgirl.png";
const ConfirmDialog = (props) => {
  const [critConfirmInput, setCritConfirmInput] = useState("");
  const [error, setError] = useState(false);
  const onChange = (e) => {
    setCritConfirmInput(e.target.value);
  };
  const confirmCondition = () => {
    if (props.confirmInfo.criticalConfirm) {
      if (critConfirmInput.toLowerCase() !== "confirm") {
        setError(true);
        return;
      } else {
        props.submit();
      }
    } else {
      props.submit();
    }
  };

  const closeBox = () => {
    props.handleCloseBox();
    setError(false);
  };

  return (
    <Dialog
      open={props.confirmInfo.showConfirm}
      onClose={closeBox}
      fullWidth
      maxWidth="sm"
    >
      <div className="p-30 pt-35">
        <div className="confirmHead pb-20">
          {props.confirmInfo.confirmContent}
        </div>
        {props.confirmInfo.warning && (
          <div className="redb pb-20">{props.confirmInfo.warning}</div>
        )}

        <div
          style={{
            textAlign: "center",
          }}
        >
          <img
            src={squidgirl}
            alt="squidgirl"
            style={{
              maxWidth: "250px",
              width: "100%",
            }}
          />
        </div>
        {props.confirmInfo.criticalConfirm && (
          <div className="text-center pb-20">
            <div className="b pb-5">กรอกคำว่า confirm เพื่อทำการยืนยัน</div>
            <TextField
              size="small"
              fullWidth
              variant="outlined"
              onChange={onChange}
              error={error}
              label="ข้อความยืนยัน"
              value={critConfirmInput}
              inputProps={{
                minLength: 7,
                maxLength: 7,
                style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Prompt, sans-serif",
                  fontWeight: "600",
                },
              }}
            />
            {error && <div className="redb text-left">กรุณากรอกคำว่า confirm ในช่อง</div>}
          </div>
        )}
        <div className="dialogButtonZone w100">
          <button className="AddButton mr-10 w50 " onClick={confirmCondition}>
            <div className="f16"> ยืนยัน</div>
          </button>

          <button className="delFromCart mr-10 w50" onClick={closeBox}>
            {" "}
            <div className="f16"> ยกเลิก</div>{" "}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
