import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetailPage.css'; // 스타일 파일을 임포트합니다.
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import RedirectLogin from '../../../helpers/RedirectLogin';
import Auth from '../../../helpers/Auth';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';
import KeywordCloud_bookId from '../../../fragments/home/KeywordCloud_bookId';
import axios from 'axios';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { userId,} = useAuth();
  

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
      <main className="bookDetail">

        <div className="breadcrumbs">
          <div className="page-header d-flex align-items-center">
            <div className="container position-relative">
              <div className="row d-flex justify-content-center">
                <div className="col-lg-6 text-center">
                  <h2>도서 상세정보</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="sample-page">
          <div className="content centered-content">
            {errorMessage && <p className="fieldError">{errorMessage}</p>}

            <div className="row g-0 book-detail-container">
              <div className="col-md-4 img-container">
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
              <div className="col-md-8 text-container">
                <div className="book-detail left-align">
                  <h5 className="card-title">제목 : 『{book.title}』</h5>
                  <p>저자 : 『{book.author}』</p>
                  <p>ISBN : 『{book.isbn}』</p>
                  <p>출판사 : 『{book.publisher}』 || 출판 날짜 : 『{book.pub_date}』 || 분류 코드 : 『{book.category_code}』</p>
                  <p>위치 : 『{book.libName}』</p>
                </div>
              </div>
            </div><br />

            <div className="row g-1 overflow-x-auto">

            <div className="row g-0 overflow-x-auto">
              <table className="table full-width">

                <thead className="table-dark">
                  <tr>
                    <th>위치</th>
                    <th>대출상태</th>
                    <th>반납예정일</th>
                    <th>서비스신청</th>
                  </tr>
                </thead>
                <tbody className="table-detail">
                  {bookList.map((relatedBook) => (
                    <tr key={relatedBook.id}>

                      <td style={{border: "1px solid black"}}>{relatedBook.libName}</td>
                      <td style={{border: "1px solid black"}}>{relatedBook.status ?? '정보 없음'}</td>
                      <td style={{border: "1px solid black"}}>{relatedBook.returnDay}</td>
                      <td style={{border: "1px solid black"}}>

                        <div className="card-body">
                          <div className="row">
                            <button disabled={relatedBook.status !== 'AVAILABLE'} onClick={alertLogin || (() => handleReservation(relatedBook.id))}>
                              도서예약
                            </button>
                          </div>
                          <div className="row">
                            <button onClick={(() => handleInterest(relatedBook.id))}>

                              관심도서담기
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div><br />

            <div className="row bookD">
              <div><h3>책소개</h3></div>
              <div className="left-align">{formatText(book.bookDetail)}</div>
            </div>
            <div className="key_wordcloud">
              <KeywordCloud_bookId bookId={id} />
            </div>
</div>
          </div>
        </section>
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
