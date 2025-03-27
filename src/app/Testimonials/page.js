import React from "react";
import styles from "./Testimonials.module.css"; // Import CSS module

const testimonials = [
  {
    id: 1,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 5,
    text: "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim...",
    shape: "shape1",
  },
  {
    id: 2,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 5,
    text: "Fusce quis diam odio Cras mattis mi quis tincidunt blandit nec sit amet...",
    shape: "shape2",
  },
  {
    id: 3,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    shape: "shape3",
  },
  {
    id: 4,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 5,
    text: "Penatibus magnis dis point parturient montes nascetur ridiculus mus Ut id lorem ac enim...",
    shape: "shape1",
  },
  {
    id: 5,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 5,
    text: "Fusce quis diam odio Cras mattis mi quis tincidunt blandit nec sit amet...",
    shape: "shape2",
  },
  {
    id: 6,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    shape: "shape3",
  },
  {
    id: 7,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 5,
    text: "Fusce quis diam odio Cras mattis mi quis tincidunt blandit nec sit amet...",
    shape: "shape2",
  },
  {
    id: 8,
    name: "Mr.GP",
    role: "Web Designer",
    image: "images/user.webp",
    rating: 4,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    shape: "shape3",
  },
];

const Testimonials = () => {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsGrid}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={`${styles.testimonialCard} ${styles[testimonial.shape]}`}>
            <div className={styles.testimonialHeader}>
              <img src={testimonial.image} alt={testimonial.name} className={styles.testimonialImage} />
              <div>
                <h4 className={styles.testimonialName}>{testimonial.name}</h4>
                <p className={styles.testimonialRole}>{testimonial.role}</p>
                <div className={styles.stars}>{"⭐".repeat(testimonial.rating)}</div>
              </div>
            </div>
            <p className={styles.testimonialText}>{testimonial.text}</p>
            <div className={styles.quoteIcon}>❝</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
