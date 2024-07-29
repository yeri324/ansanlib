import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetailPage.css'; // 스타일 파일을 임포트합니다.
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';
import axios from 'axios';
import KeywordCloud_bookId from '../../../fragments/home/KeywordCloud_bookId';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { userId } = useAuth();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/book/detail/${id}`);
        console.log('Book Data:', response.data); // API 응답을 콘솔에 출력
        setBook(response.data);
        setBookList(response.data.relatedBooks || []);
      } catch (error) {
        setErrorMessage('도서 상세 정보를 가져오는 중 오류가 발생했습니다: ' + error.message);
      }
    };

    fetchBookDetails();
  }, [id, axios]);

  const alertLogin = () => {
    alert('로그인 후 이용가능합니다.');
    navigate('/login');
  };

  const handleReservation = (bookId) => {
    axios.post(`http://localhost:8090/reservation/new`)
      .then(response => {
        // 예약 성공 처리
      })
      .catch(error => {
        console.error('예약 중 오류 발생:', error);
      });
  };

  const handleInterest = async (bookId) => {
    try {
      await axios.post(`/api/book/interest/${userId}/${bookId}`);
      alert('관심도서에 추가되었습니다.');
    } catch (error) {
      console.error('Error adding book to interest:', error);
      alert('관심도서 추가 중 오류가 발생했습니다.');
    }
  };

  // 줄바꿈 문자를 <br /> 태그로 변환하는 함수
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
              <img
                src={`http://localhost:8090/images/book/${book.bookImg.imgName}`}
                alt={book.title}
                className="img-fluid cover-img"
              />
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
            <thead >
              <tr>
                <th style={{width:'25%'}}>위치</th>
                <th style={{width:'25%'}}>대출상태</th>
                <th style={{width:'25%'}}>반납예정일</th>
                <th style={{width:'25%'}}>서비스신청</th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((relatedBook) => (
                <tr key={relatedBook.id}>
                  <td >{relatedBook.libName}</td>
                  <td >{relatedBook.status==='AVAILABLE'?'대출 가능' :'대출 중'}</td>
                  <td >{relatedBook.returnDay}</td>
                  <td >
                    <div className="button-row">
                      <button disabled={relatedBook.status !== 'AVAILABLE'} onClick={() => window.location.href = `/reservation/new?id=${encodeURIComponent(book.id)}&title=${encodeURIComponent(book.title)}`}>
                        도서예약
                      </button>

                      <button onClick={(LOGIN_STATUS === "LOGGED_IN") ? () => handleInterest(relatedBook.id) : alertLogin}>
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
