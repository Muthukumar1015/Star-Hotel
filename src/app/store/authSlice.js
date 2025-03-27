import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) || null : null,
  users: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("users")) || [] : [],
  otpStorage: {}, // Store OTPs temporarily
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

    // 🔹 Forgot Password Flow 🔹
    sendOtp: (state, action) => {
      const { email } = action.payload;
      const user = state.users.find((user) => user.email === email);

      if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
        state.otpStorage[email] = otp;

        // Simulated fetch request to send OTP (dummy API)
        fetch("https://dummy-api.com/send-otp", {
          method: "POST",
          body: JSON.stringify({ email, otp }),
          headers: { "Content-Type": "application/json" },
        })
          .then(() => {
            console.log(`OTP sent to ${email}: ${otp}`); // Remove in production
          })
          .catch(() => {
            state.error = "Failed to send OTP. Try again.";
          });

        state.error = null;
      } else {
        state.error = "Email not registered.";
      }
    },

    verifyOtp: (state, action) => {
      const { email, otp } = action.payload;
      if (state.otpStorage[email] === otp) {
        state.otpStorage[email] = null; // OTP verified, remove from storage
        state.error = null;
      } else {
        state.error = "Invalid OTP. Please try again.";
      }
    },

    resetPassword: (state, action) => {
      const { email, newPassword } = action.payload;
      const user = state.users.find((user) => user.email === email);

      if (user) {
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(state.users)); // Update localStorage
        state.error = null;
      } else {
        state.error = "User not found.";
      }
    },
  },
});

export const { register, login, logout, clearError, sendOtp, verifyOtp, resetPassword } = authSlice.actions;
export default authSlice.reducer;
