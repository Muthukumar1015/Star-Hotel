"use client"
import React, { useState, useEffect } from "react";
import styles from "./ContactUs.module.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Save data to localStorage with timestamp
    const now = new Date().getTime();
    localStorage.setItem(
      "contactFormData",
      JSON.stringify({ ...formData, timestamp: now })
    );

    // Show popup
    setShowPopup(true);

    // Clear form fields
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Hide popup after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  // Function to check and clear expired localStorage data
  useEffect(() => {
    const storedData = localStorage.getItem("contactFormData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const now = new Date().getTime();

      // 24 hours = 86400000 milliseconds
      if (now - parsedData.timestamp > 86400000) {
        localStorage.removeItem("contactFormData");
      }
    }
  }, []);

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        {/* Contact Info Boxes */}
        <div className={styles.infoBoxes}>
          <div className={styles.infoBox}>
            <FaMapMarkerAlt className={styles.icon} />
            <h4>Our Address</h4>
            <p>4517 Washington Ave, Manchester, Kentucky 39495</p>
          </div>
          <div className={styles.infoBox}>
            <FaEnvelope className={styles.icon} />
            <h4>Email Us</h4>
            <p>Info@Example.Com</p>
          </div>
          <div className={styles.infoBox}>
            <FaPhoneAlt className={styles.icon} />
            <h4>Call Us</h4>
            <p>Hot: +208-666-01112</p>
          </div>
          <div className={styles.infoBox}>
            <FaClock className={styles.icon} />
            <h4>Opening Hours</h4>
            <p>Sun-Fri: 9 AM - 6 PM | Sat: 9 AM - 4 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactWrapper}>
          <div className={styles.imageSection}>
            <img src="/images/contactThumb.png" alt="Food" />
          </div>

          <div className={styles.formSection}>
            <h3>Get In Touch</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                required
              ></textarea>

              {/* Checkbox */}
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  I agree to the terms and conditions of contacting support.
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                SUBMIT NOW →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showPopup && (
        <div className={styles.popup}>
          <p>✅ Message sent successfully!</p>
        </div>
      )}
    </section>
  );
};

export default ContactUs;
