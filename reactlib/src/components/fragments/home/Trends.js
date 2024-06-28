import React from 'react';
import './trends.css';
import book1 from '../../images/cover/book1.jpg'
import book2 from '../../images/cover/book2.jpg'
import book3 from '../../images/cover/book3.jpg'
import book4 from '../../images/cover/book4.jpg'

const books = [
  { id: 1, title: 'Book 1', cover: book1 },
  { id: 2, title: 'Book 2', cover: book2 },
  { id: 3, title: 'Book 3', cover: book3 },
  { id: 4, title: 'Book 4', cover: book4 },
  // 필요한 만큼 책 추가
];

const Trends = () => {
  return (
    <div className="trends-container">
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <img src={book.cover} alt={book.title} className="book-cover" />
          <h3 className="book-title">{book.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Trends;
