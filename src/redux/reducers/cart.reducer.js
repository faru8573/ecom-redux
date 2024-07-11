import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingCartItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      toast.success("Product added successfully");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
      const filteredItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = filteredItems;

      toast.success("Product removed successfully");
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        toast.success("Quantity increased");
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        const filteredItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        state.cartItems = filteredItems;
        toast.success("Quantity decreased");
        localStorage.setItem("cartItems", JSON.stringify(filteredItems));
      }
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;
export const cartSelector = (state) => state.cart.cartItems;
