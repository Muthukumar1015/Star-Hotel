"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearError } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";
import styles from "@/app/Login/login.module.css"; // Import CSS

export default function Auth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user); // Get logged-in user

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  // Handle Signup & Login
  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    if (isSignup) {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        setIsLoggingIn(false);
        return;
      }

      dispatch(register({ 
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }));

      setTimeout(() => {
        setIsSignup(false); // Switch to login after signup
        setIsLoggingIn(false);
      }, 1500);
      
    } else {
      // Login
      dispatch(login({ email: formData.email, password: formData.password }));

      setTimeout(() => {
        if (error === "User not found. Please register first.") {
          setIsSignup(true); // Redirect to Signup page
        } else if (!error && user) {
          router.push("/"); // Redirect to Home on successful login
        }
        setIsLoggingIn(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Circular Animation */}
      <div className={styles.circularAnimation}></div>

      {/* Login & Signup Forms */}
      <div className={styles.loginForm}>
        {!isSignup ? (
          <form onSubmit={handleAuth}>
            <h2 className={styles.title}>Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <p className={styles.forgotPassword}>Forgot your password?</p>
            <button className={styles.loginButton} disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
            <p className={styles.signup} onClick={() => setIsSignup(true)}>
              Signup
            </p>
          </form>
        ) : (
          <form onSubmit={handleAuth}>
            <h2 className={styles.title}>Signup</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className={styles.inputField}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="dob"
              className={styles.inputField}
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className={styles.inputField}
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.inputField}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={styles.inputField}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {error && <p className={styles.errorText}>{error}</p>}
            <button className={styles.loginButton} disabled={isLoggingIn}>
              {isLoggingIn ? "Signing up..." : "Signup"}
            </button>
            <p className={styles.signup} onClick={() => setIsSignup(false)}>
              Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
