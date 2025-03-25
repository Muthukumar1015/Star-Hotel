import React, { useState } from "react";
import styles from "../styles/ExpertChefs.module.css";
import { FaShareAlt, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const chefs = [
  {
    name: "Ralph Edwards",
    role: "Chef Lead",
    image: "/images/diwagar.jpeg",
  },
  {
    name: "Leslie Alexander",
    role: "Chef Assistant",
    image: "/images/gvm.jpeg",
  },
  {
    name: "Ronald Richards",
    role: "Chef Assistant",
    image: "/images/Cool-Suresh.jpg",
  },
];

const ExpertChefs = () => {
  const [hoveredChef, setHoveredChef] = useState(null);

  return (
    <section className={styles.expertChefs}>
      <p className={styles.sectionTitle}>🍽️ OUR CHEF 🍽️</p>
      <h2 className={styles.mainTitle}>Meet Our Expert Chefs</h2>

      <div className={styles.chefContainer}>
        {chefs.map((chef, index) => (
          <div
            key={index}
            className={styles.chefCard}
            onMouseEnter={() => setHoveredChef(index)}
            onMouseLeave={() => setHoveredChef(null)}
          >
            {/* Chef Image */}
            <div className={styles.chefImage}>
              <img src={chef.image} alt={chef.name} />
            </div>

            {/* Social Icons (Appear on Hover) */}
            <div
              className={`${styles.shareContainer} ${
                hoveredChef === index ? styles.show : ""
              }`}
            >
              <a href="#" className={`${styles.icon} ${styles.linkedin}`}>
                <FaLinkedinIn />
              </a>
              <div className={styles.shareIcon}>
                <FaShareAlt />
              </div>
              <a href="#" className={`${styles.icon} ${styles.facebook}`}>
                <FaFacebookF />
              </a>
            </div>

            {/* Chef Name & Role */}
            <h3 className={styles.chefName}>{chef.name}</h3>
            <p className={styles.chefRole}>{chef.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExpertChefs;
