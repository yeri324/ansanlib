import React, { useState, useEffect } from 'react';
import './Trends.css'; // Trends.css 파일을 임포트합니다.

const Trends = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // 추천도서 게시판의 최신 5개의 도서를 가져옵니다.
    const fetchBooks = async () => {
      const url = '/api/recommended-books'; // 실제 API 엔드포인트로 교체해야 합니다.
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.slice(0, 5));
    };

    fetchBooks();
  }, []);

  return (
    <div className="trend_board">
      <h2 className="board_title">추천도서</h2>
      <ul className="book_list">
        {books.map((book, index) => (
          <li key={index} className="book_item">
            <img src={book.image} alt={book.title} className="book_image" />
            <p className="book_title">{book.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trends;
