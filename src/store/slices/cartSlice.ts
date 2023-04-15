import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";

type cart = {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  category: string;
  isSale: boolean;
  salePrice: number;
  quantity: number;
  size: string;
};
type cartState = {
  cart: cart[];
  totalPrice: number;
  totalQuantity: number;
  cartModal: boolean;
};

const initialState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
  cartModal: false,
} as cartState;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<cart>) => {
      const item = state.cart.find((item) => item.id === action.payload.id);
      if (item) {
        return;
      } else {
        state.cart.push(action.payload);
        state.totalPrice += action.payload.price;
        state.totalQuantity += action.payload.quantity;

        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    removeItem: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);
      const cartItems = state.cart.filter((item) => item.id !== action.payload);

      if (item) {
        state.cart = cartItems;
        state.totalPrice = cartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        state.totalQuantity = cartItems.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    setCart: (state, action: PayloadAction<cart[]>) => {
      const cartItems = action.payload;

      state.cart = cartItems;
      state.totalPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      state.totalQuantity = cartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
    },

    setCartModal: (state, action: PayloadAction<boolean>) => {
      state.cartModal = action.payload;
    },
    increaseProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.id === action.payload);

      if (!product) return;

      const newCart = state.cart.map((item) => {
        if (item.id === product.id) {
          item.quantity += 1;
          state.totalPrice += item.price;
          state.totalQuantity += 1;
        }
        return item;
      });

      state.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    decreaseProductQuantity: (state, action: PayloadAction<string>) => {
      const product = state.cart.find((item) => item.id === action.payload);

      if (!product) return;

      const newCart = state.cart.map((item) => {
        if (item.id === product.id) {
          item.quantity -= 1;
          state.totalPrice -= item.price;
          state.totalQuantity -= 1;
        }

        return item;
      });

      state.cart = newCart;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});

export const {
  addToCart,
  setCart,
  setCartModal,
  removeItem,
  increaseProductQuantity,
  decreaseProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
