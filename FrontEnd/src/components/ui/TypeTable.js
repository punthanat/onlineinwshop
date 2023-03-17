import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import ConfirmDialog from "./ConfirmDialog";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const TypeTable = ({ addResDialog }) => {
  const [type, setType] = useState([]);
  const [addType, setAddType] = useState(false);
  const [typeToAdd, setTypeToAdd] = useState("");
  const [typePage, setTypePage] = useState(0);
  const [rowsPerTypePage, setRowsPerTypePage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [typeEdit, setTypeEdit] = useState({});
  const [typeWillDelete, setTypeWillDelete] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const [errors, setErrors] = useState(false);
  const getType = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/types`)
      .then((res) => setType(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog]);

  useEffect(() => {
    getType();
  }, [getType]);

  const delType = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/deletetype/${typeWillDelete.typeId}`
      )

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "ลบ type สำเร็จ",
        };
        addResDialog(data);
      })
      .then(() => getType())

      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm)
      .then(setTypeWillDelete({}));
  };

  const handleType = (e) => {
    setTypeToAdd(e.target.value);
  };

  const handleEditType = (e) => {
    setTypeEdit({ ...typeEdit, name: e.target.value });
  };

  const editType = (type) => {
    setIsEdit(true);
    setTypeEdit(type);
  };
  const submitType = () => {
    if (String(typeToAdd.length) <= 1) {
      setErrors(true);
      return;
    }
    const json = JSON.stringify({ name: typeToAdd });

    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/addtype`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `เพิ่ม type ${res.data.name} สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => getType())
      .then(setTypeToAdd(""))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const submitEdit = () => {
    const json = JSON.stringify({
      typeId: typeEdit.typeId,
      name: typeEdit.name,
    });

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/admin/edittype/${typeEdit.typeId}`,
        json,
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      )

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `แก้ไข type สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => getType())
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const handleChangeTypePage = (e, newPage) => {
    setTypePage(newPage);
  };

  const handleChangeRowsPerTypePage = (event) => {
    setRowsPerTypePage(parseInt(event.target.value, 10));
    setTypePage(0);
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const deletingType = (tp) => {
    setTypeWillDelete(tp);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะลบ ${tp.name} ไหม`,
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={delType}
      />
      <div className="b f20 pl-35">
        {" "}
        ประเภทของสินค้าในระบบ{" "}
        {!isEdit ? (
          <button
            className="AddButton mr-30 p-5-10"
            style={{ float: "right" }}
            onClick={() => {
              setAddType(!addType);
              setErrors(false);
            }}
          >
            เพิ่ม Type +
          </button>
        ) : (
          <button
            className="disabledButton mr-30 p-5-10"
            style={{ float: "right" }}
          >
            เพิ่ม Type +
          </button>
        )}
      </div>
      {addType && (
        <div
          style={{
            borderRadius: 5 + "px",
            borderStyle: "solid",
            borderWidth: 1 + "px",
            padding: 10 + "px",
            borderColor: "#545454",
            width: 90 + "%",
            marginTop: 10 + "px",
            marginBottom: 10 + "px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="f16 b pb-20">กำลังเพิ่ม type ใหม่</div>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleType}
            label="type name"
            error={errors}
            value={typeToAdd}
            helperText="กรอกชื่อประเภท ความยาว 1 - 45 ตัวอักษร"
            inputProps={{
              minLength: 1,
              maxLength: 45,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
          />{" "}
          <button
            className="delFromCart ml-5"
            style={{ float: "right" }}
            onClick={() => {
              setAddType(!addType);
              setErrors(false);
            }}
          >
            ยกเลิก
          </button>
          <button
            className="InfoButton"
            style={{ float: "right" }}
            onClick={submitType}
          >
            เพิ่ม type
          </button>
        </div>
      )}

      {isEdit && (
        <div
          style={{
            borderRadius: 5 + "px",
            borderStyle: "solid",
            borderWidth: 1 + "px",
            padding: 10 + "px",
            borderColor: "#545454",
            width: 90 + "%",
            marginTop: 10 + "px",
            marginBottom: 10 + "px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <div className="f16 b pb-20">
            กำลังแก้ไข type หมายเลข {typeEdit.typeId}
          </div>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleEditType}
            label="ชื่อประเภท"
            value={typeEdit.name}
            inputProps={{
              minLength: 1,
              maxLength: 45,
              style: { fontFamily: "Prompt, sans-serif", fontWeight: "600" },
            }}
            InputLabelProps={{
              style: {
                fontFamily: "Prompt, sans-serif",
                fontWeight: "600",
              },
            }}
          />{" "}
          <button
            className="delFromCart p-5-10 ml-5"
            style={{ float: "right" }}
            onClick={() => {
              setIsEdit(false);
            }}
          >
            ยกเลิก
          </button>
          <button
            className="InfoButton p-5-10"
            style={{ float: "right" }}
            onClick={submitEdit}
          >
            ยืนยัน
          </button>
        </div>
      )}

      <Table style={{ width: 90 + "%", margin: "auto" }}>
        <TableHead style={{ backgroundColor: "#1895f5" }}>
          <TableRow>
            <TableCell style={{ color: "white" }} align="right">
              ID
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              ชื่อประเภท
            </TableCell>
            <TableCell style={{ color: "white" }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsPerTypePage > 0 ? (
            type
              .slice(
                typePage * rowsPerTypePage,
                typePage * rowsPerTypePage + rowsPerTypePage
              )
              .map((type) => {
                return (
                  <TableRow key={type.typeId}>
                    <TableCell align="right">{type.typeId}</TableCell>
                    <TableCell align="right">{type.name}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        {isEdit || addType ? (
                          <>
                            {" "}
                            <span>
                              <EditOutlinedIcon
                                className="m-5"
                                style={{ color: "#333435", opacity: "0.6" }}
                              />
                            </span>
                            <span>
                              <DeleteOutlineIcon
                                className="m-5"
                                style={{ color: "#333435", opacity: "0.6" }}
                              />
                            </span>
                          </>
                        ) : (
                          <>
                            {" "}
                            <span onClick={() => editType(type)}>
                              <EditOutlinedIcon className="hoverChangeToNavBarColor m-5" />
                            </span>
                            <span onClick={() => deletingType(type)}>
                              <DeleteOutlineIcon className="hoverChangeToNavBarColor m-5" />
                            </span>{" "}
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
          ) : (
            <TableRow>
              {" "}
              <TableCell />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10]}
              onRowsPerPageChange={handleChangeRowsPerTypePage}
              onPageChange={handleChangeTypePage}
              count={type.length}
              page={typePage}
              rowsPerPage={rowsPerTypePage}
            ></TablePagination>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(null, mapDispatchToProps)(TypeTable);
