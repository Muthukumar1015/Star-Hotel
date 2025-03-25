import React, { useState, useEffect } from "react";
import styles from "../styles/SpecialOffer.module.css";

const SpecialOffer = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({
    days: 282,
    hours: 5,
    minutes: 50,
    seconds: 11,
  });

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else {
          if (minutes > 0) {
            minutes -= 1;
            seconds = 59;
          } else if (hours > 0) {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          } else if (days > 0) {
            days -= 1;
            hours = 23;
            minutes = 59;
            seconds = 59;
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.specialOffer}>
    {/* Left Side - Main Image */}
<div className={styles.offerImage}>
{/* Rotating Top-Left Image */}
<img src="/images/timerShape1.svg" alt="Rotating" className={styles.rotatingImage} />

{/* Main Burger Image */}
<img src="/images/bargar oofer.png" alt="Burger" className={styles.mainImage} />


      {/* Right Side - Offer Content */}
      <div className={styles.offerContent}>
        <p className={styles.specialOfferTitle}>🔥 SPECIAL OFFER 🔥</p>
        <h2 className={styles.offerText}>Get 30% Discount Every Item</h2>

        {/* Countdown Timer */}
        <div className={styles.countdownTimer}>
          <div className={styles.timeBox}>
            <span>{timeLeft.days}</span>
            <p>DAYS</p>
          </div>
          <div className={styles.timeBox}>
            <span>{timeLeft.hours}</span>
            <p>HRS</p>
          </div>
          <div className={styles.timeBox}>
            <span>{timeLeft.minutes}</span>
            <p>MINS</p>
          </div>
          <div className={styles.timeBox}>
            <span>{timeLeft.seconds}</span>
            <p>SECS</p>
          </div>
        </div>

        {/* Order Now Button */}
        <button className={styles.orderNow}>
          ORDER NOW <span>➡</span>
        </button>
       

{/* Right-Bottom Floating Image */}

      </div>
    </div>
    <img src="/images/footer-right.png" alt="Right Top" className={styles.rightTop} />
    <img src="/images/pachamilagai.png" alt="Right Bottom" className={styles.rightBottom} />
    </div>
  );
};

export default SpecialOffer;

