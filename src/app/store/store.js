import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice"; 
import productsReducer from "./productsSlice"; // ✅ Added productsSlice

const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    products: productsReducer,  // ✅ Integrated product state
  },
});

export default store;
