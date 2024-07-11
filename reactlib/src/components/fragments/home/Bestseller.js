// BestsellerBoard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Bestseller.css';

const BestsellerBoard = () => {
  const [bestsellers, setBestsellers] = useState([]);

  useEffect(() => {
    axios.get('/api/books/bestsellers')
      .then(response => {
        setBestsellers(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the bestsellers!", error);
      });
  }, []);

  return (
    <div className="bestseller-board">
      <h1>베스트셀러 게시판</h1>
      <ul>
        {bestsellers.map(book => (
          <li key={book.id}>
            <h2>{book.title}</h2>
            <p>저자: {book.author}</p>
            <p>장르: {book.genre}</p>
            <p>판매량: {book.sales}</p>
            <p>출판일: {book.pub_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BestsellerBoard;
