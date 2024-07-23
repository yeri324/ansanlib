import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookInterest.css';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import RedirectLogin from '../../../helpers/RedirectLogin';
import Auth from '../../../helpers/Auth';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';

const BookInterest = ({ userId }) => {
  const [bookInterestList, setBookInterestList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (userId) {
      fetchBookInterestList(currentPage);
    }
  }, [userId, currentPage]);

  const fetchBookInterestList = async (page) => {
    try {
      const response = await axios.get(`/api/book/interest/interests/${userId}`, {
        params: { page, size: 10 }
      });
      setBookInterestList(response.data.bookInterests);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching book interest list:', error);
      setErrorMessage('관심도서 목록을 불러오는 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/book/interest/${id}`);
      fetchBookInterestList(currentPage);
    } catch (error) {
      console.error('Error deleting book interest:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <RedirectLogin />
      <Header />
      <main className="bookInterest">
        <div className="content" style={{ textAlign: 'center' }}>
          {errorMessage && <p className="fieldError">{errorMessage}</p>}
          {bookInterestList.length > 0 ? (
            bookInterestList.map((bookInterest) => (
              <div className="card mb-3" style={{ width: '100%' }} key={bookInterest.id}>
                <div className="row g-0">
                  <div className="col-md-2 img-container" style={{ border: '1px solid black' }}>
                    {bookInterest.book.bookImg ? (
                      <img src={`http://localhost:8090/images/book/${bookInterest.book.bookImg.imgName}`} alt="책 이미지" className="img-fluid cover-img" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="col-md-6 text-center" style={{ border: '1px solid black' }}>
                    <div className="card-body">
                      <h5 className="card-title">제목 : 『{bookInterest.book.title}』</h5>
                      <p>저자 : 『{bookInterest.book.author}』</p>
                      <p>ISBN : 『{bookInterest.book.isbn}』</p>
                      <p>출판사 : 『{bookInterest.book.publisher}』 || 출판 날짜 : 『{bookInterest.book.pub_date}』 || 분류 코드 : 『{bookInterest.book.category_code}』</p>
                      <p>위치 : 『{bookInterest.book.libName}』</p>
                    </div>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ border: '1px solid black' }}>
                    <p>{bookInterest.book.status}</p>
                  </div>
                  <div className="col-md-2 d-flex align-items-center justify-content-center" style={{ border: '1px solid black' }}>
                    <button onClick={() => handleDelete(bookInterest.id)}>관심도서 삭제</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>관심도서 목록이 없습니다.</p>
          )}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
              이전
            </button>
            <span>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
              다음
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const BookInterestWrapper = () => {
  const { userId } = useAuth();

  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <BookInterest userId={userId} />
      </Auth>
    </>
  );
};

export default BookInterestWrapper;
