import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice"; // Import your reducer

const store = configureStore({
  reducer: {
    menu: menuReducer, // Add reducers here
  },
});

export default store;
