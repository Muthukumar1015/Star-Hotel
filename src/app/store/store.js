import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice"; 
import productsReducer from "./productsSlice"; 
import cartReducer from "./cartSlice";  // ✅ Added cartSlice
import shoppingReducer from "./shoppingSlice";
import checkoutReducer from "./checkoutSlice";
import orderReducer from "./orderSlice";
const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,  // ✅ Integrated cart state
    shoppingCart: shoppingReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
  },
});

export default store;
