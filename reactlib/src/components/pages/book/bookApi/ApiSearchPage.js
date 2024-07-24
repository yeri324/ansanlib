import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ApiSearchPage.css';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import KeywordCloud_gender from '../../../fragments/home/Keyword_Cloud_gender';

const ApiBookSearch = () => {
    const [keyword, setKeyword] = useState('');
    const [books, setBooks] = useState({ items: [], total: 0 });
    const [pageMaker, setPageMaker] = useState({
        startPage: 1,
        endPage: 1,
        cri: { page: 1 },
        isPrev: false,
        isNext: false,
    });
    const [sortOrder, setSortOrder] = useState('asc');
    const [sortBy, setSortBy] = useState('title');
    const [user, setUser] = useState({ id: 1, gender: 'MALE' }); // 기본 값을 MALE 또는 FEMALE로 설정

    const fetchBooks = useCallback(async (page = 1) => {
        const apiUrl = `/api/bookapi/search?keyword=${keyword}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        console.log(`Fetching books from: ${apiUrl}`);
        const response = await axios.get(apiUrl);
        const data = response.data;
        setBooks(data.books);
        setPageMaker(data.pageMaker);

        if (user.id && user.gender) {
            try {
                await axios.post('http://127.0.0.1:5001/api/save_keyword', {
                    user_id: user.id,
                    gender: user.gender,
                    keyword
                });
            } catch (error) {
                console.error('Error saving keyword:', error);
            }
        }
    }, [keyword, sortBy, sortOrder, user]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchBooks();
    };

    useEffect(() => {
        if (keyword) {
            fetchBooks(pageMaker.cri.page);
        }
    }, [fetchBooks, keyword, pageMaker.cri.page]);

    return (
        <>
            <Header />

            <main>
                {/* Breadcrumbs */}
                <div className="breadcrumbs">
                    <div className="page-header d-flex align-items-center">
                        <div className="container position-relative">
                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-6 text-center">
                                    <h2>네이버 API BOOK 검색</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Breadcrumbs */}

                <section className="sample-page">
                    <div className="ApiBookContent">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">

                                <div id="ApiCollapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <form onSubmit={handleSearch} style={{ width: '100%' }}>
                                            <div className="input-group">
                                                <div className="input-group-text" id="btnGroupAddon2">책이름</div>
                                                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} name="keyword" type="text" className="form-control" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
                                            </div><br />
                                            <button className="btn btn-success">네이버 책 API 검색</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div><br />
                        <div className="ApiBookSearchDetail">
                            <h2>{`'${keyword}' 검색 결과 ${books.total}건 검색`}</h2>
                            <div className="input-group">
                                <div className="input-group-text" id="btnGroupAddon2">정렬 기준</div>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="form-control">
                                    <option value="title">제목</option>
                                    <option value="author">저자</option>
                                    <option value="publisher">출판사</option>
                                    <option value="pubdate">출판일</option>
                                    <option value="discount">가격</option>
                                </select>
                            </div><br />

                            <div className="input-group">
                                <div className="input-group-text" id="btnGroupAddon2">정렬 순서</div>
                                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="form-control">
                                    <option value="asc">오름차순</option>
                                    <option value="desc">내림차순</option>
                                </select>
                            </div><br />
                        </div>
                        <div>
                            <nav aria-label="Page navigation example" style={{ display: books.total > 0 ? 'block' : 'none' }}>
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.startPage - 1 } })); fetchBooks(pageMaker.startPage - 1); }} disabled={!pageMaker.isPrev}>이전</button>
                                    </li>
                                    {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${pageMaker.cri.page === pageMaker.startPage + i ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.startPage + i } })); fetchBooks(pageMaker.startPage + i); }}>{pageMaker.startPage + i}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.endPage + 1 } })); fetchBooks(pageMaker.endPage + 1); }} disabled={!pageMaker.isNext}>다음</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        <div className="container">
                            {books.items.map((book, index) => (
                                <div key={index} className="card mb-3" style={{ width: '100%' }}>
                                    <div className="row ApiBookDetail">
                                        <div className="col-md-4 bookapiimage">
                                            <img src={book.image} className="img-fluid rounded-start" alt="책 이미지" />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body" style={{ textAlign: 'left' }}>
                                                <h5 className="card-title" style={{ fontSize: '1.3rem' }}>{book.title}</h5>
                                                <p className="card-title" style={{ fontSize: '1rem' }}>{`ISBN : ${book.isbn}`}</p>
                                                <p className="card-title" style={{ fontSize: '1rem' }}>{`저자 : ${book.author}`}</p>
                                                <p className="card-title" style={{ fontSize: '1rem' }}>{`출판사 : ${book.publisher}`}</p>
                                                <p className="card-title" style={{ fontSize: '1rem' }}>{`출판일 : ${book.pubdate}`}</p>
                                                <p className="card-title" style={{ fontSize: '1rem' }}>{`가격 : ${book.discount}`}</p>
                                                <a target="_blank" rel="noopener noreferrer" href={book.link}>자세히 보기</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <nav aria-label="Page navigation example" style={{ display: books.total > 0 ? 'block' : 'none' }}>
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.startPage - 1 } })); fetchBooks(pageMaker.startPage - 1); }} disabled={!pageMaker.isPrev}>이전</button>
                                    </li>
                                    {Array.from({ length: pageMaker.endPage - pageMaker.startPage + 1 }, (_, i) => (
                                        <li key={i} className={`page-item ${pageMaker.cri.page === pageMaker.startPage + i ? 'active' : ''}`}>
                                            <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.startPage + i } })); fetchBooks(pageMaker.startPage + i); }}>{pageMaker.startPage + i}</button>
                                        </li>
                                    ))}
                                    <li className="page-item">
                                        <button className="page-link" onClick={() => { setPageMaker((prev) => ({ ...prev, cri: { page: pageMaker.endPage + 1 } })); fetchBooks(pageMaker.endPage + 1); }} disabled={!pageMaker.isNext}>다음</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="key_word_cloud_gender">
                            <h1>Keyword Clouds for Genders</h1>
                            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                <KeywordCloud_gender gender="MALE" />
                                <KeywordCloud_gender gender="FEMALE" />
                            </div>
                        </div> <br />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ApiBookSearch;
