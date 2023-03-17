import React, { useState } from "react";
import RegisterForm from "../../forms/RegisterForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { connect } from "react-redux";
import axios from "axios";
import { addResDialog } from "../../../actions/uiStyle";
import { getUser } from "../../../actions/user";
import "../../../css/Info.css";

const InfoPage = ({ userInfo, addResDialog, getUser }) => {
  const [isEdit, setIsEdit] = useState(false);

  const submit = (data) => {
    axios
      .put(`${process.env.REACT_APP_API_URL}/user/edituser`, data)
      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "แก้ไขข้อมูลสำเร็จ",
        };
        addResDialog(data);
        getUser();
      })
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: "Error",
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  return (
    <div>
      {isEdit ? (
        <RegisterForm
          userData={userInfo}
          editMode={true}
          submit={submit}
          onIsEdit={() => setIsEdit(false)}
        ></RegisterForm>
      ) : (
        <div className="profileBox">
          <div className="headerProfileBox">
            <div>ข้อมูลส่วนตัว</div>
            <div style={{ fontWeight: 500 }}>
              ข้อมูลพื้นฐาน เช่น ชื่อ เบอร์โทร
            </div>
          </div>
          <div className="profileContent">
            <div>
              <label>
                ชื่อบัญชี : <span>{userInfo.userName}</span>
              </label>
            </div>
            <div>
              <label>
                ชื่อ : <span>{userInfo.fullName}</span>
              </label>
            </div>
            <div>
              <label>
                ที่อยู่ : <span>{userInfo.address}</span>
              </label>
            </div>
            <div>
              <label>
                เบอร์โทร : <span>{userInfo.tel}</span>
              </label>
            </div>
          </div>
          <div className="editBox" onClick={() => setIsEdit(true)}>
            <label>
              <span>
                <EditOutlinedIcon />
              </span>{" "}
              <span>แก้ไขข้อมูลส่วนตัว</span>
            </label>{" "}
          </div>
        </div>
      )}
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoPage);
