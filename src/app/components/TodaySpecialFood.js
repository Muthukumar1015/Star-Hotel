import Image from 'next/image';
import styles from '../styles/TodaySpecialFood.module.css';

const TodaySpecialFood = () => {
  return (
    <section className={styles.specialFood}>
        <Image 
          src="/images/leaf.png" 
          alt="Leaf" 
          width={80} 
          height={80} 
          className={`${styles.shake} ${styles.leafTop}`} 
        />
        <Image 
          src="/images/pachamilagai.png" 
          alt="Leaf" 
          width={80} 
          height={80} 
          className={`${styles.shake} ${styles.leafBottom}`} 
        />
      <div className={styles.textContent}>
        <p className={styles.welcome}>WELCOME FRESHEAT</p>
        <h2 className={styles.heading}>TODAY SPECIAL FOOD</h2>
        <p className={styles.offer}>Limits Time Offer</p>
        <button className={styles.orderBtn}>
          ORDER NOW <span>➡</span>
        </button>
      </div>

      {/* Floating Pizza */}
      <div className={styles.imageContainer}>
        <Image 
          src="/images/bannerThumb1_2.png" 
          alt="Special Pizza" 
          width={500} 
          height={300} 
          className={styles.pizzaImage}
        />

       

        {/* Shaking Leaves & Tomatoes */}
      
        <Image 
          src="/images/tomoto.png" 
          alt="Tomatoes" 
          width={100} 
          height={100} 
          className={`${styles.shake} ${styles.tomatoRight}`} 
        />
      </div>
    </section>
  );
};

export default TodaySpecialFood;
