import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

const RegisterForm = (props) => {
  const [data, setData] = useState({
    userName: "",
    fullName: "",
    address: "",
    tel: "",
    password: "",
    role: "ROLE_USER",
    status: "active",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.userData) {
      setData(props.userData);
    }
  }, [props]);

  const onChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  const onConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const onSubmit = () => {
    const invalid = validate(data);
    if (invalid !== "err") {
      if (props.editMode) {
        props.submit(data);
      } else {
        props.submit(data);
      }
    }
  };

  const validate = (e) => {
    const errors = {};
    if (
      !e.userName ||
      e.userName.length <= 5 ||
      !e.userName.match(/^[a-z0-9]/) ||
      !e.userName.match(/^[a-z]/)
    ) {
      errors.userName = true;
    }
    if (
      !e.password ||
      (e.password.length <= 5 && !props.editMode) ||
      (!e.password.match(/[a-z]/) && !props.editMode) ||
      (!e.password.match(/[A-Z]/) && !props.editMode) ||
      (!e.password.match(/[0-9]/) && !props.editMode)
    ) {
      errors.password = true;
    }
    if (!e.fullName || e.fullName.length <= 3) {
      errors.fullName = true;
    }
    if (!e.address || e.address.length < 10) {
      errors.address = true;
    }

    if (!e.tel || e.tel.length !== 10 || /\D/.test(e.tel)) {
      errors.tel = true;
    }
    if (
      (!confirmPassword && !props.editMode) ||
      (confirmPassword !== e.password && !props.editMode)
    ) {
      errors.confirmPassword = true;
    }
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  return (
    <div
      className={!props.editMode ? "center" : null}
      style={{
        maxWidth: "680px",
        width: "100%",
        height: "auto",
        backgroundColor: "white",
        borderRadius: "0 0 10px 10px",
        marginBottom: "30px",
      }}
    >
      {props.editMode && (
        <div className="headerRegister">
          <h3>แก้ไขข้อมูลส่วนตัว</h3>
        </div>
      )}
      {props.adminMode && (
        <div style={{ marginBottom: "-40px" }}>
          <h3>กำลังเพิ่มบัญชีใหม่</h3>
        </div>
      )}

      <Grid container>
        <Grid item xs={12} style={{ padding: 40 + "px" }}>
          <p className="redb">{props.regisErr}</p>
          <form>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={6}>
                {props.editMode ? (
                  <TextField
                    fullWidth
                    disabled
                    required
                    type="text"
                    inputProps={{
                      minLength: 6,
                      maxLength: 25,
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
                    id="userName"
                    name="userName"
                    label="Username"
                    value={data.userName}
                    helperText="คุณไม่สามารถเปลี่ยน username"
                  />
                ) : (
                  <TextField
                    fullWidth
                    required
                    error={errors.userName}
                    type="text"
                    inputProps={{
                      minLength: 6,
                      maxLength: 25,
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
                    id="userName"
                    name="userName"
                    label="username"
                    helperText="ตัวอักษรพิมพ์เล็ก มีตัวเลขได้ ยาว 6 - 25 ตัวอักษร"
                    onChange={onChange}
                    value={data.userName}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  error={errors.fullName}
                  type="text"
                  inputProps={{
                    minLength: 2,
                    maxLength: 80,
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
                  id="fullName"
                  name="fullName"
                  label="full name"
                  helperText="กรอกชื่อจริงของคุณ ไม่เกิน 80 ตัว"
                  onChange={onChange}
                  value={data.fullName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  required
                  error={errors.address}
                  type="textarea"
                  inputProps={{
                    minLength: 5,
                    maxLength: 150,
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
                  id="address"
                  name="address"
                  label="address"
                  onChange={onChange}
                  helperText="ที่อยู่ของคุณ 10 - 150 ตัว"
                  value={data.address}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="text"
                  error={errors.tel}
                  inputProps={{
                    minLength: 10,
                    maxLength: 10,
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
                  id="tel"
                  name="tel"
                  label="telephone"
                  helperText="ตัวเลข 10 ตัว"
                  onChange={onChange}
                  value={data.tel}
                />
              </Grid>

              {!props.editMode && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    error={errors.password}
                    type="password"
                    inputProps={{
                      minLength: 6,
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
                    id="password"
                    name="password"
                    label="password"
                    helperText="ตัวอักษรพิมพ์ใหญ่ พิมพ์เล็ก และตัวเลข 6 - 20 ตัว"
                    onChange={onChange}
                    value={data.password}
                  />
                </Grid>
              )}
              {!props.editMode && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    required
                    error={errors.confirmPassword}
                    type="password"
                    inputProps={{
                      minLength: 6,
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
                    id="confirmPassword"
                    name="confirmPassword"
                    label="confirm password"
                    helperText="ยืนยันรหัสผ่านของคุณอีกครั้ง"
                    onChange={onConfirmPassword}
                    value={confirmPassword}
                  />
                </Grid>
              )}

              {props.adminMode && (
                <Grid item xs={12}>
                  <FormControl>
                    <InputLabel id="select-label-role">Role</InputLabel>
                    <Select
                      labelId="select-label-role"
                      name="role"
                      value={data.role}
                      label="role"
                      onChange={onChange}
                    >
                      <MenuItem value={"ROLE_USER"}>user</MenuItem>
                      <MenuItem value={"ROLE_SELLER"}>seller</MenuItem>
                      <MenuItem value={"ROLE_ADMIN"}>admin</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}

              <Grid item xs={12} align="center">
                <Button
                  fullWidth
                  style={{
                    marginTop: "15px",
                    alignItems: "center",
                    backgroundColor: "#1895f5",
                    color: "white",
                    fontFamily: "Prompt, sans-serif",
                    width: "45%",
                  }}
                  onClick={onSubmit}
                >
                  ยืนยันข้อมูล
                </Button>

                {props.editMode && (
                  <Button
                    fullWidth
                    style={{
                      marginLeft: "5px",
                      marginTop: "15px",
                      alignItems: "center",
                      backgroundColor: "#d83c2d",
                      color: "white",
                      fontFamily: "Prompt, sans-serif",
                      width: "45%",
                    }}
                    onClick={() => {
                      props.onIsEdit();
                    }}
                  >
                    ยกเลิก
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

RegisterForm.propTypes = {
  submit: PropTypes.func.isRequired,
  editMode: PropTypes.bool,
  userData: PropTypes.shape({
    id: PropTypes.number,
    userName: PropTypes.string.isRequired,
    password: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    tel: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};

export default RegisterForm;
