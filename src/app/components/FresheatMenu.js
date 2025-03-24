"use client";

import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "@/app/store/menuSlice";
import styles from "../styles/FresheatMenu.module.css";

const FresheatMenu = () => {
  const dispatch = useDispatch();
  const { categories, menuItems, activeCategory } = useSelector((state) => state.menu);

  return (
    <section className={styles.menuSection}>
      {/* Background Images */}
      <div className={styles.leftBg}></div>
      <div className={styles.rightBg}></div>

      {/* Section Title */}
      <h2 className={styles.menuHeading}>
        <span className={styles.foodMenuIcon}>🍔</span> FOOD MENU <span className={styles.foodMenuIcon}>🍔</span>
      </h2>
      <h3 className={styles.mainHeading}>Fresheat Foods Menu</h3>

      {/* Category Tabs */}
      <div className={styles.tabs}>
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`${styles.tabButton} ${activeCategory === cat.name ? styles.active : ""}`}
            onClick={() => dispatch(setCategory(cat.name))}
          >
            <span className={styles.tabIcon}>{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      <hr className={styles.divider} />

      {/* Menu Items (Now Always Shows All 10 Items) */}
      <div className={styles.menuGrid}>
        {menuItems.map((item, index) => (
          <div key={index} className={styles.menuItem}>
            {/* Image and Name */}
            <div className={styles.itemDetails}>
              <img src={item.img} alt={item.name} className={styles.menuImg} />
              <div>
                <h4 className={`${styles.itemName} ${index === 0 ? styles.highlighted : ""}`}>
                  {item.name}
                </h4>
                <p className={styles.itemDesc}>It's a testament to our quality.</p>
              </div>
            </div>
            {/* Price */}
            <p className={styles.itemPrice}>{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FresheatMenu;
