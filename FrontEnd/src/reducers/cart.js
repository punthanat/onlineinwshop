import * as actionTypes from "../actiontype";

const INITIAL_STATE = {
  cart: [],
  productCounter: [],
};

const cart = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const isAlready = state.cart.find(
        (it) =>
          it.product.productId ===
            action.payload.orderDetail.product.productId &&
          it.color.colorId === action.payload.orderDetail.color.colorId
      )
        ? true
        : false;

      const isAlreadyById = state.cart.find(
        (it) =>
          it.product.productId === action.payload.orderDetail.product.productId
      )
        ? true
        : false;

      return {
        ...state,
        productCounter: isAlreadyById
          ? state.productCounter.map((item) =>
              item.productId === action.payload.orderDetail.product.productId
                ? {
                    ...item,
                    quantity:
                      item.quantity + action.payload.orderDetail.quantity,
                  }
                : item
            )
          : [
              ...state.productCounter,
              {
                productId: action.payload.orderDetail.product.productId,
                quantity: action.payload.orderDetail.quantity,
                userId: action.payload.orderDetail.product.user.userId,
              },
            ],

        cart: isAlready
          ? state.cart.map((item) =>
              item.product.productId ===
                action.payload.orderDetail.product.productId &&
              item.color.colorId === action.payload.orderDetail.color.colorId
                ? {
                    ...item,
                    quantity:
                      item.quantity + action.payload.orderDetail.quantity,
                    totalPrice: (item.totalPrice +=
                      action.payload.orderDetail.product.price *
                      action.payload.orderDetail.quantity),
                  }
                : item
            )
          : [...state.cart, action.payload.orderDetail],
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        productCounter: state.productCounter.map((item) =>
          item.productId === action.payload.orderDetail.product.productId &&
          item.quantity - action.payload.orderDetail.quantity > 0
            ? {
                ...item,
                quantity: item.quantity - action.payload.orderDetail.quantity,
              }
            : state.productCounter.filter(
                (pro) =>
                  pro.productId !== action.payload.orderDetail.product.productId
              )
        ),

        cart: state.cart.filter(
          (item) =>
            JSON.stringify(item) !== JSON.stringify(action.payload.orderDetail)
        ),
      };
    case actionTypes.REMOVE_YOUR_PRODUCT_FROM_CART:
      if (state.cart.length > 0) {
        return {
          ...state,
          cart: state.cart.filter(
            (item) => item.product.user.userId !== action.payload.userId
          ),
          productCounter: state.productCounter.filter(
            (item) => item.userId !== action.payload.userId
          ),
        };
      } else {
        return state;
      }
    case actionTypes.CLEAR_CART:
      return { ...state, cart: [], productCounter: [] };
    default:
      return state;
  }
};

export default cart;
