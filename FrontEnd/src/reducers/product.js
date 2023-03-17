import * as type from "../actiontype";

const INITIAL_STATE = {
 
};

export default function products(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case type.EDIT_PRODUCT:
      return action.payload.product;
    case type.CLEAR_PRODUCT:
      return {};

    default:
      return state;
  }
}
