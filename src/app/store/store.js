import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice"; // Existing menu reducer
import authReducer from "./authSlice"; // Authentication reducer

const store = configureStore({
  reducer: {
    menu: menuReducer, // Handles menu-related state
    auth: authReducer, // Handles authentication state
  },
});

export default store;
