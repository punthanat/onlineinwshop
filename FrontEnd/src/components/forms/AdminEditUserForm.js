import { Grid, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ConfirmDialog from "../ui/ConfirmDialog";

const AdminEditUserForm = (props) => {
  const [userData, setUserData] = useState({
    userName: "",
    fullName: "",
    address: "",
    tel: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmEdit = () => {
    const invalid = validate(userData);
    if (invalid !== "err") {
      setConfirmBox({
        showConfirm: true,
        confirmContent: `ยืนยันที่จะแก้ไขข้อมูลของ ${userData.userName} ไหม`,
      });
    }
  };

  useEffect(() => {
    if (props) {
      setUserData(props.userData);
    }
  }, [props]);

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  const onChangePassword = (e) => {
    setIsChangePassword(true);
    setUserData({ ...userData, password: e.target.value });
  };

  const validate = (e) => {
    const err = {};
    if (
      !e.userName ||
      e.userName.length <= 5 ||
      !e.userName.match(/^[a-z0-9]/)
    ) {
      err.userName = true;
    }
    if (
      !e.password ||
      e.password.length <= 4 ||
      (isChangePassword && !e.password.match(/^[A-Za-z0-9]/))
    ) {
      err.password = true;
    }
    if (!e.fullName || e.fullName.length <= 3) {
      err.name = true;
    }
    if (!e.address || e.address.length < 10) {
      err.address = true;
    }

    if (!e.tel || e.tel.length !== 10 || /\D/.test(e.tel)) {
      err.tel = true;
    }

    setErrors(err);

    if (Object.keys(err).length > 0) {
      return "err";
    }
  };

  const submitEdit = () => {
    props.submit(userData);
  };

  return (
    <div
      style={{
        borderStyle: "solid",
        borderRadius: "10px",
        padding: "30px",

        borderColor: "#e6e8eb",
        width: "80%",
        margin: "30px auto",
      }}
    >
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={submitEdit}
      />
      <h3>
        กำลังแก้ไขข้อมูลของ :{" "}
        <span className="baseColor3">{userData.userName}</span>
      </h3>
      <Grid container>
        {" "}
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            disabled
            fullWidth
            value={userData.userName}
            inputProps={{
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            name="userName"
            label="userName"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="text"
            fullWidth
            inputProps={{
              minLength: 2,
              maxLength: 80,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            value={userData.fullName}
            error={errors.fullName}
            onChange={onChange}
            name="fullName"
            label="fullName"
          />
        </Grid>
        <Grid item xs={12} className="p-10">
          <TextField
            type="text"
            fullWidth
            inputProps={{
              minLength: 5,
              maxLength: 150,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            value={userData.address}
            error={errors.address}
            onChange={onChange}
            name="address"
            label="address"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="password"
            fullWidth
            inputProps={{
              minLength: 3,
              maxLength: isChangePassword ? 20 : 90,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            value={userData.password}
            error={errors.password}
            onChange={onChangePassword}
            name="password"
            label="password"
          />
        </Grid>
        <Grid item xs={12} sm={6} className="p-10">
          <TextField
            type="text"
            fullWidth
            inputProps={{
              minLength: 10,
              maxLength: 10,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
            onChange={onChange}
            value={userData.tel}
            name="tel"
            label="tel"
          />
        </Grid>
        <Grid item xs={12} className="p-10 mw-100 w-100">
          <button
            className="InfoButton m-5 "
            style={{ width: "45%" }}
            onClick={openConfirmEdit}
          >
            ยืนยันการแก้ไข
          </button>
          <button
            className="delFromCart m-5"
            style={{ width: "45%" }}
            onClick={props.onIsEdit}
          >
            ยกเลิก
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminEditUserForm;
