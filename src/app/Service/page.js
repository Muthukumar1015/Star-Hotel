import styles from "./Service.module.css";
import Head from "next/head";
import { useEffect } from "react";

const services = [
  { icon: "/images/dining.png", title: "Dining Guides" },
  { icon: "/images/fresh-food.png", title: "100% Fresh Food" },
  { icon: "/images/discounts.png", title: "Special Offers And Discounts" },
  { icon: "/images/reviews.png", title: "Restaurant Reviews" },
  { icon: "/images/events.png", title: "Food Testing Events" },
  { icon: "/images/ordering.png", title: "Online Ordering" },
];

const Service = () => {
  useEffect(() => {
    // Structured Data (JSON-LD) for SEO enhancement
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "100% Fresh Food",
      "description": "Discover a wide range of fresh, organic food options delivered to your door. Order 100% fresh food and enjoy healthy, tasty meals from Star Hotel.",
      "serviceType": "Fresh Food Delivery",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "price": "Varies depending on selection",
      },
      "url": "https://star-hotel-seven.vercel.app/fresh-food",
      "image": "/images/fresh-food.png",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => document.head.removeChild(script);
  }, []);

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <title>100% Fresh Food - Best Organic and Fresh Food Delivered to You | Star Hotel</title>
        <meta
          name="description"
          content="Discover a wide range of fresh, organic food options delivered to your door. Order 100% fresh food and enjoy healthy, tasty meals at Star Hotel."
        />
        <meta
          name="keywords"
          content="100% fresh food, organic food delivery, fresh food, best fresh food, healthy food delivery, fresh groceries, fresh food online"
        />
        
        {/* Open Graph Meta Tags for Social Sharing */}
        <meta property="og:title" content="100% Fresh Food - Best Organic and Fresh Food Delivered to You | Star Hotel" />
        <meta
          property="og:description"
          content="Order fresh, organic food delivered to your door with a wide variety of options to choose from at Star Hotel."
        />
        <meta property="og:image" content="/images/fresh-food.png" />
        <meta property="og:url" content="https://star-hotel-seven.vercel.app/fresh-food" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="100% Fresh Food - Best Organic and Fresh Food Delivered to You | Star Hotel" />
        <meta name="twitter:description" content="Order fresh, organic food delivered to your door with a wide variety of options to choose from at Star Hotel." />
        <meta name="twitter:image" content="/images/fresh-food.png" />
      </Head>

      {/* Service Section */}
      <section className={styles.serviceSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>100% Fresh Food Delivered to You</h2>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <div key={index} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>
                  <img
                    src={service.icon}
                    alt={`Icon for ${service.title} - Our service for ${service.title.toLowerCase()}`}
                    className={styles.serviceIcon}
                  />
                </div>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceText}>
                  {service.title === "100% Fresh Food"
                    ? "Discover a wide range of fresh, organic food options delivered to your door. Enjoy healthy, tasty meals with our top-quality, 100% fresh food offerings."
                    : "Detailed reviews of local eateries, covering various cuisines, price points, and dining experiences."
                  }
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
