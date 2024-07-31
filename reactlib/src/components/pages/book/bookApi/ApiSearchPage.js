import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ApiSearchPage.css';
import Header from '../../../fragments/header/header';
import Footer from '../../../fragments/footer/footer';
import KeywordCloud_gender from '../../../fragments/home/Keyword_Cloud_gender';
import useAuth from '../../../hooks/useAuth';

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
    const {userId,gender} = useAuth();
    const [searchKeyword,setSearchKeyword] = useState("");
    const fetchBooks = useCallback(async (page = 1) => {
        const apiUrl = `/api/bookapi/search?keyword=${keyword}&page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}`;
        const response = await axios.get(apiUrl);
        const data = response.data;
        setBooks(data.books);
        setPageMaker(data.pageMaker);
        if (userId && gender) {
            try {
                await axios.post('http://127.0.0.1:5001/api/save_keyword', {
                    user_id: userId,
                    gender: gender,
                    keyword
                });
            } catch (error) {
                console.error('Error saving keyword:', error);
            }
        }
    }, [keyword, sortBy, sortOrder]);

    const handleSearch = (e) => {
        setSearchKeyword(keyword)
        e.preventDefault();
        fetchBooks();
    };



    return (
        <>
            <Header />

            <main>
                <div className="search-header">
                    <h2 className='search-header-name'>네이버 API BOOK 검색</h2>

                </div>
                <section className="ApiSearch">
                    <form className="search-form" onSubmit={handleSearch} >
                        <div className="search-group">
                            <div className="search-group-text">네이버 API 검색</div>
                            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} name="keyword" type="text" className="search-input" aria-label="Input group example" aria-describedby="btnGroupAddon2" />
                        </div>
                        <button className="search-button">검색</button>
                    </form>
                    <div className="ApiBookSearchDetail">

                        <div className="search-group-text">정렬 기준 : </div>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="search-input">
                            <option value="title">제목</option>
                            <option value="author">저자</option>
                            <option value="publisher">출판사</option>
                            <option value="pubdate">출판일</option>
                            <option value="discount">가격</option>
                        </select>
                        <div className="search-group-text">정렬 순서 : </div>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="search-input">
                            <option value="asc">오름차순</option>
                            <option value="desc">내림차순</option>
                        </select>
                    </div>
                    <h4>{`'${searchKeyword}' 검색 결과 ${books.total}건 검색`}</h4>
                    <div className='search-list'>
                        <nav aria-label="Page navigation example" >
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


                        <div className="container">
                            {books.items.map((book, index) => (
                                <div key={index} className="row" style={{ width: '100%' }}>
                                    <div className="bookapiimage">
                                        <img src={book.image} className="img-fluid rounded-start" alt="책 이미지" />
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ fontWeight: 'bold' }}>{book.title}</h5>
                                        <p className="card-title">{`ISBN : ${book.isbn}`}</p>
                                        <p className="card-title">{`저자 : ${book.author}`}</p>
                                        <p className="card-title">{`출판사 : ${book.publisher}`}</p>
                                        <p className="card-title">{`출판일 : ${book.pubdate}`}</p>
                                        <p className="card-title">{`가격 : ${book.discount}`}</p>
                                        <a target="_blank" rel="noopener noreferrer" href={book.link}>자세히 보기</a>
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
                    </div>
                    <div className="key_word_cloud_gender">
                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                            <KeywordCloud_gender gender="MALE" />
                            <KeywordCloud_gender gender="FEMALE" />
                        </div>
                    </div> <br />

                </section>
            </main>
            <Footer />
        </>
    );
};

export default ApiBookSearch;
