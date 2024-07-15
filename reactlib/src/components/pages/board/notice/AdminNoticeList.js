import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../common/BoardItem';
import Pagination from '../common/Pagination';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import '../../board/common/List.css'

function AdminNoticeList() {
    const { axios } = useAuth();
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
    const [totalNoticeCount, setTotalNoticeCount] = useState(0);
    const noticePerPage = 8;

    const { loginStatus, roles } = useAuth();

    //리스트 읽기 + 권한 여부 확인
    useEffect(() => {
        //로그아웃됨.
        if (loginStatus === LOGIN_STATUS.LOGGED_OUT) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        } else if (loginStatus === LOGIN_STATUS.LOGGED_IN) {
            //어드민인지 확인
            if (roles !== ROLES.ADMIN) {
                alert("권한이 없습니다.");
                navigate(-1);
            }
        }
        onSearch(currentPage);
    }, [loginStatus, currentPage]); //로그인 상태 변경시 useEffect 실행

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/admin/notice/form')
    }

    //상세페이지 이동
    const onDetail = (notice) => {
        window.location.reload(navigate(`/admin/notice/detail/${notice.id}`, {
            state: {
                ...notice
            }
        }))
    }

    // 검색 및 전체 리스트
    const onSearch = (page) => {
        console.log(searchOption.searchBy, searchOption.searchQuery);
        console.log(currentPage, noticePerPage);
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
            setCheckedList(checkedList.filter((notice) => notice !== value));
            return;
        }
        return;
    };

    //NoticeList 다중삭제하기
    const onDelete = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: '/admin/notice/delete',
                    method: 'delete',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/admin/notice/list", { repalce: true }));
        }
    };

    return (
        <div>
            <section class="board-list">
                <div id="search">
                    <div class="container">
                        <div class="page-title">
                            <h3>공지사항</h3>
                            {console.log(roles)}
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
                                <th scope="col" class="th-check"> - </th>
                            </tr>
                        </thead>
                        <tbody class="list_content">
                            {searchResult.map((notice) => (
                                <BoardItem key={notice.id} item={notice} board='notice' checkedList={checkedList} checkHandler={checkHandler} onDetail={onDetail} />
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

export default function () {
    return (
        <>
            <RedirectLogin />
            <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
                <AdminNoticeList />
            </Auth>
        </>
    );
};