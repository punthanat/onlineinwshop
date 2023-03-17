import { combineReducers } from "redux";
import user from "./reducers/user";
import cart from "./reducers/cart";
import product from "./reducers/product";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import uiStyle from "./reducers/uiStyle";
const persistConfig = {
  key: "cart",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: user,
  cart: cart,
  product: product,
  uiStyle: uiStyle,
});

export default persistReducer(persistConfig, rootReducer);
