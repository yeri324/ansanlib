import React, { useState, useEffect } from 'react';
import './BookSlider.css';
import BookImg from '../../pages/book/searchBookList/bookImg'



const BookSlider = ({bookList}) => {
  const itemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(0);


  const goToNextPage = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % Math.ceil(bookList.length / itemsPerPage));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + Math.ceil(bookList.length / itemsPerPage)) % Math.ceil(bookList.length / itemsPerPage));
  };

  const startIndex = currentPage * itemsPerPage;
  const visibleBooks = bookList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="bookSlider" className="slide-container">
      {visibleBooks.map((book) => (
        <div key={book.id} className="book-item">
          <BookImg book={book}/>
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

export default BookSlider;
