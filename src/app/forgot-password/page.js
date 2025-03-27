"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendOtp, verifyOtp, resetPassword } from "@/app/store/authSlice";
import styles from "@/app/forgot-password/forget.module.css";

export default function ForgotPassword({ onBackToLogin }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      return;
    }

    dispatch(sendOtp({ email }));
    setOtpSent(true);
    setError("");
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    dispatch(verifyOtp({ email, otp }));
    setOtpVerified(true);
    setError("");
  };

  const handleResetPassword = () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    dispatch(resetPassword({ email, newPassword }));
    alert("Password reset successfully. Please login.");
    onBackToLogin();
  };

  return (
    <div className={styles.loginForm}>
      {!otpSent ? (
        <>
          <h2 className={styles.title}>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter Email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button className={styles.loginButton} onClick={handleSendOtp}>
            Send OTP
          </button>
        </>
      ) : !otpVerified ? (
        <>
          <h2 className={styles.title}>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            className={styles.inputField}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button className={styles.loginButton} onClick={handleVerifyOtp}>
            Verify OTP
          </button>
        </>
      ) : (
        <>
          <h2 className={styles.title}>Reset Password</h2>
          <input
            type="password"
            placeholder="New Password"
            className={styles.inputField}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {error && <p className={styles.errorText}>{error}</p>}
          <button className={styles.loginButton} onClick={handleResetPassword}>
            Reset Password
          </button>
        </>
      )}

      <p className={styles.signup} onClick={onBackToLogin}>
        Back to Login
      </p>
    </div>
  );
}
