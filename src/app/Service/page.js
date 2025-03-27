import styles from "./Service.module.css";

const services = [
  { icon: "/images/dining.png", title: "Dining Guides" },
  { icon: "/images/fresh-food.png", title: "100% Fresh Food" },
  { icon: "/images/discounts.png", title: "Special Offers And Discounts" },
  { icon: "/images/reviews.png", title: "Restaurant Reviews" },
  { icon: "/images/events.png", title: "Food Testing Events" },
  { icon: "/images/ordering.png", title: "Online Ordering" },
];

const Service = () => {
  return (
    <section className={styles.serviceSection}>
      <div className="container">
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.iconWrapper}>
                <img src={service.icon} alt={service.title} className={styles.serviceIcon} />
              </div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceText}>
                Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
