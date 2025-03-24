import React, { useState } from "react";
import styles from "../styles/BestSellingDishes.module.css";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const dishes = [
  { id: 1, name: "Chicken Fried Rice", price: "$100.99", img: "/images/dishes1.png" },
  { id: 2, name: "Chinese Pasta", price: "$15.99", img: "/images/dishes2.png" },
  { id: 3, name: "Chicken Pizza", price: "$26.99", img: "/images/dishes3.png" },
  { id: 4, name: "Chicken Noodles", price: "$39.00", img: "/images/dishes4.png" },
  { id: 5, name: "Grilled Chicken", price: "$20.99", img: "/images/dishes5.png" },
];

const BestSellingDishes = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className={styles.bestSellingDishes}>
      {/* Background images */}
      <img src="/images/milagai2.png" className={styles.bottomLeftImage} alt="Leaf" />
      <img src="/images/milagai.png" className={styles.topRightImage} alt="Chili" />

      <h4 className={styles.popularText}>🔥 Popular Dishes 🔥</h4>
      <h2 className={styles.heading}>Best Selling Dishes</h2>

      <div className={styles.dishContainer}>
        {dishes.map((dish) => (
          <div
            key={dish.id}
            className={`${styles.dishCard} ${hovered === dish.id ? styles.hovered : ""}`}
            onMouseEnter={() => setHovered(dish.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <img src={dish.img} alt={dish.name} className={styles.dishImage} />
            <h3 className={styles.dishName}>{dish.name}</h3>
            <p className={styles.dishDescription}>The Registration Fee</p>
            <p className={styles.dishPrice}>{dish.price}</p>

            {/* Hover Icons */}
            <div className={styles.hoverIcons}>
              <FaHeart className={styles.heartIcon} />
              <FaShoppingCart className={styles.cartIcon} />
            </div>
          </div>
        ))}
      </div>

      <button className={styles.viewAllBtn}>View All Items</button>
    </div>
  );
};

export default BestSellingDishes;
