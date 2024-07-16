import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BookDetailPage.css'; // 스타일 파일을 임포트합니다.
import BookImg from '../searchBookList/bookImg';

const BookDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

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
  }, [id]);

  const alertLogin = () => {
    alert('로그인 후 이용가능합니다.');
    navigate('/login');
  };

   //---------------------------
   const handleGetImg = async (book) => {
    const response = await axios.post('/getImg',{imgUrl : book.bookImg.imgUrl}, {responseType: 'arraybuffer'});
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);
    console.log(imageUrl,"***");
    return imageUrl;
  }
  

  //-------------------------

  const handleReservation = (bookId) => {
    axios.post(`http://localhost:8090/book/reservation/${bookId}`)
      .then(response => {
        // 예약 성공 처리
      })
      .catch(error => {
        console.error('예약 중 오류 발생:', error);
      });
  };

  const handleInterest = (bookId) => {
    axios.post(`http://localhost:8090/book/interest/${bookId}`)
      .then(response => {
        // 관심도서담기 성공 처리
      })
      .catch(error => {
        console.error('관심도서담기 중 오류 발생:', error);
      });
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
    <main>
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
        <nav>
          <div className="container">
            <ol>
              <li><a href="/">Home</a></li>
              <li><a href={`/book/search`}>도서관 상세 검색</a></li>
              <li>{book.title}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="sample-page">
        <div className="content centered-content">
          {errorMessage && <p className="fieldError">{errorMessage}</p>}

          <div className="row g-0 book-detail-container">
            <div className="col-md-4 img-container">
              {book.bookImg ? (
               <BookImg book={book}/>
              ) : (
                <div className="no-image">No Image</div>
              )}
            </div>
            <div className="col-md-8 text-container">
              <div className="card-body left-align">
                <h5 className="card-title">제목 : 『{book.title}』</h5>
                <p>저자 : 『{book.author}』</p>
                <p>ISBN : 『{book.isbn}』</p>
                <p>출판사 : 『{book.publisher}』 || 출판 날짜 : 『{book.pub_date}』 || 분류 코드 : 『{book.category_code}』</p>
                <p>위치 : 『{book.location}』</p>
              </div>
            </div>
          </div><br />

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
              <tbody>
                {bookList.map((relatedBook) => (
                  <tr key={relatedBook.id}>
                    <td>{relatedBook.location}</td>
                    <td>{relatedBook.status ?? '정보 없음'}</td>
                    <td>{relatedBook.returnDay}</td>
                    <td>
                      <div className="card-body">
                        <div className="row">
                          <button disabled={relatedBook.status !== 'AVAILABLE'} onClick={alertLogin || (() => handleReservation(relatedBook.id))}>
                            도서예약
                          </button>
                        </div>
                        <div className="row">
                          <button onClick={alertLogin || (() => handleInterest(relatedBook.id))}>
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
        </div>
      </section>
    </main>
  );
};

export default BookDetailPage;
