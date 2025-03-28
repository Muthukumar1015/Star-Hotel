"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearError } from "@/app/store/authSlice";
import { useRouter } from "next/navigation"; // Import useRouter
import styles from "@/app/Login/login.module.css"; // Import CSS

export default function Auth() {
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize router
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
  const [showPopup, setShowPopup] = useState(false); // State for "User not found" popup
  const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for login success popup

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  // Handle Signup & Login
  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    if (isSignup) {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        setIsLoggingIn(false);
        return;
      }

      await dispatch(register({ 
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
      await dispatch(login({ email: formData.email, password: formData.password }));

      setTimeout(() => {
        if (error === "User not found. Please register first.") {
          setShowPopup(true); // Show popup if user is not registered
        } else if (user) {
          setShowSuccessPopup(true); // Show success popup
          setTimeout(() => {
            setShowSuccessPopup(false);
            router.push("/"); // Redirect after success
          }, 2000);
        }
        setIsLoggingIn(false);
      }, 1500);
    }
  };

  return (
    <div className={styles.loginContainer}>
      {/* Circular Animation */}
      <div className={styles.circularAnimation}></div>

      {/* User Not Found Popup */}
      {showPopup && (
        <div className={styles.popup}>
          <p>User not found. Please register first.</p>
          <button onClick={() => { setShowPopup(false); setIsSignup(true); }}>OK</button>
        </div>
      )}

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className={styles.successPopup}>
          <p>🎉 Login Successful! Redirecting...</p>
        </div>
      )}

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
            
            {/* Forget Password Link */}
            <p className={styles.forgotPassword} onClick={() => router.push("/forgot-password")}>
              Forgot your password?
            </p>

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
