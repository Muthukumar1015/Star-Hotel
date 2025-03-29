"use client";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import styles from "./reservation.module.css";

const Reservation = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    phone: "",
    guests: "",
    message: "",
  });

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Set default date and time when component loads
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
    const formattedTime = currentDate.toTimeString().slice(0, 5); // HH:MM format

    setFormData((prevState) => ({
      ...prevState,
      date: formattedDate,
      time: formattedTime,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show confirmation popup
    setIsPopupOpen(true);
  };

  return (
    <section className={styles.reservationSection}>
      <div className={styles.container}>
        {/* Left Side - Get in Touch */}
        <div className={styles.contactInfo}>
          <h2>GET IN TOUCH</h2>
          <p>
            Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={styles.info}>
            <p><strong>Contact:</strong> +91 8148888888</p>
            <p><strong>Email:</strong>Mediacal collage opposite,ariyalur</p>
            <p><strong>Address:</strong> </p>
            <p><strong>Follow:</strong></p>
            <div className={styles.icons}>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className={styles.icon} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className={styles.icon} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className={styles.icon} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side - Reservation Form */}
        <div className={styles.formContainer}>
          <h2>
            Create An <span className={styles.highlight}>Reservation</span>
          </h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input className={`${styles.inputField} ${styles.dateInput}`} type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input className={`${styles.inputField} ${styles.timeInput}`} type="time" name="time" value={formData.time} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <input className={`${styles.inputField} ${styles.phoneInput}`} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required />
              <input className={`${styles.inputField} ${styles.guestInput}`} type="number" name="guests" value={formData.guests} onChange={handleChange} placeholder="Number of Guests" required />
            </div>
            <textarea name="message" placeholder="Write your message here..." value={formData.message} onChange={handleChange} className={styles.textarea}></textarea>
            <button type="submit" className={styles.bookButton}>BOOK A TABLE →</button>
          </form>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Confirm Your Reservation</h3>
            <p>Your provided number: <strong>{formData.phone}</strong></p>
            <p>Our staff will call you shortly to confirm your reservation.</p>
            <button className={styles.confirmButton} onClick={() => setIsPopupOpen(false)}>OK</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reservation;
