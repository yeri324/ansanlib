import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BookInterest.css';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import RedirectLogin from '../../../helpers/RedirectLogin';
import Auth from '../../../helpers/Auth';
import useAuth, { LOGIN_STATUS, } from '../../../hooks/useAuth';
import Side from '../../myPage/Side';
import useRealName from '../../../hooks/useRealName';
import { useNavigate } from 'react-router-dom';


const BookInterest = ({ userId }) => {
  const name = useRealName()
  const navigate = useNavigate();
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
      console.log(response.data)
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

  const onDetail = (e) => {
    navigate(`/book/detail/${e}`);
}

  return (
    <>
      <RedirectLogin />
      <Header />
      <div className="MyPage-body">
      <Side />
       <div className="mypage-container">
      <div className='mypage-header'>
        <h2 className='mypage-header-name'>{name}님의 관심도서목록</h2>
      </div>
      <main className="bookInterest">
        <div className="content" >
          {errorMessage && <p className="fieldError">{errorMessage}</p>}
          {bookInterestList.length > 0 ? (
            bookInterestList.map((bookInterest) => (
              <div className="card"  key={bookInterest.id}>
                <div className="row">
                  <div className="img-container" onClick={()=>onDetail(bookInterest.book.id)} >
                    {bookInterest.book.bookImg ? (
                      <img src={`http://localhost:8090/images/book/${bookInterest.book.bookImg.imgName}`} alt="책 이미지" className="img-fluid cover-img" />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="text-center" onClick={()=>onDetail(bookInterest.book.id)} >
                    <div className="card-body">
                      <h5 className="card-title">{bookInterest.book.title}</h5>
                      <p>{bookInterest.book.author}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;{bookInterest.book.pub_date}</p>
                      <p>출판사 : {bookInterest.book.publisher}</p>
                    </div>
                  </div>
                  <div className="delButton" >
                    <button onClick={() => handleDelete(bookInterest.id)}>관심도서삭제</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>관심도서 목록이 없습니다.</p>
          )}
          <div className="interest_pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
              &lt;
            </button>
            <span>{currentPage + 1} / {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1}>
            &gt;
            </button>
          </div>
        </div>
      </main>
      </div>
      </div>
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
