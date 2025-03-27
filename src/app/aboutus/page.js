"use client";
import styles from "./About.module.css";
import Image from "next/image";
import { FaApple, FaGooglePlay, FaClock, FaUtensils, FaMotorcycle, FaStar, FaDownload } from "react-icons/fa"; // Import extra icons
import phone from "/public/images/phone1.png"; // Phone image
import foodTop from "/public/images/pachamilagai.png"; // Top-left food image
import foodBottom from "/public/images/burger-shape.png"; // Bottom-left food image

export default function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      {/* Left Side Content */}
      <div className={styles.leftContent}>
        <h2>Download Food App <br /> Order Today!</h2>
        <p className={styles.subText}>
          Get your favorite meals delivered fast, hot, and fresh.  
          Easy ordering, exclusive discounts, and a variety of dishes just for you!  
        </p>
        <div className={styles.downloadButtons}>
          {/* App Store Button with Icon */}
          <a href="#" className={`${styles.downloadButton} ${styles.appStore}`}>
            <FaApple className={styles.icon} /> Get it on APP STORE
          </a>
          {/* Play Store Button with Icon */}
          <a href="#" className={`${styles.downloadButton} ${styles.googlePlay}`}>
            <FaGooglePlay className={styles.icon} /> Get it on GOOGLE PLAY
          </a>
        </div>
        {/* Extra Features Section */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <FaClock className={styles.featureIcon} />
            <p>24/7 Fast Delivery</p>
          </div>
          <div className={styles.feature}>
            <FaUtensils className={styles.featureIcon} />
            <p>Best Quality Foods</p>
          </div>
          <div className={styles.feature}>
            <FaMotorcycle className={styles.featureIcon} />
            <p>Instant Order Tracking</p>
          </div>
        </div>
      </div>

      {/* Right Side Content (Phone & Extra Effects) */}
      <div className={styles.rightContent}>
        <div className={styles.phoneContainer}>
          {/* Phone Image with Glow Effect */}
          <div className={styles.phoneGlow}>
            <Image src={phone} alt="App Screenshot" className={styles.phoneImage} />
          </div>
          {/* 4.9 Rating Badge */}
          <div className={styles.ratingBadge}>
            <FaStar className={styles.ratingIcon} /> 4.9 Rating
          </div>
          {/* 10M+ Downloads Badge */}
          <div className={styles.downloadBadge}>
            <FaDownload className={styles.downloadIcon} /> 10M+ Downloads
          </div>
        </div>
      </div>

      {/* Background Food Images */}
      <Image src={foodTop} alt="Food Decoration" className={`${styles.foodElement} ${styles.leftTop}`} />
      <Image src={foodBottom} alt="Food Decoration" className={`${styles.foodElement} ${styles.leftBottom}`} />
    </section>
  );
}
