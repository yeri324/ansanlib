import React, { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import './new.css';
import book1 from '../../images/cover/book1.jpg';
import book2 from '../../images/cover/book2.jpg';
import book3 from '../../images/cover/book3.jpg';
import book4 from '../../images/cover/book4.jpg';
import book5 from '../../images/cover/book5.jpg';
import book6 from '../../images/cover/book6.jpg';
import book7 from '../../images/cover/book7.jpg';
import book8 from '../../images/cover/book8.jpg';

const booksData = [
  { id: 1, cover: book1 },
  { id: 2, cover: book2 },
  { id: 3, cover: book3 },
  { id: 4, cover: book4 },
  { id: 5, cover: book5 },
  { id: 6, cover: book6 },
  { id: 7, cover: book7 },
  { id: 8, cover: book8 }
];

const NewBooks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % booksData.length);
    }, 5000); // 5초마다 슬라이드 전환

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (currentIndex === 0 && isResetting) {
      setIsResetting(false);
    }
  }, [currentIndex, isResetting]);

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const handleNext = () => {
    if (currentIndex === booksData.length - 1) {
      setIsResetting(true);
      setTimeout(() => {
        setCurrentIndex(0);
      }, 100);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + booksData.length) % booksData.length);
  };

  return (
    <div className="new-books-container">
      <div className="new-books-slider" {...handlers}>
        <div className={`new-books-slide-wrapper ${isResetting ? 'reset' : ''}`} style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {booksData.map((book, index) => (
            <div key={book.id} className="new-book-item">
              <img src={book.cover} alt={`Book ${book.id}`} className="new-book-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewBooks;
