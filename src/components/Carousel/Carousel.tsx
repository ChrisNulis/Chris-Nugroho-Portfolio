"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Card from "../Card/Card";
import InfiniteSymbol from "../InfiniteSymbol/InfiniteSymbol";
import { cards } from "../../constants";
import "./Carousel.css";

const Carousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [isDragging, setIsDragging] = useState(false);
  const [currentX, setCurrentX] = useState(-300 * cards.length);
  const cardWidth = 300;
  const totalWidth = cardWidth * cards.length * 3;

  useEffect(() => {
    controls.set({ x: currentX });
    startInfiniteScroll();
  }, [controls, totalWidth]);

  const startInfiniteScroll = (resetPosition = false) => {
    const startX = resetPosition ? -totalWidth / 3 : currentX;
    controls.start({
      x: startX - totalWidth / 3,
      transition: {
        ease: "linear",
        duration: 25,
        repeat: Infinity,
        onUpdate: (latestX: number) => {
          setCurrentX(latestX); 
          if (latestX <= -totalWidth * 2 / 3) {
            controls.set({ x: latestX + totalWidth / 3 });
          }
        },
      },
    });
  };

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    startInfiniteScroll();
  };

  return (
    <div className="carousel-container">
      <div
        className="horizontal-container"
        ref={scrollRef}
        style={{
          overflowX: "hidden",
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <motion.div
          className="main-container"
          style={{ display: "flex" }}
          animate={controls}
          drag="x"
          dragConstraints={{ left: -totalWidth, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          {cards.concat(cards, cards).map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </motion.div>
      </div>
      <InfiniteSymbol currentIndex={0} totalCards={cards.length} />
    </div>
  );
};

export default Carousel;