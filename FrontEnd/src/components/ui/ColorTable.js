import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addResDialog } from "../../actions/uiStyle";
import ConfirmDialog from "./ConfirmDialog";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

const ColorTable = ({ addResDialog }) => {
  const [color, setColor] = useState([]);
  const [addColor, setAddColor] = useState(false);
  const [colorToAdd, setColorToAdd] = useState("");
  const [colorPage, setColorPage] = useState(0);
  const [rowsPerColorPage, setRowsPerColorPage] = useState(5);
  const [isEdit, setIsEdit] = useState(false);
  const [colorEdit, setColorEdit] = useState({});
  const [colorWillDelete, setColorWillDelete] = useState({});
  const [confirmBox, setConfirmBox] = useState({
    showConfirm: false,
    confirmContent: "",
  });
  const [errors, setErrors] = useState(false);
  const getColor = useCallback(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/colors`)
      .then((res) => setColor(res.data))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.message,
        };
        addResDialog(data);
      });
  }, [addResDialog]);

  useEffect(() => {
    getColor();
  }, [getColor]);

  const editColor = (color) => {
    setIsEdit(true);
    setColorEdit(color);
  };

  const delColor = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/colordelete/${colorWillDelete.colorId}`
      )

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: "ลบสีสำเร็จ!!",
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      })
      .then(handleCloseConfirm)
      .then(setColorWillDelete({}));
  };

  const handleColor = (e) => {
    setErrors(false);
    setColorToAdd(e.target.value);
  };

  const handleColorEdit = (e) => {
    setColorEdit({ ...colorEdit, colorName: e.target.value });
  };

  const submitColor = () => {
    if (colorToAdd.length <= 1) {
      setErrors(true);
      return;
    }
    const json = JSON.stringify({ colorName: colorToAdd });
    axios
      .post(`${process.env.REACT_APP_API_URL}/admin/addcolor`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `เพิ่มสี ${res.data.colorName} สำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .then(setColorToAdd(""))
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
      colorId: colorEdit.colorId,
      colorName: colorEdit.colorName,
    });
    axios
      .put(`${process.env.REACT_APP_API_URL}/admin/editcolor`, json, {
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })

      .then((res) => {
        const data = {
          status: res.status,
          dialogContent: `แก้ไขสีสำเร็จ!!`,
        };
        addResDialog(data);
      })
      .then(() => getColor())
      .then(setIsEdit(false))
      .catch((err) => {
        const data = {
          status: err.response.status,
          dialogContent: err.response.data.message,
        };
        addResDialog(data);
      });
  };

  const handleChangeColorPage = (e, newPage) => {
    setColorPage(newPage);
  };

  const handleChangeRowsPerColorPage = (event) => {
    setRowsPerColorPage(parseInt(event.target.value, 10));
    setColorPage(0);
  };

  const handleCloseConfirm = () => {
    setConfirmBox({ showConfirm: false, confirmContent: "" });
  };

  const deletingColor = (col) => {
    setColorWillDelete(col);
    setConfirmBox({
      showConfirm: true,
      confirmContent: `ยืนยันที่จะลบสี ${col.colorName} ไหม`,
    });
  };

  return (
    <>
      <ConfirmDialog
        confirmInfo={confirmBox}
        handleCloseBox={handleCloseConfirm}
        submit={delColor}
      />

      <div className="f20 b pl-35">
        {" "}
        สีในระบบ{" "}
        {!isEdit ? (
          <>
            <button
              className="AddButton mr-30 p-5-10"
              style={{ float: "right" }}
              onClick={() => {
                setAddColor(!addColor);
                setErrors(false);
              }}
            >
              เพิ่มสีใหม่ +
            </button>
          </>
        ) : (
          <button
            className="disabledButton mr-30 p-5-10"
            style={{ float: "right" }}
          >
            เพิ่มสีใหม่ +
          </button>
        )}{" "}
      </div>
      {addColor && (
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
          <div className="f16 b pb-20">กำลังเพิ่ม color ใหม่</div>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleColor}
            label="ประเภทสี"
            value={colorToAdd}
            error={errors}
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
            helperText="กรอกชื่อสี ความยาว 1 - 45 ตัวอักษร"
          />{" "}
          <button
            className="delFromCart ml-5"
            style={{ float: "right" }}
            onClick={() => {
              setAddColor(!addColor);
              setErrors(false);
            }}
          >
            ยกเลิก
          </button>
          <button
            className="InfoButton"
            style={{ float: "right" }}
            onClick={submitColor}
          >
            เพิ่มสี
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
            กำลังแก้ไข color หมายเลข {colorEdit.colorId}
          </div>
          <TextField
            size="small"
            variant="outlined"
            onChange={handleColorEdit}
            label="ประเภทสี"
            value={colorEdit.colorName}
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

      <Table style={{ width: 90 + "%", margin: "0 auto" }}>
        <TableHead style={{ backgroundColor: "#1895f5" }}>
          <TableRow>
            <TableCell style={{ color: "white" }} align="right">
              ID
            </TableCell>
            <TableCell style={{ color: "white" }} align="right">
              ประเภทสี
            </TableCell>
            <TableCell style={{ color: "white" }} align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsPerColorPage > 0 ? (
            color
              .slice(
                colorPage * rowsPerColorPage,
                colorPage * rowsPerColorPage + rowsPerColorPage
              )
              .map((col) => {
                return (
                  <TableRow key={col.colorId}>
                    <TableCell align="right">{col.colorId}</TableCell>
                    <TableCell align="right">{col.colorName}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "end",
                          alignItems: "center",
                        }}
                      >
                        {isEdit || addColor ? (
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
                            </span>{" "}
                          </>
                        ) : (
                          <>
                            <span onClick={() => editColor(col)}>
                              <EditOutlinedIcon className="hoverChangeToNavBarColor m-5" />
                            </span>
                            <span onClick={() => deletingColor(col)}>
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
              onRowsPerPageChange={handleChangeRowsPerColorPage}
              onPageChange={handleChangeColorPage}
              count={color.length}
              page={colorPage}
              rowsPerPage={rowsPerColorPage}
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

export default connect(null, mapDispatchToProps)(ColorTable);
