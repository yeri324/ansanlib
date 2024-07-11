import '../../board/common/List.css'
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../common/BoardItem';
import Pagination from '../common/Pagination';
import { LoginContext } from "../../security/contexts/LoginContextProvider";

function AdminFaqList() {
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [searchResult, setSearchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

    const { isLogin, roles, loginCheck } = useContext(LoginContext);

    //페이징용 useState 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalFaqCount, setTotalFaqCount] = useState(0);
    const faqPerPage = 8;

    //리스트 읽기
    useEffect(() => {
        loginCheck();
        console.log(isLogin, "**", !isLogin)
        console.log(roles.isAdmin, "**", !roles.isAdmin)

        // if (!isLogin && !roles.isAdmin) {
        //     alert("관리자로 로그인 해주세요.", () => { navigate("/login") })
        //     return
        // }
        onSearch(currentPage);
    }, [currentPage]);

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/admin/faq/new')
    }

    //상세페이지 이동
    const onDetail = (faq) => {
        window.location.reload(navigate(`/admin/faq/detail/${faq.id}`, {
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
            setCheckedList(checkedList.filter((faq) => faq !== value));
            return;
        }
        return;
    };

    //FAQ 다중삭제하기
    const onDelete = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: '/admin/faq/delete',
                    method: 'delete',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/faq/list", { repalce: true }));
        }
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
                                <th scope="col" class="th-check"> - </th>
                            </tr>
                        </thead>
                        <tbody class="list_content">
                            {searchResult.map((faq) => (
                                <BoardItem key={faq.id} item={faq} board='faq' checkedList={checkedList} checkHandler={checkHandler} onDetail={onDetail} />
                            ))}
                        </tbody>
                    </table>
                    <button onClick={onDelete}>삭제하기</button>
                    <button onClick={onCreate}>작성하기</button>
                </div>
            </section>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div >
    );
};

export default AdminFaqList;