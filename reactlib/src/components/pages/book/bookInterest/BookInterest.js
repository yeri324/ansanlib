import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookInterest.css';

const BookInterest = () => {
  const [bookInterestList, setBookInterestList] = useState([]);

  useEffect(() => {
    const fetchBookInterestList = async () => {
      try {
        const response = await axios.get('/api/book/interest/list');
        console.log(response.data);  // API 호출 결과를 콘솔에 출력
        setBookInterestList(response.data);
      } catch (error) {
        console.error('관심도서 리스트를 가져오는 중 오류 발생:', error);
      }
    };

    fetchBookInterestList();
  }, []);

  const handleDeleteInterest = async (bookId) => {
    try {
      await axios.delete(`/api/book/interest/${bookId}`);
      setBookInterestList(prevList => prevList.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('관심도서 삭제 중 오류 발생:', error);
    }
  };

  const handleAddInterest = async (bookId) => {
    try {
      await axios.post(`/api/book/interest/${bookId}`);
      const response = await axios.get('/api/book/interest/list');
      setBookInterestList(response.data);
    } catch (error) {
      console.error('관심도서 추가 중 오류 발생:', error);
    }
  };

  return (
    <main>
      <div className="breadcrumbs">
        <div className="page-header d-flex align-items-center">
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>관심도서</h2>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href="/libUser/mypage">마이페이지</a></li>
              <li>관심도서</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="sample-page">
        <div className="content" style={{ textAlign: 'center' }}>
          {bookInterestList.length === 0 ? (
            <p>관심도서가 없습니다.</p>
          ) : (
            bookInterestList.map(book => (
              <div className="card mb-3" style={{ width: '100%' }} key={book.id}>
                <div className="row g-0">
                  <div className="col-md-2" style={{ border: '1px solid black' }}>
                    <img src={book.bookImg} className="img-fluid rounded-start" alt="책 이미지" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="col-md-5" style={{ border: '1px solid black' }}>
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p>{book.author}</p>
                      <p>{book.publisher} | {book.pubDate} | {book.categoryCode}</p>
                      <p>{book.location}</p>
                    </div>
                  </div>
                  <div className="col-md-1" style={{ border: '1px solid black' }}>
                    <p>{book.status}</p>
                  </div>
                  <div className="col-md-2" style={{ border: '1px solid black' }}>
                    <button onClick={() => handleDeleteInterest(book.id)}>관심도서 삭제</button>
                    <button onClick={() => handleAddInterest(book.id)}>관심도서 담기</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default BookInterest;
