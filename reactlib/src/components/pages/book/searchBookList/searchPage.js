import React, { useState, useEffect, useCallback } from 'react';
import useAuth, { LOGIN_STATUS } from '../../../hooks/useAuth';
import Highlight from './Highlight'; // 하이라이트 컴포넌트를 임포트합니다.
import AutoComplete from './AutoComplete'; // AutoComplete 컴포넌트를 임포트합니다.
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import RedirectLogin from '../../../helpers/RedirectLogin';
import Auth from '../../../helpers/Auth';
import './SearchPage.css';
import axios from 'axios';

const SearchPage = () => {
  const { userId, } = useAuth(); // useAuth 훅에서 userId와 axios를 가져옴

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

  return (
    <>
      <Header />
      <main className="bookSearch">
        <section className="sample-page">
          <div className="content centered-content">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div className="accordion-body sc">
                    <form onSubmit={handleSearch} className='Search'>
                      {[
                        { name: 'isbn', label: '책 제목', autocomplete: true },
                        { name: 'title', label: 'ISBN' },
                        { name: 'author', label: '저자' },
                        { name: 'publisher', label: '출판사' },
                        { name: 'pub_date', label: '출판날짜' },
                        { name: 'category_code', label: '분류코드' }
                      ].map((field, index) => (
                        <div className="input-group" key={index}>
                          <div className="input-group-text" id="btnGroupAddon2">{field.label}</div>
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
                              aria-label="Input group example"
                              aria-describedby="btnGroupAddon2"
                              value={formValues[field.name] || ''}
                              onChange={(e) => handleInputChange(e, { newValue: e.target.value, name: field.name })}
                            />
                          )}
                        </div>
                      ))}
                      <br />
                      <button className="btn btn-primary">검색</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <br />
            {errorMessage && <p className="fieldError">{errorMessage}</p>}
            <br />
            <div className="justify-content-center">
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
            <br />
            {searchClicked && (
              <>
                <div className="pagination justify-content-center bt">
                  <button
                    onClick={() => handleSearch(null, pagination.previous)}
                    className={`btn btn-lg bi bi-caret-left-square-fill ${!pagination.hasPrev && 'disabled'}`}
                  >
                    이전
                  </button>
                  <button
                    onClick={() => handleSearch(null, pagination.next)}
                    className={`btn btn-lg bi bi-caret-right-square-fill ${!pagination.hasNext && 'disabled'}`}
                  >
                    다음
                  </button>
                </div>
                <br />
                {sortedBookList.length > 0 ? sortedBookList.map((book, index) => (
                  <div className="card mb-3 full-width book-detail-container" key={index}>
                    <div className="img-container">
                      {book.bookImg ? (
                        <img src={`http://localhost:8090/images/book/${book.bookImg.imgName}`} alt="책 이미지" className="img-fluid cover-img" />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="text-container">
                      <a href={`/book/detail/${book.id}`}>
                        <h5 className="card-title"><Highlight text={`제목 : 『${book.title}』`} highlight={formValues.title} /></h5>
                      </a>
                      <p><Highlight text={`저자 : 『${book.author}』   ||   ISBN : 『${book.isbn}』`} highlight={formValues.author} /></p>
                      <p><Highlight text={`출판사 : 『${book.publisher}』   ||   출판 날짜 : 『${book.pub_date}』   ||   분류 코드 : 『${book.category_code}』`} highlight={formValues.publisher} /></p>
                      <p>위치 : 『{book.libName}』</p>
                    </div>
                    <div className="row">
                      <p>{book.status}</p>
                      <div className="buttons-container">
                        <div className="row-bt">
                          <button disabled={book.status !== 'AVAILABLE'} onClick={() => window.location.href = `/reservation/new?id=${encodeURIComponent(book.id)}&title=${encodeURIComponent(book.title)}`}>
                            도서예약
                          </button>
                        </div>
                        <div className="row-bt">
                          <button onClick={() => handleAddToInterest(book.id)}>
                            관심도서담기
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : <p>검색 결과가 없습니다.</p>}
                <div className="pagination justify-content-center">
                  <button
                    onClick={() => handleSearch(null, pagination.previous)}
                    className={`btn btn-lg bi bi-caret-left-square-fill ${!pagination.hasPrev && 'disabled'}`}
                  >
                    이전
                  </button>
                  <button
                    onClick={() => handleSearch(null, pagination.next)}
                    className={`btn btn-lg bi bi-caret-right-square-fill ${!pagination.hasNext && 'disabled'}`}
                  >
                    다음
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SearchPage;
