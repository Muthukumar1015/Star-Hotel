import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import authReducer from "./authSlice"; // Added authSlice

const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,  // Authentication state
  },
});

export default store;
