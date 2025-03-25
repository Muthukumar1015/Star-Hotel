"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
// import { login } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import styles from "./login.module.css"; // Import CSS

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email })); // Save user in Redux
      router.push("/dashboard"); // Redirect after login
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Rotating Circle */}
      <div className={styles.circularAnimation}></div>

      {/* Login Form */}
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <p className={styles.forgotPassword}>Forgot your password?</p>
        <button type="submit" className={styles.loginButton}>Login</button>
        <p className={styles.signup}>Signup</p>
      </form>
    </div>
  );
}
