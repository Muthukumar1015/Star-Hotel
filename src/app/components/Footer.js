'use client';

import { FaFacebookF, FaLinkedinIn, FaInstagram, FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Footer.module.css'; // Importing custom CSS

export default function Footer() {
  return (
    <footer className={`position-relative ${styles.footer}`}>
      {/* Top Orange Section */}
      <div className={`container ${styles.footerTop}`}>
        <div className="row text-center">
          <div className="col-md-4">
            <h6>Address</h6>
            <p>Dubai Kuruku Sandhu</p>
          </div>
          <div className="col-md-4">
            <h6>Send Email</h6>
            <p>vanakam da mapla.@gmail.com</p>
          </div>
          <div className="col-md-4">
            <h6>Call Emergency</h6>
            <p>+91 8148835997</p>
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
            <div className="d-flex">
              <a href="#" className="text-white me-2"><FaFacebookF /></a>
              <a href="#" className="text-white me-2"><FaLinkedinIn /></a>
              <a href="#" className="text-white"><FaInstagram /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>» <a href="#" className="text-white">About Us</a></li>
              <li>» <a href="#" className="text-white">Our Gallery</a></li>
              <li>» <a href="#" className="text-white">Our Blogs</a></li>
              <li>» <a href="#" className="text-white">FAQ's</a></li>
              <li>» <a href="#" className="text-white">Contact Us</a></li>
            </ul>
          </div>

          {/* Our Menu */}
          <div className="col-md-2">
            <h6>Our Menu</h6>
            <ul className="list-unstyled">
              <li>» <a href="#" className="text-white">Burger King</a></li>
              <li>» <a href="#" className="text-white">Pizza King</a></li>
              <li>» <a href="#" className="text-white">Fresh Food</a></li>
              <li>» <a href="#" className="text-white">Vegetable</a></li>
              <li>» <a href="#" className="text-white">Desserts</a></li>
            </ul>
          </div>

          {/* Contact & Subscription */}
          <div className="col-md-4">
            <h6>Contact Us</h6>
            <p>Monday - Friday: <span className="text-warning">8am - 4pm</span></p>
            <p>Saturday: <span className="text-warning">8am - 12am</span></p>
            <div className={`d-flex ${styles.subscribeBox}`}>
              <input type="email" placeholder="Your email address" />
              <button><FaArrowRight /></button>
            </div>
            <div className="mt-2">
              <input type="checkbox" id="privacy-policy" />
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

      {/* Floating Image with Animation */}
      <img src="/images/footer-right.png" alt="Decor" className={`${styles.floatingImage}`} />
    </footer>
  );
}
