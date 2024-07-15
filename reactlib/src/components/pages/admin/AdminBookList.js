import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import {GlobalStyles} from './GlobalStyles';

const AdminBookList = () => {
  const [bookList, setBookList] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('library');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMonth, setSearchMonth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getBookList();
  }, []);

  const getBookList = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/admin/book/list');
      if (Array.isArray(response.data)) {
        setBookList(response.data);
      } else {
        console.error('Fetched data is not an array:', response.data);
        setBookList([]);
      }
    } catch (error) {
      console.error('Error fetching book list:', error);
      setBookList([]);
    }
  };

  const handleSearch = () => {
    // Implement your search functionality here
  };

  const handleRefresh = () => {
    setSearchTerm('');
    setSearchMonth(null);
    getBookList();
  };

  const handleAddHoliday = () => {
    // Implement your add holiday functionality here
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <GlobalStyles width="100vw" />

      <div className="admin-page">
        <div className="admin-base">
          <AdminHeader />
          <AdminSide />
        </div>

        <main className="admin-page-main">
          <div className="admin-page-body">
            <div className="admin-page-title">
              <h1>도서 조회</h1>
            </div>

            <div className="admin-page-search">
              <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                <option value="library">도서관 이름</option>
                <option value="date">날짜 (월)</option>
              </select>

              {searchCriteria === 'library' && (
                <input
                  type="text"
                  placeholder="도서관 이름을 입력하세요"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}

              {searchCriteria === 'date' && (
                <DatePicker
                  selected={searchMonth}
                  onChange={(date) => setSearchMonth(date)}
                  dateFormat="yyyy-MM"
                  showMonthYearPicker
                  placeholderText="날짜를 선택하세요"
                  onKeyDown={handleKeyDown}
                />
              )}

              <button type="button" className="btn btn-outline-dark" onClick={handleSearch}>검색</button>
              <button type="button" className="btn btn-outline-dark" onClick={handleRefresh}>새로고침</button>
            </div>

            <div className="admin-page-button">
              <button type="button" className="btn btn-outline-dark" onClick={() => navigate('/admin/holiday')}>돌아가기</button>
              <button type="button" className="btn btn-outline-dark" onClick={handleAddHoliday}>등록하기</button>
            </div>

            <table className="admin-table">
              <thead>
                <tr className="admin-th-tr">
                  <th>No</th>
                  <th className='sortable'>ISBN</th>
                  <th className='sortable'>도서 제목</th>
                  <th className='sortable'>작가</th>
                  <th className='sortable'>출판사</th>
                  <th className='sortable'>출판년도</th>
                  <th className='sortable'>이미지 URL</th>
                </tr>
              </thead>
              <tbody>
                {bookList.length > 0 ? (
                  bookList.map((book, index) => (
                    <tr className='list admin-td-tr' key={index}>
                      <td>{index + 1}</td>
                      <td>{book.isbn}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.pub_date}</td>
                      <td>
                        {book.bookImg && Array.isArray(book.bookImg) && book.bookImg.length > 0 ? (
                          book.bookImg.map((img, imgIndex) =>
                            img && img.imgUrl ? (
                              <a key={imgIndex} href={img.imgUrl} target="_blank" rel="noopener noreferrer">
                                {img.imgUrl}
                              </a>
                            ) : (
                              <span key={imgIndex}>이미지 없음</span>
                            )
                          )
                        ) : (
                          <span>이미지 없음</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">도서 목록이 없습니다</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminBookList;
