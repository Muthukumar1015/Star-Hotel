import React from "react";
import styles from "./ContactUs.module.css";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from "react-icons/fa";

const ContactUs = () => {
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
            <h4>Info@Example.Com</h4>
            <p>Email us anytime for any kind of query.</p>
          </div>
          <div className={styles.infoBox}>
            <FaPhoneAlt className={styles.icon} />
            <h4>Hot: +208-666-01112</h4>
            <p>24/7 priority Live Chat and ticketing support.</p>
          </div>
          <div className={styles.infoBox}>
            <FaClock className={styles.icon} />
            <h4>Opening Hour</h4>
            <p>Sunday-Fri: 9 AM - 6 PM<br/>Saturday: 9 AM - 4 PM</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.contactWrapper}>
          <div className={styles.imageSection}>
            <img src="/images/contactThumb.png" alt="Food" />
          </div>

          <div className={styles.formSection}>
            <h3>Get In Touch</h3>
            <form>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email Address" required />
              </div>
              <div className={styles.inputGroup}>
                <input type="text" placeholder="Phone Number" required />
                <select required>
                  <option value="">Subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="support">Support</option>
                </select>
              </div>
              <textarea placeholder="Write your message here..." required></textarea>
              
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms">
                  Collaboratively formulate principle capital. Progressively evolve user.
                </label>
              </div>
              
              <button type="submit" className={styles.submitBtn}>
                SUBMIT NOW →
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
