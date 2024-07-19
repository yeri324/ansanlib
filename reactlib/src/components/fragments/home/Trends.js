import React, { useState, useEffect } from 'react';
import './Trends.css';
import book1 from '../../images/cover/book1.jpg';
import book2 from '../../images/cover/book2.jpg';
import book3 from '../../images/cover/book3.jpg';
import book4 from '../../images/cover/book4.jpg';
import book5 from '../../images/cover/book5.jpg';
import book6 from '../../images/cover/book6.jpg';
import book7 from '../../images/cover/book7.jpg';
import book8 from '../../images/cover/book8.jpg';

const booksData = [
  { id: 1, title: 'Book 1', cover: book1 },
  { id: 2, title: 'Book 2', cover: book2 },
  { id: 3, title: 'Book 3', cover: book3 },
  { id: 4, title: 'Book 4', cover: book4 },
  { id: 5, title: 'Book 5', cover: book5 },
  { id: 6, title: 'Book 6', cover: book6 },
  { id: 7, title: 'Book 7', cover: book7 },
  { id: 8, title: 'Book 8', cover: book8 }
];

const itemsPerPage = 4;

const Trends = () => {
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(booksData.length / itemsPerPage));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(booksData.length / itemsPerPage));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(booksData.length / itemsPerPage)) % Math.ceil(booksData.length / itemsPerPage));
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleBooks = booksData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="trends" className="trends-container">
      {visibleBooks.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.cover} alt={book.title} className="book-cover" />
          <h3 className="book-title">{book.title}</h3>
        </div>
      ))}
      <div className="pagination">
        <button className="btn_prev prev" onClick={goToPrevPage}>{'<'}</button>
        <button className="btn_next next" onClick={goToNextPage}>{'>'}</button>
      </div>
    </div>
  );
};

export default Trends;
