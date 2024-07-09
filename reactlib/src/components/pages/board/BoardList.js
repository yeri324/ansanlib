import './BoardList.css';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from './BoardItem';

function BoardList() {
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

    //페이징용 useState 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalBoardCount, setTotalBoardCount] = useState(0);
    const boardPerPage = 8;

    //리스트 읽기
    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage]);

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/board/new')
    }

    //상세페이지 이동
    const onDetail = (board) => {
        window.location.reload(navigate(`/board/detail/${board.id}`, {
            state: {
                ...board
            }
        }))
    }

    // 검색 및 전체 리스트
    const onSearch = (page) => {
        console.log(searchOption.searchBy, searchOption.searchQuery);
        console.log(currentPage, boardPerPage);
        axios(
            {
                url: '/board/search',
                method: 'post',
                data: {
                    searchBy: searchOption.searchBy,
                    searchQuery: searchOption.searchQuery,
                    page: page - 1,
                    size: boardPerPage,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            console.log(response.data);
            setSearchResult(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalBoardCount(response.data.totalElements);
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

    // 삭제 체크박스 여부 확인
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedHandler(value, e.target.checked);
    };

    // 삭제용 체크리스트 확인
    const checkedHandler = (value, isChecked) => {
        if (isChecked) {
            setCheckedList((prev) => [...prev, value]);
            return;
        }
        if (!isChecked && checkedList.includes(value)) {
            setCheckedList(checkedList.filter((board) => board !== value));
            return;
        }
        return;
    };

    //BoardList 다중삭제하기
    const onDelete = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: '/board/delete',
                    method: 'delete',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/board/list", { repalce: true }));
        }
    };

    return (
        <div>
            <section class="board">
                <div class="page-title">
                    <div class="container">
                        <h3>공지사항</h3>
                    </div>
                </div>
                <div id="board-search">
                    <div class="container">
                        <div class="search-wrap">
                            <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
                                <option value="loginid">작성자</option>
                                <option value="title">제목</option>
                            </select>
                            <input type="text" id="search" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />
                            <button class="btn btn-dark" onClick={onSearch}>Search</button>
                        </div>
                        <div className="count_item">
                            총 {totalBoardCount}건 / {totalPages} 페이지
                        </div>
                    </div>
                </div>
                <div class="board_list">
                    <table class="board_table">
                        <thead>
                            <tr>
                                <th scope="col" class="th-check"> - </th>
                                <th scope="col" class="th-num">번호</th>
                                <th scope="col" class="th-title">제목</th>
                                <th scope="col" class="th-loginid">작성자</th>
                                <th scope="col" class="th-date">작성일</th>
                            </tr>
                        </thead>
                        <tbody class="board_list_content">
                            {searchResult.map((board) => (
                                <BoardItem key={board.id} board={board} checkedList={checkedList} checkHandler={checkHandler} onDetail={onDetail} />
                            ))}
                       </tbody>
                    </table>
                    <button onClick={onDelete}>삭제하기</button>
                    <button onClick={onCreate}>작성하기</button>
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

export default BoardList;