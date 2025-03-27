import Link from 'next/link';
import styles from './Galleery.module.css';

const images = [
  "/images/dish1.jpg",
  "/images/dish2.jpg",
  "/images/dish3.jpg",
  "/images/dish4.jpg",
  "/images/dish5.jpg",
  "/images/dish6.jpg",
  "/images/dish7.jpg",
  "/images/dish8.jpg",
  "/images/dish9.jpg",
  "/images/dish10.jpg",
  "/images/dish11.jpg",
  "/images/dish12.jpg",
];

const Gallery = () => {
  return (
    <section className={styles.gallerySection}>
      <div className="container">
        <div className={styles.galleryGrid}>
          {images.map((image, index) => (
            <Link href="/shop" key={index}>
              <div className={styles.galleryItem}>
                <img src={image} alt={`Dish ${index + 1}`} className={styles.galleryImage} />
                <div className={styles.overlay}>
                  <span className={styles.arrow}>&#8594;</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
