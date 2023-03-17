import { Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ProductCard from "../../ui/ProductCard";
import squidgirlnotfound from "../../../images/asset/squidgirlnotfound.png";
const MyShopPage = ({ userInfo }) => {
  const [myProduct, setMyProduct] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/seller/products/sellerproduct/${userInfo.userName}`
      )
      .then((res) => {
        setMyProduct(res.data);
      });
  }, [userInfo.userName]);

  const myProd = myProduct.map((mProd) => {
    return (
      <Grid item xs={6} md={4} lg={3} key={`myProductNo${mProd.productId}`}>
        <ProductCard product={mProd} listStyle={1}></ProductCard>
      </Grid>
    );
  });

  return (
    <div className="profileBox">
      <div
        className="text-center"
        style={{
          borderWidth: "0 0 2px 0",
          borderStyle: "solid",
          borderColor: "#333435",
          marginBottom: "40px",
          color: "black",
        }}
      >
        <div className="  f28 b">สินค้าทั้งหมดของคุณ</div>
        <div className="f16 pb-5">รวมสินค้าทั้งหมดที่คุณวางขาย</div>
      </div>

      <Grid container>
        {myProd}

        {myProduct.length === 0 && (
          <>
            <Grid item xs={12}>
              <div className="text-center pt-20">
                <img
                  src={squidgirlnotfound}
                  alt="noresult"
                  className="squidgirlnotfound"
                />
                <div className="b text-center pt-10 f18">
                  ไม่มีสินค้าที่คุณวางขาย
                </div>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

export default connect(mapStateToProps)(MyShopPage);
