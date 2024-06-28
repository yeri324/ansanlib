import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [bookList, setBookList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/detail/${id}`);
        setBook(response.data);
        setBookList(response.data.relatedBooks);
      } catch (error) {
        setErrorMessage('도서 상세 정보를 가져오는 중 오류가 발생했습니다: ' + error.message);
      }
    };

    fetchBookDetails();
  }, [id]);

  const alertLogin = () => {
    alert('로그인 후 이용가능합니다.');
  };

  const handleReservation = (bookId) => {
    axios.post(`/book/reservation/${bookId}`)
      .then(response => {
        // 예약 성공 처리
      })
      .catch(error => {
        console.error('예약 중 오류 발생:', error);
      });
  };

  const handleInterest = (bookId) => {
    axios.post(`/book/interest/${bookId}`)
      .then(response => {
        // 관심도서담기 성공 처리
      })
      .catch(error => {
        console.error('관심도서담기 중 오류 발생:', error);
      });
  };

  return (
    <main>
      <div className="breadcrumbs">
        <div className="page-header d-flex align-items-center" style={{ backgroundImage: "url('/img/page-header1.jpg')" }}>
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
              <li><a href="/book/search">통합검색</a></li>
              <li>{book.title}</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="sample-page">
        <div className="content" style={{ textAlign: 'center' }}>
          {errorMessage && <p className="fieldError">{errorMessage}</p>}

          <div className="row g-0">
            <div className="col-md-2" style={{ border: '1px solid black' }}>
              <img src={book.bookImg?.imgUrl} alt="..." className="img-fluid" width="100%" height="100px" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-10" style={{ border: '1px solid black' }}>
              <div className="card-body" style={{ textAlign: 'left' }}>
                <h5 className="card-title">{book.title}</h5>
                <p>{book.author}</p>
                <p>{`${book.publisher} | ${book.pub_date} | ${book.category_code}`}</p>
                <p>{book.location}</p>
              </div>
            </div>
          </div><br />

          <div className="row g-0" style={{ overflowX: 'auto' }}>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead className="table-dark">
                <tr>
                  <th>위치</th>
                  <th>대출상태</th>
                  <th>ISBN</th>
                  <th>반납예정일</th>
                  <th>서비스신청</th>
                </tr>
              </thead>
              <tbody>
                {bookList.map((relatedBook) => (
                  <tr key={relatedBook.id}>
                    <td>{relatedBook.location}</td>
                    <td>{relatedBook.status}</td>
                    <td>{relatedBook.isbn}</td>
                    <td>{relatedBook.return_day}</td>
                    <td>
                      <div className="card-body" style={{ textAlign: 'left' }}>
                        <div className="row">
                          <p>{relatedBook.status}</p>
                        </div>
                        <div className="row">
                          <button onClick={alertLogin}>도서예약</button>
                          <button disabled={relatedBook.status !== 'AVAILABLE'} onClick={() => handleReservation(relatedBook.id)}>도서예약</button>
                        </div>
                        <div className="row">
                          <button onClick={alertLogin}>관심도서담기</button>
                          <button onClick={() => handleInterest(relatedBook.id)}>관심도서담기</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div><br />

          <div className="row g-0">
            <div style={{ textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: book.detail }}></div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookDetailPage;
