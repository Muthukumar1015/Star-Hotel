import { useEffect, useState } from "react";
import styles from "../styles/MovingLogos.module.css"; // Import CSS module

const logos = [
   "/images/clientLogo1.png",
   "/images/clientLogo2.png",
   "/images/clientLogo3.png",
   "/images/clientLogo4.png",
   "/images/clientLogo5.png",
   "/images/clientLogo6.png",
   "/images/clientLogo1.png",
   "/images/clientLogo2.png",
   "/images/clientLogo3.png",
 ];

const MovingLogos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length);
    }, 1500); // Move every 1.5 seconds (1 sec stop + 0.5 sec transition)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.logoWrapper}>
      <div
        className={styles.logoTrack}
        style={{ transform: `translateX(-${currentIndex * 220}px)` }} // Adjust for centering
      >
        {logos.concat(logos).map((logo, index) => (
          <div key={index} className={styles.logoContainer}>
            <img src={logo} alt={`Logo ${index}`} className={styles.logo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovingLogos;



