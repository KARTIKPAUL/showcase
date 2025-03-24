"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export interface CarouselItem {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface CaseCarouselProps {
  items: CarouselItem[];
}

const CaseCarousel = ({ items }: CaseCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // Auto-rotate every 5 seconds, pauses on hover
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [isPaused]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -500 : 500,
      opacity: 0,
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex w-full items-center justify-center">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-7xl"
        >
          <div className="relative w-full">
            {/* Animated background blob */}
            <motion.div
              className="absolute -left-6 -top-6 h-48 w-48 rounded-full bg-blue-500/20 mix-blend-multiply blur-xl filter dark:bg-blue-400/20"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 10, 0],
                y: [0, 15, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.div
              className="relative overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.2)",
              }}
              onHoverStart={() => setIsPaused(true)}
              onHoverEnd={() => setIsPaused(false)}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.6, type: "tween" }}
                  className="group relative h-[400px]"
                >
                  <Image
                    src={items[activeIndex].src}
                    width={600}
                    height={700}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                    alt={items[activeIndex].alt}
                    priority
                    sizes="(max-width: 1280px) 90vw, 1280px"
                  />

                  {/* Hover content with animated text */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end  opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    initial="hidden"
                    whileInView="visible"
                    variants={textVariants}
                  >
                    <motion.div
                      className="rounded-lg bg-black/40 p-4 backdrop-blur-sm"
                      variants={itemVariants}
                    >
                      <motion.h3
                        className="mb-2 text-3xl font-bold text-white"
                        variants={itemVariants}
                      >
                        {items[activeIndex].title}
                      </motion.h3>
                      <motion.p
                        className="text-lg text-white/90"
                        variants={itemVariants}
                      >
                        {items[activeIndex].description}
                      </motion.p>
                      <motion.button
                        variants={itemVariants}
                        className="mt-4 rounded-full bg-blue-600 px-6 py-2 font-medium text-white transition-all hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls - Enhanced */}
              <div className="absolute top-1/2 flex w-full -translate-y-1/2 justify-between px-4">
                <motion.button
                  onClick={prevSlide}
                  className="rounded-full bg-white/30 p-3 text-gray-800 backdrop-blur-sm transition-all hover:bg-white/70"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  onClick={nextSlide}
                  className="rounded-full bg-white/30 p-3 text-gray-800 backdrop-blur-sm transition-all hover:bg-white/70"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Enhanced Indicator Dots */}
              <div className="absolute bottom-4 flex w-full justify-center gap-2">
                {items.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`h-3 w-3 rounded-full ${
                      index === activeIndex ? "bg-blue-600" : "bg-white/50"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  />
                ))}
              </div>

              {/* Enhanced Floating Element */}
              <motion.div
                className="absolute -bottom-6 -right-6"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CaseCarousel;
