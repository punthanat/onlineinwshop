import React, { useState } from "react";
import RegisterForm from "../../forms/RegisterForm";
import axios from "axios";
import { addResDialog } from "../../../actions/uiStyle";
import { connect } from "react-redux";
import { login, getUser } from "../../../actions/user";

const RegisterPage = (props, { addResDialog, login, getUser }) => {
  const [regisErr, setRegisErr] = useState("");

  const submit = (data) => {
    const json = JSON.stringify(data);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
      .then(async () => {
        let credential = {
          username: data.userName,
          password: data.password,
        };
        const loggedIn = await props.login(credential);
        if (loggedIn === 200) {
          const data = {
            status: 200,
            dialogContent: "คุณเข้าสู่ระบบแล้ว",
          };
          props.closeModal();
          props.addResDialog(data);
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          setRegisErr(err.response.data.message);
        } else {
          setRegisErr(err.message);
        }
      });
  };

  return (
    <>
      <RegisterForm submit={submit} regisErr={regisErr} />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
    login: (content) => dispatch(login(content)),
    getUser: () => dispatch(getUser()),
  };
};

export default connect(null, mapDispatchToProps)(RegisterPage);
