import { Container, Grid, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import CloseIcon from "@material-ui/icons/Close";
import "../../../css/signinModal.css";
const GuestUserPage = (props) => {
  const [formShow, setFormShow] = useState("login");
  useEffect(() => {
    if (props.open) {
      window.scrollTo(0, 0);
    }
  }, [props]);

  const closeModal = () => {
    props.close();
    setFormShow("login");
  };
  return (
    <Modal
      open={props.open}
      onClose={closeModal}
      style={{ overflow: "scroll" }}
    >
      <Container className="guestModal">
        <Grid container justifyContent="center" justifyitems="center">
          <Grid item xs={12}>
            {" "}
            <div className="guestContainer">
              {" "}
              <div style={{ textAlign: "right" }}>
                <CloseIcon className="guestCloseButton" onClick={closeModal} />
              </div>
              <div className="guestModalHeader">
                <div
                  onClick={() => setFormShow("login")}
                  className={
                    formShow === "login"
                      ? "guestModalClick"
                      : "guestModalNotClick"
                  }
                  style={{
                    marginRight: "0",
                  }}
                >
                  เข้าสู่ระบบ
                </div>
                <div
                  onClick={() => setFormShow("register")}
                  className={
                    formShow === "register"
                      ? "guestModalClick"
                      : "guestModalNotClick"
                  }
                  style={{
                    marginLeft: "0",
                  }}
                >
                  สมัครสมาชิก
                </div>
              </div>{" "}
            </div>
          </Grid>
          <Grid item xs={12}>
            <div>
              {formShow === "login" && <LoginPage closeModal={closeModal} />}
              {formShow === "register" && (
                <RegisterPage closeModal={closeModal} />
              )}
            </div>
          </Grid>
        </Grid>
      </Container>
    </Modal>
  );
};

export default GuestUserPage;
