import {
  CircularProgress,
  Container,
  Grid,
  Hidden,
  InputBase,
} from "@material-ui/core";
import React, { useCallback, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";

import ProductCard from "./ProductCard";
import useSearchHandler from "../etc/useSearchHandler";
import axios from "axios";
import squidgirlnotfound from "../../images/asset/squidgirlnotfound.png";
import "../../css/searchModal.css";

const SearchModal = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(8);
  const [sort, setSort] = useState("productId");
  const [isdescending, setIsdescending] = useState("no");
  const [sortIndex, setSortIndex] = useState(0);
  const [sortBy] = useState([
    { name: "วันที่ขายล่าสุด", val: "saleDate", isdescending: "yes" },
    { name: "ชื่อสินค้า A-Z", val: "name", isdescending: "no" },
    { name: "ชื่อสินค้า Z-A", val: "name", isdescending: "yes" },
    { name: "ราคาน้อยไปมาก", val: "price", isdescending: "no" },
    { name: "ราคามากไปน้อย", val: "price", isdescending: "yes" },
  ]);

  const { products, hasMore, loading } = useSearchHandler(
    searchVal,
    type,
    page,
    pageSize,
    sort,
    isdescending
  );

  const observer = useRef();
  const lastElementRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading, hasMore]
  );

  const onSearch = (e) => {
    setSearchVal(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    setSearchVal(props.query);

    setPage(0);
    const body = document.querySelector("body");
    if (props.open) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });
  }, [props]);

  const chooseType = (e) => {
    setType(e.target.value);
    setPage(0);
  };

  const closeModal = () => {
    setType("");
    setSort("productId");
    props.close();
  };

  const onChangeFilterSort = (e) => {
    setPage(0);
    setSortIndex(e.target.value);
    setSort(sortBy[e.target.value].val);
    setIsdescending(sortBy[e.target.value].isdescending);
  };

  return (
    <>
      {props.open && (
        <div
          className="modal"
          style={{
            paddingTop: "70px",
            transition: "0.3s",
          }}
        >
          <>
            <Container
              maxWidth="lg"
              style={{
                backgroundColor: "white",
                padding: "30px",
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                borderRadius: "15px",
                borderColor: "transparent",
                marginTop: "30px",
                marginBottom: "75px",
              }}
            >
              <div
                className="text-right"
                style={{
                  color: "#333435",
                  outline: "none",
                  position: "relative",
                  marginTop: "-20px",
                }}
              >
                <CloseIcon className="hoverCursor f24" onClick={closeModal} />
              </div>
              <Hidden mdUp>
                <div
                  className="searchResField"
                  style={{ borderColor: "#1895f5" }}
                >
                  <SearchIcon
                    style={{ color: "#1895f5", marginLeft: 10 + "px" }}
                  ></SearchIcon>
                  <InputBase
                    style={{
                      width: "85%",
                      marginLeft: 10 + "px",
                      paddingRight: 10 + "px",
                    }}
                    placeholder="Search…"
                    variant="outlined"
                    type="text"
                    id="searchText"
                    name="searchText"
                    value={searchVal}
                    onChange={onSearch}
                  />
                  {searchVal.length > 0 && (
                    <CloseIcon
                      className="hoverCursor"
                      style={{
                        color: "#1895f5",
                        marginLeft: 10 + "px",
                        marginRight: "20px",
                      }}
                      onClick={() => setSearchVal("")}
                    />
                  )}
                </div>{" "}
              </Hidden>

              <div className="f24">
                <div>
                  {" "}
                  {products.length > 0 ? (
                    <> ผลลัพธ์การค้นหา</>
                  ) : (
                    <>ไม่มีผลลัพธ์ของการค้นหานี้ </>
                  )}{" "}
                </div>
                <div
                  className="f13"
                  style={{
                    display: "flex",
                    width: "150px",
                    flexDirection: "column",
                  }}
                >
                  {" "}
                  <div className="text-left b "> เรียงตาม </div>
                  <select
                    className="sortBy"
                    value={sortIndex}
                    onChange={onChangeFilterSort}
                  >
                    {sortBy.map((s, i) => (
                      <option key={s.name} value={i}>
                        {s.name}{" "}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="radioGroup pt-20 pb-40">
                <span className="f18  pr-20">กรองการค้นหา</span>
                <span>
                  <input
                    type="radio"
                    id={"AllFilter"}
                    name="type"
                    defaultValue={"all"}
                    onChange={chooseType}
                  />
                  <label htmlFor="AllFilter">ทั้งหมด</label>
                </span>
                {types.map((tp) => {
                  return (
                    <span key={tp.typeId}>
                      <input
                        type="radio"
                        id={tp.name}
                        name="type"
                        defaultValue={tp.name}
                        onChange={chooseType}
                      />
                      <label htmlFor={tp.name}>{tp.name}</label>
                    </span>
                  );
                })}
              </div>

              <Grid container direction="row" spacing={2}>
                {products.map((product, i) => {
                  if (products.length === i + 1) {
                    return (
                      <Grid
                        item
                        xs={6}
                        sm={4}
                        md={3}
                        ref={lastElementRef}
                        key={i}
                      >
                        <ProductCard
                          product={product}
                          listStyle={1}
                          closeSearchModal={closeModal}
                        ></ProductCard>{" "}
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={6} sm={4} md={3} key={i}>
                        <ProductCard
                          product={product}
                          listStyle={1}
                          closeSearchModal={closeModal}
                        ></ProductCard>
                      </Grid>
                    );
                  }
                })}

                {products.length === 0 && (
                  <Grid item xs={12}>
                    <div className="text-center pt-20">
                      <img
                        src={squidgirlnotfound}
                        alt="noresult"
                        className="squidgirlnotfound"
                      />
                      <div>ไม่มีผลลัพธ์...</div>
                    </div>
                  </Grid>
                )}
                {loading && (
                  <Grid item xs={12}>
                    <div className="text-center pt-20">
                      <CircularProgress
                        style={{ color: "#1895f5" }}
                        disableShrink
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
            </Container>
          </>
        </div>
      )}
    </>
  );
};

export default SearchModal;
