import { Container, Grid, Hidden } from "@material-ui/core";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useEffect } from "react";
import {
  clickedFilter,
  clearFilterSort,
  clickedSort,
} from "../../actions/uiStyle";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import "../../css/filterBox.css";

const FilterBox = ({
  uiStyle,
  clickedFilter,
  clearFilterSort,
  clickedSort,
}) => {
  const [types, setTypes] = useState([]);
  const [sortBy] = useState([
    { name: "วันที่ขาย", val: "saleDate", isdescending: "yes" },
    { name: "ชื่อสินค้า A-Z", val: "name", isdescending: "no" },
    { name: "ราคาน้อยไปมาก", val: "price", isdescending: "no" },
    { name: "ราคามากไปน้อย", val: "price", isdescending: "yes" },
  ]);
  const [showType, setShowType] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });
  }, []);

  const onChangeFilter = (e) => {
    let val = e.target.value;
    clickedFilter(val);
  };

  const onChangeSortBy = (e) => {
    clickedSort(sortBy[e.target.value]);
  };

  const handleShowType = () => {
    setShowType(!showType);
  };

  const clearCheck = () => {
    clearFilterSort();
  };
  return (
    <>
      <Hidden smDown>
        <Container id="filterBox" className="filterBox">
          <div
            className="header f18 b pt-20"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>ฟิลเตอร์</div>
            {(uiStyle.filterType !== "" || uiStyle.sort.name !== undefined) &&
              uiStyle.filterType !== "all" && (
                <div>
                  <button
                    className="AddButton"
                    style={{
                      padding: "0px",
                      display: "flex",
                      borderRadius: "50%",
                    }}
                    onClick={() => clearCheck()}
                  >
                    <CloseIcon style={{ fontSize: "16px" }} />
                  </button>
                </div>
              )}
          </div>

          <div>
            <div className="pt-5 pb-5">ประเภท</div>
            <Grid container justifyContent="center">
              {types.map((filter) => {
                return (
                  <Grid item xs={12} key={filter.typeId}>
                    <FormControlLabel
                      className="w100"
                      control={
                        <Checkbox
                          className="mw100 w100"
                          disableRipple={true}
                          checked={uiStyle.filterType === filter.name}
                          color="primary"
                          style={{
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <div className="filterFullItem w100">
                              <CircleUnchecked className=" pl-5" />
                              <div className="f14 b pl-10"> {filter.name}</div>
                            </div>
                          }
                          checkedIcon={
                            <div
                              className="filterFullItem w100"
                              style={{
                                backgroundColor: "#f0f8f9",
                              }}
                            >
                              <CircleCheckedFilled className="  pl-5" />
                              <div className="f14 b pl-10"> {filter.name}</div>
                            </div>
                          }
                          onChange={onChangeFilter}
                          value={filter.name}
                        />
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>

          <div>
            <div className="pt-5 pb-5">เรียงตาม</div>
            <Grid container justifyContent="center">
              {sortBy.map((sort, i) => {
                return (
                  <Grid item xs={12} key={sort.name}>
                    <FormControlLabel
                      className="w100"
                      control={
                        <Checkbox
                          className="mw100 w100"
                          disableRipple={true}
                          checked={uiStyle.sort.name === sort.name}
                          color="primary"
                          style={{
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <div className="filterFullItem w100">
                              <CircleUnchecked className=" pl-5" />
                              <div className="f14 b pl-10"> {sort.name}</div>
                            </div>
                          }
                          checkedIcon={
                            <div
                              className="filterFullItem w100"
                              style={{
                                backgroundColor: "#f0f8f9",
                              }}
                            >
                              <CircleCheckedFilled className="  pl-5" />
                              <div className="f14 b pl-10"> {sort.name}</div>
                            </div>
                          }
                          onChange={onChangeSortBy}
                          value={i}
                        />
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </div>
        </Container>
      </Hidden>

      <Hidden mdUp>
        <Container id="filterBox" className="filterBox">
          <label htmlFor="infoFilter">
            <div
              className="headerRes hoverCursor infoBox pt-5 pb-5"
              onClick={handleShowType}
            >
              <div className="b ">ฟิลเตอร์</div>
              {!showType ? (
                <div>
                  <AddIcon className="f20" />{" "}
                </div>
              ) : (
                <div>
                  <RemoveIcon className="f20" />
                </div>
              )}
            </div>
          </label>

          <input type="checkbox" id="infoFilter" hidden />

          <div className="type typeHidden">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="pt-10">ประเภท </div>
              <div>
                {(uiStyle.filterType !== "" ||
                  uiStyle.sort.name !== undefined) &&
                  uiStyle.filterType !== "all" && (
                    <div>
                      <button
                        className="AddButton"
                        style={{
                          padding: "0px",
                          display: "flex",
                          borderRadius: "50%",
                        }}
                        onClick={() => clearCheck()}
                      >
                        <CloseIcon style={{ fontSize: "16px" }} />
                      </button>
                    </div>
                  )}
              </div>{" "}
            </div>

            <Grid container justifyContent="center">
              {types.map((filter) => {
                return (
                  <Grid item xs={12} key={filter.typeId}>
                    <FormControlLabel
                      className="w100"
                      control={
                        <Checkbox
                          disableRipple={true}
                          color="primary"
                          className="w100 mw100"
                          checked={uiStyle.filterType === filter.name}
                          style={{
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <div className="filterFullItem w100">
                              <CircleUnchecked className=" pl-5" />
                              <div className="f16 b pl-5"> {filter.name}</div>
                            </div>
                          }
                          checkedIcon={
                            <div
                              className="filterFullItem w100"
                              style={{
                                transition: "0.25s",
                                backgroundColor: "#f0f8f9",
                              }}
                            >
                              <CircleCheckedFilled className=" pl-5" />
                              <div className="f16 b pl-5"> {filter.name}</div>
                            </div>
                          }
                          onChange={onChangeFilter}
                          value={filter.name}
                        />
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>

            <div>
              <div className="pt-5 pb-5">เรียงตาม</div>
              <Grid container justifyContent="center">
                {sortBy.map((sort, i) => {
                  return (
                    <Grid item xs={12} key={sort.name}>
                      <FormControlLabel
                        className="w100"
                        control={
                          <Checkbox
                            className="mw100 w100"
                            disableRipple={true}
                            checked={uiStyle.sort.name === sort.name}
                            color="primary"
                            style={{
                              backgroundColor: "transparent",
                            }}
                            icon={
                              <div className="filterFullItem w100">
                                <CircleUnchecked className=" pl-5" />
                                <div className="f16 b pl-10"> {sort.name}</div>
                              </div>
                            }
                            checkedIcon={
                              <div
                                className="filterFullItem w100"
                                style={{
                                  backgroundColor: "#f0f8f9",
                                }}
                              >
                                <CircleCheckedFilled className=" pl-5" />
                                <div className="f16 b pl-10"> {sort.name}</div>
                              </div>
                            }
                            onChange={onChangeSortBy}
                            value={i}
                          />
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </div>
        </Container>
      </Hidden>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    uiStyle: state.uiStyle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickedFilter: (e) => dispatch(clickedFilter(e)),
    clickedSort: (e) => dispatch(clickedSort(e)),
    clearFilterSort: () => dispatch(clearFilterSort()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
