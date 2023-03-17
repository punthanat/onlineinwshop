import * as type from "../actiontype";
import axios from "axios";
import SetDefaultHeader from "../components/etc/SetDefaultHeader.js";
import { removeYourProduct } from "./cart";

export const getUserInfo = (data) => ({
  type: type.GET_USER_INFO,
  payload: {
    userInfo: data,
  },
});
export const userLogout = () => ({
  type: type.LOGGED_OUT,
});

export const getUser = () => (dispatch) => {
  axios.get(`${process.env.REACT_APP_API_URL}/user/getbyname`).then((res) => {
    dispatch(getUserInfo(res.data));
  });
};

export const login = (data) => async (dispatch) => {
  const response = await axios
    .post(`${process.env.REACT_APP_API_URL}/authenticate`, data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
    .then((res) => {
      SetDefaultHeader(`${res.data.token}`);
      localStorage.setItem("token", `${res.data.token}`);
    })
    .then(async () => {
      const resp = await axios
        .get(`${process.env.REACT_APP_API_URL}/user/getbyname`)
        .then((res) => {
          dispatch(removeYourProduct(res.data.userId));
          dispatch(getUserInfo(res.data));
          return res.status;
        });
      return resp;
    })
    .catch((err) => {
      localStorage.removeItem("token");
      SetDefaultHeader("");
      if (err.response) {
        return err.response.data.message;
      } else {
        return err.message;
      }
    });
  return response;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  SetDefaultHeader("");
  dispatch(userLogout());
};
