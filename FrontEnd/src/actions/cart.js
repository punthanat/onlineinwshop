import * as type from "../actiontype";

export const addToCart = (productToCart) => ({
  type: type.ADD_TO_CART,
  payload: {
    orderDetail: productToCart,
  },
});

export const removeFromCart = (productToCart) => ({
  type: type.REMOVE_FROM_CART,
  payload: {
    orderDetail: productToCart,
  },
});

export const removeYourProduct = (userId) => ({
  type: type.REMOVE_YOUR_PRODUCT_FROM_CART,
  payload: {
    userId: userId,
  },
});

export const clearCartItem = () => ({
  type: type.CLEAR_CART,
});
