'use client';

import { NextSeo } from 'next-seo';
import Image from 'next/image';  // Import Image component for optimization
import styles from '../styles/Service.module.css';

const services = [
  { icon: '/images/dining.png', title: 'Dining Guides' },
  { icon: '/images/fresh-food.png', title: '100% Fresh Food' },
  { icon: '/images/discounts.png', title: 'Special Offers And Discounts' },
  { icon: '/images/reviews.png', title: 'Restaurant Reviews' },
  { icon: '/images/events.png', title: 'Food Testing Events' },
  { icon: '/images/ordering.png', title: 'Online Ordering' },
];

const Service = () => {
  return (
    <>
      <NextSeo
        title="100% Fresh Food - Best Organic and Fresh Food Delivered to You | Star Hotel"
        description="Discover a wide range of fresh, organic food options delivered to your door. Order 100% fresh food and enjoy healthy, tasty meals at Star Hotel."
        canonical="https://star-hotel-seven.vercel.app/fresh-food"
        openGraph={{
          url: 'https://star-hotel-seven.vercel.app/fresh-food',
          title: '100% Fresh Food - Best Organic and Fresh Food Delivered to You | Star Hotel',
          description: 'Order fresh, organic food delivered to your door with a wide variety of options to choose from at Star Hotel.',
          images: [
            {
              url: '/images/fresh-food.png',
              alt: 'Fresh Food Icon',
              width: 800,
              height: 600,
            },
          ],
        }}
        twitter={{
          handle: '@yourhandle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <section className={styles.serviceSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>100% Fresh Food Delivered to You</h2>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>
                  <Image
                    src={service.icon}
                    alt={`Icon for ${service.title} - Our service for ${service.title.toLowerCase()}`}
                    className={styles.serviceIcon}
                    width={100}  // Specify image dimensions
                    height={100}  // Specify image dimensions
                  />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceText}>
                  {service.title === '100% Fresh Food'
                    ? 'Discover a wide range of fresh, organic food options delivered to your door. Enjoy healthy, tasty meals with our top-quality, 100% fresh food offerings.'
                    : 'Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Service;
