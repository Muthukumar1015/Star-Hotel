"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); 
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Generate and send OTP
  const handleSendOtp = () => {
    if (!email.trim()) {
      setError("Please enter a valid email.");
      return;
    }

    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp); 
    setOtpSent(true);
    setError("");

    console.log(`OTP sent to ${email}: ${randomOtp}`);
    alert(`Dummy OTP Sent: ${randomOtp}`);
  };

  // Verify OTP
  const handleVerifyOtp = () => {
    if (!otp.trim()) {
      setError("Please enter the OTP.");
      return;
    }

    if (otp === generatedOtp) {
      setOtpVerified(true);
      setError("");
      alert("OTP verified successfully! Enter a new password.");
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  // Reset password
  const handleResetPassword = () => {
    if (!newPassword.trim()) {
      setError("Please enter a new password.");
      return;
    }

    dispatch(resetPassword({ email, newPassword }));
    setShowSuccessPopup(true);
  };

  // Close success popup and redirect
  const handleSuccessClose = () => {
    setShowSuccessPopup(false);
    router.push("/Login");
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        {!otpSent ? (
          <>
            <h2 className="title">Forgot Password</h2>
            <p className="description">Enter your registered email to receive an OTP.</p>
            <input
              type="email"
              placeholder="Enter Email"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error && <p className="errorText">{error}</p>}
            <button className="submitButton" onClick={handleSendOtp}>
              Send OTP
            </button>
          </>
        ) : !otpVerified ? (
          <>
            <h2 className="title">Enter OTP</h2>
            <p className="description">Check your email for the OTP.</p>
            <input
              type="text"
              placeholder="Enter OTP"
              className="inputField"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            {error && <p className="errorText">{error}</p>}
            <button className="submitButton" onClick={handleVerifyOtp}>
              Verify OTP
            </button>
          </>
        ) : (
          <>
            <h2 className="title">Reset Password</h2>
            <p className="description">Enter your new password.</p>
            <input
              type="password"
              placeholder="New Password"
              className="inputField"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {error && <p className="errorText">{error}</p>}
            <button className="submitButton" onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}

        <p className="backToLogin" onClick={() => router.push("/Login")}>
          Back to Login
        </p>
      </div>

      {/* ✅ Success Popup */}
      {showSuccessPopup && (
        <div className="successPopup">
          <p>✅ Password changed successfully!</p>
          <button className="okButton" onClick={handleSuccessClose}>
            OK
          </button>
        </div>
      )}

      {/* ✅ CSS Styling */}
      <style jsx>{`
        .forgot-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to right, #ff7e5f, #feb47b);
        }

        .forgot-card {
          background: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          width: 100%;
          max-width: 400px;
        }

        .title {
          font-size: 24px;
          font-weight: bold;
          color: #333;
          margin-bottom: 10px;
        }

        .description {
          font-size: 14px;
          color: #666;
          margin-bottom: 15px;
        }

        .inputField {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 16px;
        }

        .submitButton {
          width: 100%;
          padding: 12px;
          background: #ff5e00;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s;
        }

        .submitButton:hover {
          background: #e04e00;
        }

        .backToLogin {
          cursor: pointer;
          color: #ff5e00;
          margin-top: 10px;
          display: inline-block;
        }

        .errorText {
          color: red;
          font-size: 14px;
          margin-top: -5px;
        }

        .successPopup {
          position: fixed;
          width: 80%;
          max-width: 320px;
          background: white;
          padding: 20px;
          text-align: center;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1000;
        }

        .okButton {
          background: #28a745;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
        }

        .okButton:hover {
          background: #218838;
        }

        @media (max-width: 768px) {
          .forgot-card {
            width: 90%;
          }

          .successPopup {
            width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
