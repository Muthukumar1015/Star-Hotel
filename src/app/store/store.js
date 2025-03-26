import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice"; 
import productsReducer from "./productsSlice"; 
import cartReducer from "./cartSlice";  // ✅ Added cartSlice

const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,  // ✅ Integrated cart state
  },
});

export default store;
