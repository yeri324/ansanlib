import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../common/BoardItem';
import Pagination from '../common/Pagination';
import '../../board/common/List.css'

function UserNoticeList() {
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

    //페이징용 useState 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalNoticeCount, setTotalNoticeCount] = useState(0);
    const noticePerPage = 8;

    //리스트 읽기
    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage]);

    //상세페이지 이동
    const onDetail = (notice) => {
        window.location.reload(navigate(`/user/notice/detail/${notice.id}`, {
            state: {
                ...notice
            }
        }))
    }

    // 검색 및 전체 리스트
    const onSearch = (page) => {
        axios(
            {
                url: '/notice/search',
                method: 'post',
                data: {
                    searchBy: searchOption.searchBy,
                    searchQuery: searchOption.searchQuery,
                    page: page - 1,
                    size: noticePerPage,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            console.log(response.data);
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalNoticeCount(response.data.totalElements);
        });

    }

    //기준검색
    const handleOnChange = (e) => {
        const { name, value } = e.target;
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
                            <h3>공지사항</h3>
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
                            총 {totalNoticeCount}건 / {totalPages} 페이지
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
                            {searchResult.map((notice) => (
                                <BoardItem key={notice.id} item={notice} board='notice' onDetail={onDetail} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div >
    );
};

export default UserNoticeList;