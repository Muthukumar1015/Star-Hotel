"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/HeroSlider.module.css";
import "../styles/globals.css"
import BestSellingDishes from "../components/BestSellingDishes";
import TodaySpecialFood from "../components/TodaySpecialFood";
import FresheatMenu from "../components/FresheatMenu";
import ScrollingMenu from "../components/ScrollingMenu";
import SpecialOffer from "../components/SpecialOffer";
import ExpertChefs from "../components/ExpertChefs";


const slides = [
   {
      src: "/images/bannerThumb1_1.png",
      alt: "Spicy Fried Chicken",
      text: "SPICY FRIED CHICKEN",
   },
   {
      src: "/images/bannerThumb1_2.png",
      alt: "Chicago Deep Pizza King",
      text: "CHICAGO DEEP PIZZA KING",
   },
   {
      src: "/images/bannerThumb1_3.png",
      alt: "Chicago Deep Burger King",
      text: "CHICAGO DEEP BURGER KING",
   },
];

export default function HeroSlider() {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [direction, setDirection] = useState("right");

   useEffect(() => {
      const interval = setInterval(() => {
         setDirection((prev) => (prev === "right" ? "left" : "right"));
         setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 2500);
      return () => clearInterval(interval);
   }, []);

   return (
      <>
         {/* Hero Slider Section */}
         <div className={styles.heroContainer}>
            <div className={styles.bgOverlay}></div>

            {slides.map((slide, index) => (
               <div
                  key={index}
                  className={`${styles.slide} ${
                     index === currentSlide
                        ? direction === "right"
                           ? styles.enterRight
                           : styles.enterLeft
                        : styles.hidden
                  }`}
               >
                  {/* Text Section */}
                  <div className={styles.textSection}>
                     <h2 className={styles.title}>{slide.text}</h2>
                     <button className={styles.orderButton}>Order Now</button>
                  </div>

                  {/* Image Section */}
                  <div className={styles.imageSection}>
                     <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={600}
                        height={400}
                        className={styles.image}
                     />
                  </div>
               </div>
            ))}
         </div>

         {/* Popular Food Items Section */}
         <PopularFoodItems />

         {/* Special Offers Card Section */}
         <SpecialOffers />
         <BestSellingDishes />
         <TodaySpecialFood />
         <FresheatMenu />
         <ScrollingMenu />
        <SpecialOffer />
        <ExpertChefs />
         
      </>
   );
}

function PopularFoodItems() {
   const [textVisible, setTextVisible] = useState(false);
   const foodItems = [
      {
         src: "/images/item1.png",
         alt: "Food Item 1",
         text: "Delicious Burger",
      },
      { src: "/images/item2.png", alt: "Food Item 2", text: "Crispy Fries" },
      { src: "/images/item3.png", alt: "Food Item 3", text: "Cheesy Pizza" },
      { src: "/images/item4.png", alt: "Food Item 4", text: "Tasty Pasta" },
      {
         src: "/images/item1.png",
         alt: "Food Item 1",
         text: "Delicious Burger",
      },
      { src: "/images/item2.png", alt: "Food Item 2", text: "Crispy Fries" },
      { src: "/images/item3.png", alt: "Food Item 3", text: "Cheesy Pizza" },
      { src: "/images/item4.png", alt: "Food Item 4", text: "Tasty Pasta" },
      {
         src: "/images/item1.png",
         alt: "Food Item 1",
         text: "Delicious Burger",
      },
      { src: "/images/item2.png", alt: "Food Item 2", text: "Crispy Fries" },
      { src: "/images/item3.png", alt: "Food Item 3", text: "Cheesy Pizza" },
      { src: "/images/item4.png", alt: "Food Item 4", text: "Tasty Pasta" },
      {
         src: "/images/item1.png",
         alt: "Food Item 1",
         text: "Delicious Burger",
      },
      { src: "/images/item2.png", alt: "Food Item 2", text: "Crispy Fries" },
   ];

   useEffect(() => {
      const handleScroll = () => {
         if (window.scrollY > 100) {
            setTextVisible(true);
         } else {
            setTextVisible(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <div className={styles.popularFoodContainer}>
         <h2 className={styles.sectionTitle}>Popular Food Items</h2>
         <div className={styles.foodSlider}>
            {foodItems.map((food, index) => (
               <div key={index} className={styles.foodItem}>
                 
                  <Image
                     src={food.src}
                     alt={food.alt}
                     width={150}
                     height={150}
                     className={styles.foodImage}
                  />
                  <p
                     className={`${styles.foodText} ${
                        textVisible ? styles.visible : styles.hidden
                     }`}
                  >
                     {food.text}
                  </p>
               </div>
            ))}
         </div>
      </div>
   );
}

/* 🔥 Special Offers Section */
function SpecialOffers() {
   const offerCards = [
      {
         src: "/images/offerThumb1.png",
         title: "SPICY FRIED CHICKEN",
         subtitle: "On This Week",
         description: "Limited Time Offer",
         buttonText: "ORDER NOW",
      },
      {
         src: "/images/offerThumb2.png",
         title: "TODAY SPECIAL FOOD",
         subtitle: "Welcome FreshEat",
         description: "Limited Time Offer",
         buttonText: "ORDER NOW",
      },
      {
         src: "/images/offerThumb3.png",
         title: "SPECIAL CHICKEN ROLL",
         subtitle: "On This Week",
         description: "Limited Time Offer",
         buttonText: "ORDER NOW",
      },
   ];

   return (
      <div className={styles.specialOffersContainer}>
         <div className={styles.specialOffersGrid}>
            {offerCards.map((offer, index) => (
               <div key={index} className={styles.offerCard}>
                  {/* ✅ 50% OFF Badge */}
                  <div className={styles.offerBadge}>
                     <Image
                        src="/images/offerShape4.png"
                        alt="50% OFF"
                        width={60}
                        height={60}
                     />
                  </div>

                  {/* Offer Image */}
                  <Image
                     src={offer.src}
                     alt={offer.title}
                     width={400}
                     height={200}
                     className={styles.offerImage}
                  />

                  {/* Offer Text */}
                  <div className={styles.offerText}>
                     <p className={styles.subtitle}>{offer.subtitle}</p>
                     <h3 className={styles.offerTitle}>{offer.title}</h3>
                     <p className={styles.description}>{offer.description}</p>
                     <button className={styles.orderButton}>
                        {offer.buttonText}
                     </button>
                  </div>
               </div>
            ))}
         </div>

         <div className={styles.heroContainer1}>
            {/* Left Image Container */}
            <div className={styles.leftImageContainer}>
               <Image
                  src="/images/aboutShape4.png"
                  alt="People enjoying food"
                  width={400}
                  height={400}
                  className={styles.curvedImage}
               />
               {/* Circular Image Overlay */}
               <div className={styles.circularImageWrapper1}>
                  <Image
                     src="/images/aboutShape2.png"
                     alt="Decorative Circular Image"
                     width={100}
                     height={100}
                     className={styles.circularImage1}
                  />
               </div>
            </div>

            {/* Text Container */}
            <div className={styles.textContainer}>
               <p className={styles.sectionTag}>ABOUT US 🍔</p>
               <h2 className={styles.title1}>
                  Variety Of Flavours From American Cuisine
               </h2>
               <p className={styles.description1}>
                  It is a long established fact that a reader will be distracted
                  the readable content of a page when looking at layout the
                  point established fact that.
               </p>
               <button className={styles.orderButton1}>ORDER NOW ➜</button>
            </div>

            {/* Right Image Container */}
            <div className={styles.rightImageContainer}>
               <Image
                  src="/images/aboutShape3.png"
                  alt="Woman enjoying meal"
                  width={400}
                  height={400}
                  className={styles.curvedImage}
               />
               {/* Circular Image Overlay */}
               <div className={styles.circularImageWrapper2}>
                  <Image
                     src="/images/aboutShape1.png"
                     alt="Decorative Circular Image"
                     width={100}
                     height={100}
                     className={styles.circularImage1}
                  />
               </div>
            </div>
         </div>
      </div>
      
   );
}
