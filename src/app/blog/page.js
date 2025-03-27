"use client"
import React, { useState } from "react";
import styles from "./Blog.module.css";
import { FaUser, FaTag } from "react-icons/fa"; // Icons for admin & category

// Sample Blog Data
const blogPosts = [
  {
    id: 1,
    date: "15 Dec",
    admin: "Admin",
    category: "Noodles",
    title: "Fast Food Frenzy A Taste Of Convenience",
    image: "/images/blog1.jpg",
    details: "Explore the world of fast food and its impact on convenience culture.",
  },
  {
    id: 2,
    date: "17 Dec",
    admin: "Admin",
    category: "Chicken",
    title: "Benefits Of Health And Safety Measures",
    image: "/images/blog2.jpg",
    details: "Learn about food safety measures that keep your meals healthy.",
  },
  {
    id: 3,
    date: "25 Dec",
    admin: "Admin",
    category: "Noodles",
    title: "Quick Cravings Unraveling Fast Food Delights",
    image: "/images/blog3.jpg",
    details: "A deep dive into the world of fast food and its irresistible flavors.",
  },
  {
    id: 4,
    date: "15 Dec",
    admin: "Admin",
    category: "Noodles",
    title: "Fast Food Frenzy A Taste Of Convenience",
    image: "/images/blog4.jpg",
    details: "Explore the world of fast food and its impact on convenience culture.",
  },
  {
    id: 5,
    date: "17 Dec",
    admin: "Admin",
    category: "Chicken",
    title: "Benefits Of Health And Safety Measures",
    image: "/images/blog5.jpg",
    details: "Learn about food safety measures that keep your meals healthy.",
  },
  {
    id: 6,
    date: "25 Dec",
    admin: "Admin",
    category: "Noodles",
    title: "Quick Cravings Unraveling Fast Food Delights",
    image: "/images/blog6.jpg",
    details: "A deep dive into the world of fast food and its irresistible flavors.",
  },
];

const Blog = () => {
  return (
    <section className={styles.blogSection}>
      <div className={styles.container}>
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <BlogCard key={post.id} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogCard = ({ image, title, date, admin, category, details }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={styles.blogCard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img src={image} alt={title} />
      <div className={styles.blogContent}>
        <span className={styles.dateBadge}>{date}</span>
        <div className={styles.blogMeta}>
          <FaUser className={styles.icon} /> {admin} 
          <FaTag className={styles.icon} /> {category}
        </div>
        <h4>{title}</h4>
        <a href="#">Read More →</a>
      </div>

      {hover && <div className={styles.blogHoverDetails}>{details}</div>}
    </div>
  );
};

export default Blog;
