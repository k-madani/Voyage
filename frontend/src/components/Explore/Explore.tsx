import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import './Explore.css'; // Make sure to import your CSS file
import paris from '../../assets/paris.jpeg';
import rome from '../../assets/rome.jpeg';
import turkey from '../../assets/turkey.jpeg';
import dubai from '../../assets/duabai2.jpeg';
import taj from '../../assets/tajmahal.jpeg';
import sydney from '../../assets/sydney.jpeg';
import bali from '../../assets/bali.jpeg';
import nyc from '../../assets/New york.jpeg';
import { useTranslation } from 'react-i18next';

const Explore: React.FC = () => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<null | "right" | "left">(null);
  const images = [
    paris,
    rome,
    turkey,
    sydney,
    nyc,
    taj,
    bali,
    dubai
  ];
  const imagesTitle = [
    t('user.paris'),
    t('user.rome'),
    t('user.turkey'),
    t('user.sydney'),
    t('user.ny'),
    t('user.delhi'),
    t('user.balu'),
    t('user.dubai')
  ];

  const slideVariants = {
    hiddenRight: {
      x: "100%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    },
  };

  const slidersVariants = {
    hover: {
      scale: 1.2,
      backgroundColor: "#a8bfe3",
    },
  };

  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      y: -10,
      scale: 1.2,
      transition: { type: "spring", stiffness: 1000, damping: "10" },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-images">
        <AnimatePresence>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
          />
          <div className="overlay">
            <h2>{imagesTitle[currentIndex]}</h2>
            <button className="explore-button">{t('user.explore')}</button>
          </div>
        </AnimatePresence>
        <div className="slide_direction">
          <motion.div
            variants={slidersVariants}
            whileHover="hover"
            className="left"
            onClick={handlePrevious}
          >
            &lt;
          </motion.div>
          <motion.div
            variants={slidersVariants}
            whileHover="hover"
            className="right"
            onClick={handleNext}
          >
            &gt;
          </motion.div>
        </div>
      </div>
      <div className="carousel-indicator">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
