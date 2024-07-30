import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './BookDetailPage.css';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';
import axios from 'axios';
import KeywordCloud_bookId from '../../../fragments/home/KeywordCloud_bookId';
import BookImg from '../searchBookList/bookImg';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [book, setBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = useAuth();

  const query = new URLSearchParams(location.search);
  const endDate = query.get('endDate');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/book/detail/${id}`);
        console.log('Book detail response data:', response.data);
        setBook(response.data);
        const updatedBookList = response.data.relatedBooks.map(book => ({
          ...book,
          returnDay: endDate ? endDate.split('T')[0] : null, // 쿼리 파라미터에서 받은 endDate를 변환하여 returnDay로 설정
          status: endDate ? 'LOAN' : book.status // returnDay가 있으면 상태를 LOAN으로 설정
        }));
        setBookList(updatedBookList);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setErrorMessage('도서 상세 정보를 가져오는 중 오류가 발생했습니다: ' + error.message);
      }
    };

    fetchBookDetails();
  }, [id, endDate]);

  const alertLogin = () => {
    alert('로그인 후 이용가능합니다.');
    navigate('/login');
  };

  const handleInterest = async (bookId) => {
    try {
      await axios.post(`/api/book/interest/${userId}/${bookId}`);
      alert('관심도서에 추가되었습니다.');
    } catch (error) {
      console.error('Error adding book to interest:', error);
      alert('로그인 후 이용 가능 합니다.');
      navigate(`/login`);
    }
  };

  const formatText = (text) => {
    if (!text) return null;
    return text.split('\n').map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Header />
      <div className='search-header'>
        <h2 className='search-header-name'>도서</h2>
      </div>
      <main className="bookDetail">
        {errorMessage && <p className="fieldError">{errorMessage}</p>}
        <div className="book-detail-container">
          <div className="book-img-container">
            {book.bookImg ? (
              <BookImg book={book} />
            ) : (
              <div className="no-image">No Image</div>
            )}
          </div>
          <div className="book-detail">
            <h5>{book.title}</h5>
            <p>{book.author}&nbsp;&nbsp;|&nbsp;&nbsp;{book.pub_date}</p>
            <p>{book.publisher}</p>
            <p>분류 코드 : {book.category_code}</p>
            <p>ISBN : {book.isbn}</p>
            <p>소장 : {book.libName}</p>
          </div>
        </div>

        <div className="lib-list">
          <table className="lib-table">
            <thead>
              <tr>
                <th style={{width:'25%'}}>위치</th>
                <th style={{width:'25%'}}>예약 상태</th>
                <th style={{width:'25%'}}>예약종료일</th>
                <th style={{width:'25%'}}>서비스신청</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((relatedBook) => (
                <tr key={relatedBook.id}>
                  <td>{relatedBook.libName}</td>
                  <td>{relatedBook.status === 'AVAILABLE' ? '예약 가능' : '예약 중'}</td>
                  <td>{relatedBook.returnDay || '정보 없음'}</td>
                  <td>
                    <div className="button-row">
                      <button disabled={relatedBook.status !== 'AVAILABLE'} onClick={() => window.location.href = `/reservation/new?id=${encodeURIComponent(book.id)}&title=${encodeURIComponent(book.title)}`}>
                        도서예약
                      </button>
                      <button onClick={() => handleInterest(relatedBook.id)}  >
                        관심도서담기
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div><br />

        <div className="bookD">
          <h3><span>책소개</span></h3>
          <div className="left-align">{formatText(book.bookDetail)}</div>
        </div>
        <KeywordCloud_bookId id={book.id} />
      </main>
      <Footer />
    </>
  );
};

const BookDetailPageWrapper = () => {
  return (
    <>
      <BookDetailPage />
    </>
  );
};

export default BookDetailPageWrapper;
