"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearError } from "@/app/store/authSlice";
import { loadOrdersAfterLogin } from "@/app/store/orderSlice";
import { useRouter } from "next/navigation";
import styles from "@/app/Login/login.module.css";

export default function Auth() {
  const dispatch = useDispatch();
  const router = useRouter();
  const error = useSelector((state) => state.auth.error);
  const user = useSelector((state) => state.auth.user);

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
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // ✅ Load Orders After Successful Login
  useEffect(() => {
    if (user) {
      dispatch(loadOrdersAfterLogin());
    }
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    if (isSignup) {
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
        setShowSuccessPopup(true);
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      }, 1000);
      
    } else {
      await dispatch(login({ email: formData.email, password: formData.password }));

      setTimeout(() => {
        if (!user) {
          setShowPopup(true);
        } else {
          setShowSuccessPopup(true);
          setTimeout(() => {
            router.push("/");  // ✅ Redirect to Home Page
          }, 2000);
        }
        setIsLoggingIn(false);
      }, 1000);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.circularAnimation}></div>

      {showPopup && (
        <div className={styles.popup}>
          <p>User not found. Please register first.</p>
          <button onClick={() => { setShowPopup(false); setIsSignup(true); }}>OK</button>
        </div>
      )}

      {showSuccessPopup && (
        <div className={styles.successPopup}>
          <p>🎉 {isSignup ? "Signup Successful! Redirecting..." : "Login Successful! Redirecting..."}</p>
        </div>
      )}

      <div className={styles.loginForm}>
        {!isSignup ? (
          <form onSubmit={handleAuth}>
            <h2 className={styles.title}>Login</h2>
            <input type="email" name="email" placeholder="Email" className={styles.inputField} value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className={styles.inputField} value={formData.password} onChange={handleChange} required />
            {error && <p className={styles.errorText}>{error}</p>}
            
            <button className={styles.loginButton} disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
            <p className={styles.signup} onClick={() => setIsSignup(true)}>Signup</p>
          </form>
        ) : (
          <form onSubmit={handleAuth}>
            <h2 className={styles.title}>Signup</h2>
            <input type="text" name="name" placeholder="Full Name" className={styles.inputField} value={formData.name} onChange={handleChange} required />
            <input type="date" name="dob" className={styles.inputField} value={formData.dob} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" className={styles.inputField} value={formData.email} onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" className={styles.inputField} value={formData.password} onChange={handleChange} required />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" className={styles.inputField} value={formData.confirmPassword} onChange={handleChange} required />
            
            <button className={styles.loginButton} disabled={isLoggingIn}>
              {isLoggingIn ? "Signing up..." : "Signup"}
            </button>
            <p className={styles.signup} onClick={() => setIsSignup(false)}>Login</p>
          </form>
        )}
      </div>
    </div>
  );
}
