import * as type from "../actiontype";

const INITIAL_STATE = {
  userInfo: {},
};

export default function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case type.GET_USER_INFO:
      return { userInfo: action.payload.userInfo };
    case type.LOGGED_OUT:
      return { userInfo: {} };
    default:
      return state;
  }
}
