'use client';

import { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== '' && isChecked) {
      setIsPopupOpen(true);
    }
  };

  return (
    <footer className={`position-relative ${styles.footer}`}>
      {/* Top Orange Section */}
      <div className={`container ${styles.footerTop}`}>
        <div className="row text-center">
          <div className="col-md-4">
            <h6>Address</h6>
            <p>Oppsite Medical College,Ariyalur</p>
          </div>
          <div className="col-md-4">
            <h6>Send Email</h6>
            <p></p>
          </div>
          <div className="col-md-4">
            <h6>Call Emergency</h6>
            <p>+91 8148888888</p>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="container">
        <div className="row mt-5">
          {/* Left Logo & Social Links */}
          <div className="col-md-4">
            <h5 className="fw-bold">FRESHEAT</h5>
            <p>Phasellus ultricies aliquam volutpat ullamcorper laoreet neque.</p>
            <div className={`d-flex ${styles.socialIcons}`}>
              <a href="#" className={styles.icon}><FaFacebookF /></a>
              <a href="#" className={styles.icon}><FaLinkedinIn /></a>
              <a href="#" className={styles.icon}><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Our Gallery</a></li>
              <li><a href="#">Our Blogs</a></li>
              <li><a href="#">FAQ's</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* Our Menu */}
          <div className="col-md-2">
            <h6>Our Menu</h6>
            <ul className="list-unstyled">
              <li><a href="#">Burger King</a></li>
              <li><a href="#">Pizza King</a></li>
              <li><a href="#">Fresh Food</a></li>
              <li><a href="#">Vegetable</a></li>
              <li><a href="#">Desserts</a></li>
            </ul>
          </div>

          {/* Contact & Subscription */}
          <div className="col-md-4">
            <h6>Contact Us</h6>
            <p>Monday - Friday: <span className="text-warning">8am - 4pm</span></p>
            <p>Saturday: <span className="text-warning">8am - 12am</span></p>
            <form onSubmit={handleSubscribe} className={`d-flex ${styles.subscribeBox}`}>
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" disabled={!isChecked}><FaArrowRight /></button>
            </form>
            <div className="mt-2">
              <input 
                type="checkbox" 
                id="privacy-policy" 
                checked={isChecked} 
                onChange={() => setIsChecked(!isChecked)} 
                required 
              />
              <label htmlFor="privacy-policy" className="ms-2">
                I agree to the <a href="#" className="text-warning">Privacy Policy</a>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`text-center py-3 ${styles.footerBottom}`}>
        <small>&copy; All Copyright 2024 by Mk</small>
        <div className="d-inline ms-3">
          <a href="#" className="btn btn-sm btn-light me-2">Terms & Condition</a>
          <a href="#" className="btn btn-sm btn-light">Privacy Policy</a>
        </div>
      </div>

      {/* Subscription Popup */}
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h3>Thank You for Subscribing!</h3>
            <p>We will send you the latest updates to <strong>{email}</strong>.</p>
            <button className={styles.popupClose} onClick={() => setIsPopupOpen(false)}>OK</button>
          </div>
        </div>
      )}

      {/* Floating Image with Animation */}
      <img src="/images/footer-right.png" alt="Decor" className={`${styles.floatingImage}`} />
    </footer>
  );
}
