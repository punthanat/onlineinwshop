import { CircularProgress, Container, Grid, Hidden } from "@material-ui/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import "../../../index.css";
import useSearchHandler from "../../etc/useSearchHandler";
import FilterBox from "../../ui/FilterBox";
import ProductCard from "../../ui/ProductCard";
import DehazeIcon from "@material-ui/icons/Dehaze";
import AppsIcon from "@material-ui/icons/Apps";
import { addResDialog } from "../../../actions/uiStyle";
import "../../../css/shop.css";
import squidgirlnotfound from "../../../images/asset/squidgirlnotfound.png";

const Home = ({ filter, addResDialog, userInfo, sortBy }) => {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(8);
  const [productLength, setProductLength] = useState(0);
  const [searchVal] = useState("all");
  const [type, setType] = useState("");
  const [sort, setSort] = useState("productId");
  const [isdescending, setIsdescending] = useState("");
  const [listStyle, setListStyle] = useState(1);
  const { products, hasMore, loading } = useSearchHandler(
    searchVal,
    type,
    page,
    pageSize,
    sort,
    isdescending
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setListStyle(1);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (filter.length === 0) {
      setType("");
      setPage(0);
    }
    if (filter.length > 0) {
      setType(filter);
      setPage(0);
    }
  }, [filter]);

  useEffect(() => {
    if (sortBy.val === undefined) {
      setSort("productId");
      setIsdescending("yes");
    } else {
      setSort(sortBy.val);
      setIsdescending(sortBy.isdescending);
    }
    setPage(0);
  }, [sortBy]);

  useEffect(() => {
    const getProductLength = () => {
      setProductLength(products.length);
    };
    getProductLength();
    return () => {
      setProductLength(0);
    };
  }, [products]);

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

  const productList = products.map((product, i) => {
    if (products.length === i + 1) {
      if (listStyle === 1) {
        return (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            ref={lastElementRef}
            key={`productCardLastNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      } else {
        return (
          <Grid
            item
            xs={12}
            ref={lastElementRef}
            key={`productCardLastNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      }
    } else {
      if (listStyle === 1) {
        return (
          <Grid
            item
            xs={6}
            md={4}
            lg={3}
            key={`productCardNo${product.productId}`}
          >
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      } else {
        return (
          <Grid item xs={12} key={`productCardNo${product.productId}`}>
            <ProductCard product={product} listStyle={listStyle} />
          </Grid>
        );
      }
    }
  });

  return (
    <>
      <Container maxWidth="lg">
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "0 auto",
            maxWidth: "90%",
            marginTop: "30px",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="space-around"
            spacing={3}
          >
            <Grid item xs={12} md={4} lg={3}>
              <FilterBox></FilterBox>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <>
                <Container className="productContainer">
                  <Hidden mdDown>
                    <div className="headerHome">
                      <div>
                        <AppsIcon
                          className="p-10 hoverCursor"
                          onClick={() => setListStyle(1)}
                          style={{ color: listStyle === 1 ? "#333435" : null }}
                        />

                        <DehazeIcon
                          className="p-10 hoverCursor"
                          onClick={() => setListStyle(2)}
                          style={{ color: listStyle === 2 ? "#333435" : null }}
                        />
                      </div>
                    </div>{" "}
                  </Hidden>
                  <h4
                    className="text-right baseColor"
                    style={{
                      marginTop: "-15px",
                    }}
                  >
                    {productLength} รายการ
                  </h4>
                  <Grid container direction="row" spacing={1}>
                    {productList}
                  </Grid>
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
                </Container>{" "}
              </>
            </Grid>
          </Grid>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    filter: state.uiStyle.filterType,
    sortBy: state.uiStyle.sort,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addResDialog: (content) => dispatch(addResDialog(content)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
