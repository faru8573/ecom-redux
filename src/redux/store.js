import { configureStore } from "@reduxjs/toolkit";
import { itemReducer } from "./reducers/item.reducer";
import { cartReducer } from "./reducers/cart.reducer";
import { authReducer } from "./reducers/auth.reducer";

const store = configureStore({
  reducer: {
    items: itemReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});
export default store;
