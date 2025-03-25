import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stores logged-in user details
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Save user details
    },
    logout: (state) => {
      state.user = null; // Clear user on logout
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
