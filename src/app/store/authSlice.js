import { createSlice } from "@reduxjs/toolkit";
import { loadOrdersAfterLogin, clearOrders } from "./orderSlice"; // ✅ Import order actions

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || null : null,
  users: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users")) || [] : [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const { name, dob, email, phone, password } = action.payload;
      const newUser = { name, dob, email, phone, password };
      state.users.push(newUser);
      localStorage.setItem("users", JSON.stringify(state.users));
      state.error = null;
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((u) => u.email === email);

      if (user) {
        if (user.password === password) {
          state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          state.error = null;
        } else {
          state.error = "Incorrect password.";
        }
      } else {
        state.error = "User not found.";
      }
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login, (state, action) => {
      loadOrdersAfterLogin(action.payload.email); // ✅ Load orders after login
    });

    builder.addCase(logout, (state) => {
      clearOrders(); // ✅ Clear orders after logout
    });
  },
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
