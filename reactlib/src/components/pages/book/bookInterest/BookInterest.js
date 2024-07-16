import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookInterest.css'; // 스타일 파일을 임포트합니다.
import { useNavigate } from 'react-router-dom'; // useNavigate로 교체

const BookInterest = () => {
  const [bookInterestList, setBookInterestList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate(); // 업데이트된 hook

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get('/api/auth/check');
        setIsAuthenticated(response.data.authenticated);
        if (response.data.authenticated) {
          fetchBookInterestList();
        }
      } catch (error) {
        console.error('인증 상태 확인 중 오류 발생:', error);
      }
    };

    const fetchBookInterestList = async () => {
      try {
        const response = await axios.get('/api/book/interest/list');
        setBookInterestList(response.data);
      } catch (error) {
        console.error('관심도서 리스트를 가져오는 중 오류 발생:', error);
      }
    };

    checkAuthentication();
  }, []);

  const handleDeleteInterest = async (bookId) => {
    if (!isAuthenticated) {
      alert('로그인 후 이용가능합니다.');
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`/api/book/interest/${bookId}`);
      setBookInterestList(prevList => prevList.filter(book => book.id !== bookId));
    } catch (error) {
      console.error('관심도서 삭제 중 오류 발생:', error);
    }
  };

  const handleAddInterest = async (bookId) => {
    if (!isAuthenticated) {
      alert('로그인 후 이용가능합니다.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(`/api/book/interest/${bookId}`);
      const response = await axios.get('/api/book/interest/list');
      setBookInterestList(response.data);
    } catch (error) {
      console.error('관심도서 추가 중 오류 발생:', error);
    }
  };

  if (!isAuthenticated) {
    return <div>로그인이 필요합니다. <a href="/login">로그인 페이지로 이동</a></div>;
  }

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
          {bookInterestList.map(book => (
            <div className="card mb-3" style={{ width: '100%' }} key={book.id}>
              <div className="row g-0">
                <div className="col-md-4 img-container">
                  {book.bookImg ? (
                    <img 
                      src={`http://localhost:8090/api/images/${book.bookImg.imgName}`} 
                      alt={book.title} 
                      className="img-fluid cover-img" 
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="col-md-5" style={{ border: '1px solid black' }}>
                  <div className="card-body">
                    <h5 className="card-title">제목 : 『{book.title}』</h5>
                    <p>저자 : 『{book.author}』</p>
                    <p>ISBN : 『{book.isbn}』</p>
                    <p>출판사 : 『{book.publisher}』 || 출판 날짜 : 『{book.pub_date}』 || 분류 코드 : 『{book.category_code}』</p>
                    <p>위치 : 『{book.location}』</p>
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
          ))}
        </div>
      </section>
    </main>
  );
};

export default BookInterest;
