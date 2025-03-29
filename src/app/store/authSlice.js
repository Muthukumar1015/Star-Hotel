import { createSlice } from "@reduxjs/toolkit";
import { loadOrdersAfterLogin, clearOrdersOnLogout } from "./orderSlice";

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
      const existingUser = state.users.find((u) => u.email === email);

      if (!existingUser) {
        const newUser = { name, dob, email, phone, password };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      } else {
        state.error = "Email already registered. Please log in.";
      }
    },

    login: (state, action) => {
      const { email, password } = action.payload;
      const userIndex = state.users.findIndex((u) => u.email === email);

      if (userIndex !== -1) {
        if (state.users[userIndex].password === password) {
          state.user = state.users[userIndex];
          localStorage.setItem("user", JSON.stringify(state.user));
          state.error = null;

          // ✅ Load user's orders on login
          action.asyncDispatch(loadOrdersAfterLogin(email));
        } else {
          state.error = "Incorrect password.";
        }
      } else {
        state.error = "User not found.";
      }
    },

    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");

      // ✅ Clear Redux orders (but keep them in localStorage)
      action.asyncDispatch(clearOrdersOnLogout());
    },

    clearError: (state) => {
      state.error = null;
    },

    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const userIndex = state.users.findIndex((u) => u.email === email);

      if (userIndex !== -1) {
        state.users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      } else {
        state.error = "User not found.";
      }
    },
  },
});

export const { register, login, logout, clearError, resetPassword } = authSlice.actions;
export default authSlice.reducer;
