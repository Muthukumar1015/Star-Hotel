import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || null : null, // Persist login
  users: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users")) || [] : [],
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    register: (state, action) => {
      const { name, dob, email, phone, password } = action.payload;
      const existingUser = state.users.find((user) => user.email === email);

      if (!existingUser) {
        const newUser = { name, dob, email, phone, password };
        state.users.push(newUser);
        localStorage.setItem("users", JSON.stringify(state.users));
        state.error = null;
      } else {
        state.error = "Email already exists. Please use a different email.";
      }
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find((user) => user.email === email);

      if (user) {
        if (user.password === password) {
          state.user = user;
          localStorage.setItem("user", JSON.stringify(user));
          state.error = null;
        } else {
          state.error = "Incorrect password.";
        }
      } else {
        state.error = "User not found. Please register first.";
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
});

export const { register, login, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
