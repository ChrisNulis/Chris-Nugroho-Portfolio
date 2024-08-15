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
        <div className="card-container">
            <div className="card-picture"> {picture} </div>
            <div className="card-title"> {title} </div>
            <div className="card-buttons">
                {liveButton && <button className="card-button"> Live </button>}
                {gitButton && <button className="card-button"> Git </button>}
            </div>
        </div>
    );
};

export default Card;