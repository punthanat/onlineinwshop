import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Grid,
  Hidden,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../../actions/uiStyle";
import AdminEditUserForm from "../../forms/AdminEditUserForm";
import HandleUserRole from "../../ui/HandleUserRole";
import RegisterForm from "../../forms/RegisterForm";
import ConfirmDialog from "../../ui/ConfirmDialog";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import BuildIcon from "@material-ui/icons/Build";

const UserListPage = ({ addResDialog }) => {
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [isHandleRole, setIsHandleRole] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });

  const getUser = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/users`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const editUser = (user) => {
    setIsEdit(true);
    setUserEdit(user);
  };

  const openHandleRole = (user) => {
    setIsHandleRole(true);
    setUserEdit(user);
  };

  const updateUser = (data) => {
    const json = JSON.stringify(data);

    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/edituser`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `แก้ไขข้อมูลผู้ใช้ของ ${res.data.userName} สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => {
        getUser();
      })
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const addUser = () => {
    const json = JSON.stringify(userEdit);
    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `เพิ่มบัญชีใหม่สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => {
        getUser();
        setUserEdit({});
        setIsAdd(false);
      })
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm());
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const openConfirmAdd = (data) => {
    setUserEdit(data);
    let warning = "";
    let crit = false;
    if (data.role === "ROLE_ADMIN") {
      warning =
        "***หลังคุณยืนยันการสร้างบัญชีนี้เป็น admin คุณจะไม่สามารถแก้ไขข้อมูลของบัญชีนี้ได้";
      crit = true;
    }
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่เพิ่ม ${data.userName} เป็น ${data.role.replace(
        "ROLE_",
        ""
      )} ไหม`,
      warning: warning,
      criticalConfirm: crit,
    });
  };

  const restoreAccount = () => {
    let userRestore = Object.assign({}, userEdit);
    userRestore.status = "active";

    updateUser(userRestore);
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={addUser}
      />

      <Container maxWidth="lg" style={{ marginTop: 10 + "px" }}>
        <div
          className="p-20"
          style={{
            backgroundColor: "white",
            borderRadius: 10 + "px",
            boxShadow: "0px 0px 20px #e6e8eb",
          }}
        >
          <div
            className="f24 b text-center pt-20"
            style={{
              marginBottom: 50 + "px",
            }}
          >
            ผู้ใช้งานทั้งหมดในระบบ
          </div>
          <Grid container>
            <Grid item xs={11} style={{ margin: "auto" }}>
              {isEdit ? (
                <>
                  <AdminEditUserForm
                    userData={userEdit}
                    onIsEdit={() => {
                      setIsEdit(false);
                    }}
                    submit={updateUser}
                  />
                  <button
                    className="disabledButton"
                    style={{
                      marginLeft: "90%",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    เพิ่ม
                  </button>
                </>
              ) : (
                <>
                  {isAdd || isHandleRole ? (
                    <button
                      className="delFromCart p-5-10"
                      style={{
                        marginLeft: "90%",
                      }}
                      onClick={() => {
                        setIsAdd(false);
                        setIsHandleRole(false);
                      }}
                    >
                      ยกเลิก
                    </button>
                  ) : (
                    <button
                      className="InfoButton p-5-10"
                      style={{
                        marginLeft: "90%",
                      }}
                      onClick={() => {
                        setIsAdd(!isAdd);
                      }}
                    >
                      เพิ่มผู้ใช้
                    </button>
                  )}
                </>
              )}
              {isHandleRole && (
                <HandleUserRole
                  user={userEdit}
                  restore={restoreAccount}
                  close={() => {
                    setIsHandleRole(false);
                  }}
                  refreshUser={getUser}
                />
              )}
              {isAdd && (
                <RegisterForm submit={openConfirmAdd} adminMode={true} />
              )}

              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#1895f5" }}>
                    <TableCell style={{ color: "white" }} align="right">
                      ID
                    </TableCell>
                    <TableCell style={{ color: "white" }} align="right">
                      Username
                    </TableCell>
                    <Hidden smDown>
                      <TableCell style={{ color: "white" }} align="right">
                        Role
                      </TableCell>

                      <TableCell style={{ color: "white" }} align="right">
                        status
                      </TableCell>
                    </Hidden>
                    <TableCell
                      style={{ color: "white" }}
                      align="right"
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow key={`userNameIs${user.userName}`}>
                          <TableCell
                            align="right"
                            style={{
                              fontFamily: "Prompt, sans-serif",
                              fontWeight: "600",
                            }}
                          >
                            {user.userId}
                          </TableCell>
                          <TableCell
                            align="right"
                            style={{
                              fontFamily: "Prompt, sans-serif",
                              fontWeight: "600",
                            }}
                          >
                            {user.userName}
                          </TableCell>
                          <Hidden smDown>
                            <TableCell
                              align="right"
                              style={{
                                fontFamily: "Prompt, sans-serif",
                                fontWeight: "600",
                              }}
                            >
                              {user.role.replace("ROLE_", "").toLowerCase()}
                            </TableCell>
                          </Hidden>
                          <Hidden smDown>
                            <TableCell
                              align="right"
                              style={{
                                fontFamily: "Prompt, sans-serif",
                                fontWeight: "600",
                              }}
                            >
                              {user.status}
                            </TableCell>
                          </Hidden>
                          {user.role !== "ROLE_ADMIN" ? (
                            <TableCell
                              align="right"
                              style={{
                                fontFamily: "Prompt, sans-serif",
                                fontWeight: "600",
                              }}
                            >
                              {isEdit || isAdd || isHandleRole ? (
                                <>
                                  <button className="disabledButton hoverCursor">
                                    <EditOutlinedIcon
                                      style={{ fontSize: "16px" }}
                                    />
                                  </button>
                                  <button
                                    className="disabledButton hoverCursor ml-5"
                                    onClick={() => openHandleRole(user)}
                                  >
                                    <BuildIcon style={{ fontSize: "16px" }} />
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="AddButton  hoverCursor"
                                    onClick={() => editUser(user)}
                                  >
                                    <EditOutlinedIcon
                                      style={{ fontSize: "16px" }}
                                    />
                                  </button>
                                  <button
                                    className="delFromCart ml-5"
                                    onClick={() => openHandleRole(user)}
                                  >
                                    <BuildIcon style={{ fontSize: "16px" }} />
                                  </button>
                                </>
                              )}
                            </TableCell>
                          ) : (
                            <TableCell />
                          )}
                        </TableRow>
                      );
                    })}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      colSpan={4}
                      rowsPerPageOptions={[5, 10]}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      onPageChange={handleChangePage}
                      count={user.length}
                      page={page}
                      rowsPerPage={rowsPerPage}
                    ></TablePagination>
                  </TableRow>
                </TableFooter>
              </Table>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(UserListPage);
