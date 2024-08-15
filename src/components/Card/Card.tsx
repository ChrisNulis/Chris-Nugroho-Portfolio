"use client"; 
import React from 'react';
import './Card.css';

interface CardProps {
    id: number;
    picture: string;
    title: string;
    liveButton: boolean;
    gitButton: boolean;
}

const Card: React.FC<CardProps> = ({ picture, title, liveButton, gitButton }) => {
    return (
      <div className="card-wrapper">
        <div className="card-container">
          <div className="card-picture">{picture}</div>
          <div className="card-buttons">
            <button
              className="card-button"
              style={{ visibility: liveButton ? 'visible' : 'hidden' }}
            >
              Live
            </button>
            <button
              className="card-button"
              style={{ visibility: gitButton ? 'visible' : 'hidden' }}
            >
              Git
            </button>
          </div>
        </div>
        <div className="card-title">{title}</div>
      </div>
    );
  };

export default Card;