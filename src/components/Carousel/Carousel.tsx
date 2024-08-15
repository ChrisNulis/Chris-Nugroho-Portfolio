"use client"; 
import React, { useRef, useCallback, useState, useEffect } from "react";
import { styled } from "@stitches/react";
import { motion } from "framer-motion";
import Card from "../Card/Card";
import { cards } from "../../constants";
import InfiniteSymbol from "../InfiniteSymbol/InfiniteSymbol";
import "./Carousel.css";

const InfiniteScrollLoop = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScrollHorizontal = useCallback(() => {
    if (scrollRef.current) {
      const scroll = scrollRef.current.scrollLeft;
      if (scroll >= width * 2 || scroll === 0) {
        scrollRef.current.scrollLeft = width + (scroll % width);
      }
      const newIndex = Math.round(scroll / width) % cards.length;
      setCurrentIndex(newIndex);
    }
  }, [width]);

  const onResize = useCallback((entries) => {
    for (let entry of entries) {
      setWidth(entry.contentRect.width);
    }
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setWidth(contentRef.current.offsetWidth);
      scrollRef.current!.scrollLeft = viewportWidth > 1280 ? width : 0;
    }
  }, [contentRef.current, width, viewportWidth]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      onResize(entries);
    });
    resizeObserver.observe(contentRef.current!);
    return () => resizeObserver.disconnect();
  }, [onResize]);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    const handleWindowResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div className="carousel-container">
      <div
        className="horizontal-container"
        ref={scrollRef}
        onScroll={viewportWidth > 1280 ? handleScrollHorizontal : null}
      >
        {viewportWidth > 1280 && (
          <div className="backup-container">
            {cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        )}
        <div className="main-container" ref={contentRef}>
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
        {viewportWidth > 1280 && (
          <div className="backup-container">
            {cards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        )}
      </div>
      <InfiniteSymbol currentIndex={currentIndex} totalCards={cards.length} />
    </div>
  );
};

export default InfiniteScrollLoop;