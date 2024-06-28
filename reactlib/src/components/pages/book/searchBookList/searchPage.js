import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchPage = () => {
  const [formData, setFormData] = useState({
    keyword: '',
    isbn: '',
    author: '',
    publisher: '',
    pub_date: '',
    category_code: '',
    page: 0
  });
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [pagination, setPagination] = useState({
    hasPrev: false,
    hasNext: false,
    previous: 0,
    next: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/books/searchList', { params: formData });
      setSearchResults(response.data.content); // 검색 결과 처리
      setPagination({
        hasPrev: response.data.hasPrevious,
        hasNext: response.data.hasNext,
        previous: response.data.previous,
        next: response.data.next
      });
    } catch (error) {
      setErrorMessage('검색 중 오류 발생: ' + error.message);
    }
  };

  const handlePageChange = (pageNumber) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      page: pageNumber
    }));
  };

  const alertLogin = () => {
    alert('로그인 후 이용가능합니다.');
  };

  return (
    <main>
      <div className="breadcrumbs">
        <div className="page-header d-flex align-items-center" style={{ backgroundImage: "url('/img/page-header1.jpg')" }}>
          <div className="container position-relative">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-6 text-center">
                <h2>통합검색</h2>
              </div>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li>통합검색</li>
            </ol>
          </div>
        </nav>
      </div>

      <section className="sample-page">
        <div className="content" style={{ textAlign: 'center' }}>
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  통합검색
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">책이름</div>
                      <input name="keyword" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">ISBN</div>
                      <input name="isbn" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">저자</div>
                      <input name="author" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">출판사</div>
                      <input name="publisher" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">출판 날짜</div>
                      <input name="pub_date" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-text" id="btnGroupAddon2">분류 코드</div>
                      <input name="category_code" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" onChange={handleChange} />
                    </div>
                    <button className="btn btn-primary">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <br />
          {errorMessage && <p className="fieldError">{errorMessage}</p>}
          <br />
          <div className="pagination justify-content-center">
            <button onClick={() => handlePageChange(pagination.previous)} disabled={!pagination.hasPrev} className="btn btn-lg bi bi-caret-left-square-fill"></button>
            <button onClick={() => handlePageChange(pagination.next)} disabled={!pagination.hasNext} className="btn btn-lg bi bi-caret-right-square-fill"></button>
          </div>
          <br />
          <div>
            {searchResults.map((book) => (
              <div className="card mb-3" style={{ width: '100%' }} key={book.id}>
                <div className="row g-0">
                  <div className="col-md-2" style={{ border: '1px solid black' }}>
                    <img src={book.bookImg?.imgUrl} width="100%" height="100%" alt="..." className="img-fluid" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="col-md-8" style={{ border: '1px solid black' }}>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                      <Link to={`/book/${book.id}`}>
                        <h5 className="card-title">{book.title}</h5>
                      </Link>
                      <p>{book.author}</p>
                      <p>{`${book.publisher} | ${book.pub_date} | ${book.category_code}`}</p>
                      <p>{book.location}</p>
                    </div>
                  </div>
                  <div className="col-md-2" style={{ border: '1px solid black' }}>
                    <div className="card-body" style={{ textAlign: 'left' }}>
                      <div className="row">
                        <p>{book.status}</p>
                      </div>
                      <div className="row">
                        <button onClick={alertLogin}>도서예약</button>
                        <button disabled={book.status !== 'AVAILABLE'} onClick={() => handleReservation(book.id)}>도서예약</button>
                      </div>
                      <div className="row">
                        <button onClick={alertLogin}>관심도서담기</button>
                        <button onClick={() => handleInterest(book.id)}>관심도서담기</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination justify-content-center">
            <button onClick={() => handlePageChange(pagination.previous)} disabled={!pagination.hasPrev} className="btn btn-lg bi bi-caret-left-square-fill"></button>
            <button onClick={() => handlePageChange(pagination.next)} disabled={!pagination.hasNext} className="btn btn-lg bi bi-caret-right-square-fill"></button>
          </div>
        </div>
      </section>
    </main>
  );

  function handleReservation(bookId) {
    axios.post(`/book/reservation/${bookId}`)
      .then(response => {
        // 예약 성공 처리
      })
      .catch(error => {
        console.error('예약 중 오류 발생:', error);
      });
  }

  function handleInterest(bookId) {
    axios.post(`/book/interest/${bookId}`)
      .then(response => {
        // 관심도서담기 성공 처리
      })
      .catch(error => {
        console.error('관심도서담기 중 오류 발생:', error);
      });
  }
};

export default SearchPage;
