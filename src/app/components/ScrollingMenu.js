import styles from "../styles/ScrollingMenu.module.css"; // Separate CSS file

const ScrollingMenu = () => {
  return (
    <div className={styles.scrollingMenu}>
      <div className={styles.menuList}>
        <span className={styles.menuItem}>BURGER</span>
        <span className={styles.menuItem}>CHICKEN PIZZA</span>
        <span className={styles.menuItem}>GRILLED CHICKEN</span>
        <span className={styles.menuItem}>FRESH PASTA</span>
        <span className={styles.menuItem}>ITALIANO</span>
        <span className={styles.menuItem}>FRENCH FRY</span>
      </div>
    </div>
  );
};

export default ScrollingMenu;
