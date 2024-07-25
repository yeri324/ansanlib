import React, { useState, useEffect, useCallback } from 'react';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';
import Highlight from './Highlight'; // 하이라이트 컴포넌트를 임포트합니다.
import AutoComplete from './AutoComplete'; // AutoComplete 컴포넌트를 임포트합니다.
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import axios from 'axios';

const SearchPage = () => {
  const { userId, } = useAuth(); // useAuth 훅에서 userId와 axios를 가져옴
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    title: '',
    isbn: '',
    author: '',
    publisher: '',
    pub_date: '',
    category_code: ''
  });
  const [bookList, setBookList] = useState([]);
  const [pagination, setPagination] = useState({
    hasPrev: false,
    hasNext: false,
    previous: 0,
    next: 0
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [sortCriteria, setSortCriteria] = useState('title'); // 기본 정렬 기준을 제목으로 설정
  const [sortOrder, setSortOrder] = useState('asc'); // 기본 정렬 순서를 오름차순으로 설정
  const [searchClicked, setSearchClicked] = useState(false); // 검색 버튼 클릭 여부 상태 추가

  useEffect(() => {
    console.log("userId: ", userId);  // userId 출력
  }, [userId]);

  const handleInputChange = (e, { newValue, name }) => {
    setFormValues({ ...formValues, [name]: newValue });
  };

  const handleSearch = useCallback(async (e, page = 0) => {
    if (e) e.preventDefault();
    try {
      const cleanFormValues = {
        ...formValues,
        page: page // page 매개변수를 추가하여 현재 페이지 정보 전달
      };
      const response = await axios.get('/api/book/search', { params: cleanFormValues });
      const data = response.data;
      setBookList(data.bookList);
      setPagination({
        hasPrev: data.hasPrev,
        hasNext: data.hasNext,
        previous: data.previous,
        next: data.next
      });
      setSearchClicked(true); // 검색 버튼 클릭 여부 업데이트
    } catch (error) {
      setErrorMessage('검색 중 오류가 발생했습니다.');
    }
  }, [formValues]);

  // 책 목록 정렬 함수
  const sortBooks = (books, criteria, order) => {
    return books.slice().sort((a, b) => {
      if (a[criteria] < b[criteria]) return order === 'asc' ? -1 : 1;
      if (a[criteria] > b[criteria]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  // 정렬 순서 변경 핸들러
  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const sortedBookList = sortBooks(bookList, sortCriteria, sortOrder);

  // 관심도서 추가 API 호출 함수
  const handleAddToInterest = async (bookId) => {
    try {
      await axios.post(`/api/book/interest/${userId}/${bookId}`);
      alert('관심도서에 추가되었습니다.');
    } catch (error) {
      console.error('Error adding book to interest:', error);
      alert('관심도서 추가 중 오류가 발생했습니다.');
    }
  };

  const onDetail = (e) => {
    navigate(`/book/detail/${e}`);
}

  return (
    <>
      <Header />
      <div className='search-header'>
        <h2 className='search-header-name'>상세검색</h2>
      </div>
      <main className="bookSearch">
        <section className="search-page">
          <div className="search-content">

            <form onSubmit={handleSearch} className='search-form'>
              {[
                { name: 'isbn', label: '책 제목', autocomplete: true },
                { name: 'title', label: 'ISBN' },
                { name: 'author', label: '저자' },
                { name: 'publisher', label: '출판사' },
                { name: 'pub_date', label: '출판날짜' },
                { name: 'category_code', label: '분류코드' }
              ].map((field, index) => (
                <div className="input-group" key={index}>
                  <div className="input-text" >{field.label}</div>
                  {field.autocomplete ? (
                    <AutoComplete
                      name={field.name}
                      value={formValues[field.name]}
                      onChange={handleInputChange}
                      label={field.label}
                    />
                  ) : (
                    <input
                      name={field.name}
                      type="text"
                      className="searchForm"
                      value={formValues[field.name] || ''}
                      onChange={(e) => handleInputChange(e, { newValue: e.target.value, name: field.name })}
                    />
                  )}
                </div>
              ))}
              <br />
              <button className="search-btn">검 색</button>
            </form>

            {errorMessage && <p className="fieldError">{errorMessage}</p>}

            <div className="search-sort-select">
              <label htmlFor="sort">정렬 기준:</label>
              <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                <option value="accuracy">정확도</option>
                <option value="title">제목</option>
                <option value="author">저자</option>
                <option value="publisher">출판사</option>
                <option value="pub_date">발행 연도</option>
              </select>
              <label htmlFor="order">정렬 순서:</label>
              <select id="order" value={sortOrder} onChange={handleSortOrderChange}>
                <option value="asc">오름차순</option>
                <option value="desc">내림차순</option>
              </select>
            </div>
            <div className='search-list'>
              {searchClicked && (
                <>
                  <div className="search-pagination">
                    <button
                      onClick={() => handleSearch(null, pagination.previous)}
                      className={`btn ${!pagination.hasPrev && 'disabled'}`}
                    >
                      이전
                    </button>
                    <button
                      onClick={() => handleSearch(null, pagination.next)}
                      className={`btn ${!pagination.hasNext && 'disabled'}`}
                    >
                      다음
                    </button>
                  </div>
                  {sortedBookList.length > 0 ? sortedBookList.map((book, index) => (
                    <div className="result-card" key={index}>
                      <div className="img-container" onClick={()=>onDetail(book.id)}>
                        {book.bookImg ? (
                          <img src={`http://localhost:8090/images/book/${book.bookImg.imgName}`} alt="책 이미지" className="img-fluid cover-img" />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>
                      <div className="text-container" onClick={()=>onDetail(book.id)}>
                        <a href={`/book/detail/${book.id}`}>
                          <h5><Highlight text={`${book.title}`} highlight={formValues.title} /></h5>
                        </a>
                        <p>ISBN : {book.isbn}</p>
                        <p><Highlight text={`${book.author} `} highlight={formValues.author} /></p>
                        <p><Highlight text={`${book.publisher}　|　${book.pub_date}`} highlight={formValues.publisher} /></p>
                        <p>소장 : {book.libName}</p>
                      </div>
                      <div className="card-row">
                        {book.status==='AVAILABLE'? <p>대출 가능</p>:<p>대출 중</p>}
                        <button disabled={book.status !== 'AVAILABLE'} onClick={() => window.location.href = `/reservation/new?id=${encodeURIComponent(book.id)}&title=${encodeURIComponent(book.title)}`}>
                          도서예약
                        </button>
                        <button onClick={() => handleAddToInterest(book.id)}>
                          관심도서담기
                        </button>
                      </div>
                    </div>
                  )) : <p>검색 결과가 없습니다.</p>}
                  <div className="search-pagination">
                    <button
                      onClick={() => handleSearch(null, pagination.previous)}
                      className={`btn ${!pagination.hasPrev && 'disabled'}`}
                    >
                      이전
                    </button>
                    <button
                      onClick={() => handleSearch(null, pagination.next)}
                      className={`btn ${!pagination.hasNext && 'disabled'}`}
                    >
                      다음
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
