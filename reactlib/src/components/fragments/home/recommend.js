// src/recommend.js
import React, { useState, useEffect } from 'react';
import './recommend.css';

const CategorySlider = ({ title, books }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const moveSlide = (direction) => {
    let newIndex = currentSlideIndex + direction;
    if (newIndex >= books.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = books.length - 1;
    }
    setCurrentSlideIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1);
    }, 3000); // 3초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, [currentSlideIndex]);

  return (
    <div className="category-container">
      <h2>{title}</h2>
      <div className="slider">
        <div className="slides" style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}>
          {books.map((book, index) => (
            <div key={index} className="slide">
              <img src={book.image} alt={book.title} className="book-cover" />
              <p>{book.title}</p>
            </div>
          ))}
        </div>
        <button className="prev" onClick={() => moveSlide(-1)}>&#10094;</button>
        <button className="next" onClick={() => moveSlide(1)}>&#10095;</button>
      </div>
    </div>
  );
};

export default CategorySlider;
