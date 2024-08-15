"use client"; 
import React, { useState, useEffect } from 'react';
import './InfiniteSymbol.css';

interface InfiniteSymbolProps {
  currentIndex: number;
  totalCards: number;
}

const InfiniteSymbol: React.FC<InfiniteSymbolProps> = ({ currentIndex, totalCards }) => {
  const fillPercentage = (currentIndex / totalCards) * 100;

  return (
    <div className="infinite-symbol-container">
      <div
        className="infinite-symbol-fill"
        style={{ width: `${fillPercentage}%` }}
      ></div>
      <div className="infinite-symbol-track"></div>
    </div>
  );
};

export default InfiniteSymbol;