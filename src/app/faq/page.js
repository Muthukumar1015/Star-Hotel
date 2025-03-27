"use client"
import { useState } from 'react';
import styles from './faq.module.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'What Types Of Cuisines Do You Cover On This Blog?',
      answer: 'We cover a variety of cuisines, including Italian, Chinese, Indian, and more.'
    },
    {
      question: 'How Do You Choose The Restaurants You Review?',
      answer: 'We select restaurants based on quality, customer feedback, and unique offerings.'
    },
    {
      question: 'Do You Get Paid To Review Restaurants?',
      answer: 'Yes, restaurants that have recently opened often generate buzz, and reviewing them can provide timely content.'
    },
    {
      question: 'How Can I Find The Best Restaurants In My Area?',
      answer: 'You can explore our recommendations based on ratings, reviews, and local insights.'
    },
    {
      question: 'Can I Subscribe To Your Newsletter?',
      answer: 'Yes, you can subscribe to receive the latest restaurant reviews and food trends.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={styles.faqSection}>
      <div className={styles.container}>
        {/* Left Image */}
        <div className={styles.imageContainer}>
          <img src="/images/burger1.png" alt="FAQ Illustration" />
        </div>

        {/* FAQ Content */}
        <div className={styles.faqContent}>
          <h2>Frequently Ask Question</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqHeader}>
                <h4>{faq.question}</h4>
                <span>{activeIndex === index ? <FaMinus /> : <FaPlus />}</span>
              </div>
              {activeIndex === index && <p className={styles.faqAnswer}>{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
