import React, { useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../../actions/uiStyle";
import { login } from "../../../actions/user";

import LoginForm from "../../forms/LoginForm";

const LoginPage = (props, { login, addResDialog }) => {
  const [err, setErr] = useState("");

  const submit = async (data) => {
    const loggedIn = await props.login(data);
    if (loggedIn === 200) {
      const data = {
        status: 200,
        dialogContent: "คุณเข้าสู่ระบบแล้ว",
      };
      props.closeModal();
      props.addResDialog(data);
      props.closeModal();
    } else {
      setErr(loggedIn);
    }
  };

  return <LoginForm submit={submit} loginErr={err} />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);
