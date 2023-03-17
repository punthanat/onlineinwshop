import React, { useEffect, useState } from "react";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import CancelOutlined from "@material-ui/icons/CancelOutlined";
import "../../css/responseDialog.css";

const ResponseDialog = (props) => {
  const [count, setCount] = useState(false);
  useEffect(() => {
    if (props.len === 0) {
      setTimeout(() => props.handleCloseBox(props.dialog.key), 4000);
      return;
    }

    if (!count && props.len > 0) {
      setCount(true);
    }

    if (!count) {
      setTimeout(() => props.handleCloseBox(props.dialog.key), 4000);
      return;
    }
    return () => {};
  }, [props, count]);

  const switchRender = () => {
    let stat = "";
    if (props.dialog) {
      if (props.dialog.status === 200) {
        stat = "Success";
      } else {
        stat = "Error";
      }
    } else {
      stat = null;
    }
    switch (stat) {
      case "Success":
        return (
          <CheckCircleOutlineOutlinedIcon
            style={{
              color: "#7bcb34",
            }}
          />
        );
      case "Error":
        return (
          <CancelOutlined
            className="w100"
            style={{
              color: "#d83c2d",
            }}
          />
        );
      default:
        return <CancelOutlined className="w100" style={{}} />;
    }
  };

  return (
    <span>
      <div className="responseDialog rightResDialog">
        <div className="text-center">{switchRender()}</div>
        <div>
          {props.dialog && (
            <h3 style={{ padding: "0 0 0 10px" }} className="f14 b">
              {props.dialog.dialogContent}
            </h3>
          )}
        </div>
        <div onClick={() => props.handleCloseBox(props.index)}>
          <CancelOutlined className="hoverCloseDialog" />
        </div>
      </div>
    </span>
  );
};

export default ResponseDialog;
