"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, clearError } from "@/app/store/authSlice";
import { loadOrdersAfterLogin } from "@/app/store/orderSlice"; 
import { useRouter } from "next/navigation";
import { Button, Modal, Form, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const [popupMessage, setPopupMessage] = useState("");

  useEffect(() => {
    if (user) {
      dispatch(loadOrdersAfterLogin());
      router.push("/Your-Order"); // ✅ Redirect as soon as user logs in
    }
  }, [user, dispatch, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    dispatch(clearError());
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    if (isSignup) {
      if (formData.password !== formData.confirmPassword) {
        setPopupMessage("❌ Passwords do not match!");
        setShowPopup(true);
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

      setPopupMessage("✅ Signup Successful! Redirecting...");
      setShowPopup(true);
      setTimeout(() => router.push("/Your-Order"), 2000);

    } else {
      await dispatch(login({ email: formData.email, password: formData.password }));

      if (!error && user) {
        router.push("/Your-Order"); // ✅ Redirect immediately if login is successful
      } else {
        if (error === "User not found.") {
          setPopupMessage("❌ User not found. Please register first.");
        } else if (error === "Incorrect password.") {
          setPopupMessage("⚠️ Incorrect password. Reset your password.");
        } else {
          setPopupMessage("❌ Login failed. Try again.");
        }
        setShowPopup(true);
      }
      setIsLoggingIn(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <div className="p-4 rounded shadow-lg bg-white w-100" style={{ maxWidth: "400px" }}>
        {!isSignup ? (
          <Form onSubmit={handleAuth}>
            <h2 className="text-center mb-4">Login</h2>
            <Form.Group className="mb-3">
              <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            
            <p className="text-end text-primary" style={{ cursor: "pointer" }} onClick={() => router.push("/forgot-password")}>
              Forgot your password?
            </p>

            <Button type="submit" className="w-100" variant="warning" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
            <p className="text-center mt-3 text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignup(true)}>
              Don't have an account? Sign up
            </p>
          </Form>
        ) : (
          <Form onSubmit={handleAuth}>
            <h2 className="text-center mb-4">Signup</h2>
            <Form.Group className="mb-3">
              <Form.Control type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            </Form.Group>
            
            <Button type="submit" className="w-100" variant="success" disabled={isLoggingIn}>
              {isLoggingIn ? "Signing up..." : "Signup"}
            </Button>
            <p className="text-center mt-3 text-primary" style={{ cursor: "pointer" }} onClick={() => setIsSignup(false)}>
              Already have an account? Login
            </p>
          </Form>
        )}
      </div>

      {/* ✅ Bootstrap Modal Popup */}
      <Modal show={showPopup} onHide={() => setShowPopup(false)} centered>
        <Modal.Body className="text-center">
          <p className="mb-3">{popupMessage}</p>
          <Button variant="danger" onClick={() => {
            setShowPopup(false);
            if (popupMessage.includes("Reset your password")) {
              router.push("/forgot-password");
            } else if (popupMessage.includes("register first")) {
              setIsSignup(true);
            }
          }}>
            OK
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
