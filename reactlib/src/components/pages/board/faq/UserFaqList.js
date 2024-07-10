import '../../board/List.css'
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../BoardItem';

function UserFaqList() {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

    //페이징용 useState 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalFaqCount, setTotalFaqCount] = useState(0);
    const faqPerPage = 8;

    //리스트 읽기
    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage]);

    //상세페이지 이동
    const onDetail = (faq) => {
        window.location.reload(navigate(`/user/faq/detail/${faq.id}`, {
            state: {
                ...faq
            }
        }))
    }

    // 검색 및 전체 리스트
    const onSearch = (page) => {
        console.log(searchOption.searchBy, searchOption.searchQuery);
        console.log(currentPage, faqPerPage);
        axios(
            {
                url: '/faq/search',
                method: 'post',
                data: {
                    searchBy: searchOption.searchBy,
                    searchQuery: searchOption.searchQuery,
                    page: page - 1,
                    size: faqPerPage,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            console.log(response.data);
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalFaqCount(response.data.totalElements);
        });

    }

    //기준검색
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearchOption((prevState) => {
            return {
                ...prevState,
                [name]: value,
            }
        });
    };

    return (
        <div>
            <section class="board">
                <div id="search">
                    <div class="container">
                        <div class="page-title">
                            <h3>FAQ</h3>
                        </div>
                        <div class="search-wrap">
                            <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
                                <option value="loginid">작성자</option>
                                <option value="title">제목</option>
                            </select>
                            <input type="text" id="search" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />
                            <button class="btn btn-dark" onClick={onSearch}>검색</button>
                        </div>
                        <div className="count_content">
                            총 {totalFaqCount}건 / {totalPages} 페이지
                        </div>
                    </div>
                </div>
                <div class="list">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="th-num">번호</th>
                                <th scope="col" class="th-title">제목</th>
                                <th scope="col" class="th-loginid">작성자</th>
                                <th scope="col" class="th-date">작성일</th>
                            </tr>
                        </thead>
                        <tbody class="list_content">
                            {searchResult.map((faq) => (
                                <BoardItem key={faq.id} item={faq} board='faq' onDetail={onDetail} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            {/* 페이징 */}
            <ul className="pagination">
                <li className="page-item">
                    <button onClick={() => setCurrentPage(1)} className="page-link">
                        {'<<'}
                    </button>
                </li>
                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className="page-link">
                        {'<'}
                    </button>
                </li>
                {[...Array(totalPages)].map((_, i) => (
                    <li key={i} className="page-item">
                        <button
                            onClick={() => setCurrentPage(i + 1)}
                            className="page-link">
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className="page-link">
                        {'>'}
                    </button>
                </li>
                <li className="page-item">
                    <button onClick={() => setCurrentPage(totalPages)} className="page-link">
                        {'>>'}
                    </button>
                </li>
            </ul>
        </div >
    );
};

export default UserFaqList;