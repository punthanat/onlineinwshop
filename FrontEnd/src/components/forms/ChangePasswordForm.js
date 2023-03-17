import { Grid, TextField } from "@material-ui/core";
import axios from "axios";

import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { addResDialog } from "../../actions/uiStyle";
import { getUser } from "../../actions/user";

const ChangePasswordForm = ({ addResDialog, getUser, userInfo }) => {
  const history = useHistory();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [responseError, setResponseError] = useState("");
  const handleCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const validate = () => {
    const errs = {};

    if (!currentPassword) {
      errs.currentPassword = true;
    }

    if (
      !newPassword ||
      newPassword.length <= 5 ||
      !newPassword.match(/[A-Z]/) ||
      !newPassword.match(/[a-z]/) ||
      !newPassword.match(/[0-9]/)
    ) {
      errs.newPassword = true;
    }

    if (!confirmNewPassword || newPassword !== confirmNewPassword) {
      errs.confirmNewPassword = true;
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return "err";
    }
  };

  const submit = () => {
    const invalid = validate();
    if (invalid !== "err") {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/user/changepassword?oldPassword=${currentPassword}&newPassword=${newPassword}`
        )
        .then((res) => {
          const data = {
            status: res.status,
            dialogContent: "เปลี่ยนรหัสผ่านสำเร็จ",
          };
          addResDialog(data);
          getUser();
          history.push("/profile/info");
        })
        .catch(() => {
          setResponseError(
            "รหัสผ่านปัจจุบันไม่ถูกต้อง โปรดลองอีกครั้ง หรือติดต่อผู้ดูแลระบบ"
          );
        });
    }
  };

  return (
    <div
      className="w100 mt-20"
      style={{
        backgroundColor: "white",
        maxWidth: 680 + "px",
        borderRadius: 20 + "px",
        boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
      }}
    >
      <div className="headerRegister">
        <h3 className="mb-15">เปลี่ยนรหัสผ่าน</h3>
      </div>
      <div className="redb pt-20 pl-20"> {responseError}</div>
      <Grid
        container
        style={{ padding: 20 + "px", paddingBottom: 50 + "px" }}
        spacing={2}
      >
        <Grid item xs={12} style={{ paddingTop: 30 + "px" }}>
          <TextField
            size="small"
            fullWidth
            required
            type="password"
            error={errors.currentPassword}
            inputProps={{
              minLength: 3,
              maxLength: 20,
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            id="currentPassword"
            name="currentPassword"
            label="รหัสผ่านปัจจุบัน"
            onChange={handleCurrentPassword}
            style={{ fontFamily: "Prompt, sans-serif" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} className="pt-20">
          <TextField
            size="small"
            required
            fullWidth
            type="password"
            error={errors.newPassword}
            inputProps={{
              minLength: 3,
              maxLength: 20,
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            id="newPassword"
            name="newPassword"
            label="รหัสผ่านใหม่"
            helperText="ตัวอักษรพิมพ์ใหญ่ พิมพ์เล็ก และตัวเลข 6 - 20 ตัว"
            onChange={handleNewPassword}
            style={{ fontFamily: "Prompt, sans-serif" }}
          />
        </Grid>

        <Grid item xs={12} sm={6} className="pt-20">
          <TextField
            size="small"
            required
            fullWidth
            type="password"
            error={errors.confirmNewPassword}
            inputProps={{
              minLength: 3,
              maxLength: 20,
              style: {
                fontFamily: "Prompt, sans-serif",
              },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="ยืนยันรหัสผ่านใหม่"
            onChange={handleConfirmNewPassword}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                submit();
              }
            }}
          />
        </Grid>

        <Grid item xs={12} className="pt-20 text-center">
          <button
            className="AddButton"
            onClick={submit}
            style={{
              marginTop: 60 + "px",
              paddingRight: 35 + "px",
              paddingLeft: 35 + "px",
            }}
          >
            ยืนยันการเปลี่ยนรหัสผ่าน
          </button>
        </Grid>
      </Grid>
    </div>
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
    getUser: () => dispatch(getUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm);
