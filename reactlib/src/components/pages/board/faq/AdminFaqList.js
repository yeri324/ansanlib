import '../../board/common/AdminForm.css'
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardItem from '../common/BoardItem';
import AdminPagination from "../../admin/common/AdminPagination";
import { LoginContext } from "../../security/contexts/LoginContextProvider";
import AdminHeader from '../../admin/common/AdminHeader';
import AdminSide from '../../admin/common/AdminSide';
import useAuth from '../../../hooks/useAuth';

function AdminFaqList() {
    const { axios } = useAuth();
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
        onSearch(currentPage);
    }, [currentPage]);

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/admin/faq/form')
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
        <div className="admin-page">
            <div className="admin-base">
                <AdminHeader />
                <AdminSide />
            </div>
            <main className="admin-page-main">
                <div className="admin-page-body">
                    <div className="admin-page-title">
                        <h2>FAQ 조회</h2>
                    </div>
                    <div className="admin-page-top">
                        <div className="admin-page-count" style={{ width: "25%" }}>
                            총 {totalFaqCount}건 / {totalPages} 페이지
                        </div>
                        <div className="admin-page-search" style={{ width: "50%" }}>
                            <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
                                <option value="loginid">작성자</option>
                                <option value="title">제목</option>
                            </select>
                            <input type="text" id="search" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />
                            <button className="btn btn-outline-dark" onClick={() => onSearch(currentPage)}>검색</button>
                        </div>
                        <div className="admin-page-button" style={{ width: "25%" }}>
                            <button className="btn btn-outline-dark" onClick={onDelete}>삭제하기</button>
                            <button className="btn btn-outline-dark" onClick={onCreate}>작성하기</button>
                        </div>
                    </div>
                    <table className="admin-table">
                        <thead>
                            <tr className="admin-th-tr">
                                <th scope="col" className="th-check" style={{ width: "5%" }}>  </th>
                                <th scope="col" className="th-num" style={{ width: "10%" }}>번호</th>
                                <th scope="col" className="th-title" style={{ width: "40%" }}>제목</th>
                                <th scope="col" className="th-loginid" style={{ width: "10%" }}>작성자</th>
                                <th scope="col" className="th-date" style={{ width: "20%" }}>작성일</th>
                                <th scope="col" class="th-num" style={{ width: "5%" }}>조회수</th>
                            </tr>
                        </thead>
                        <tbody className="list_content">
                            {searchResult.map((faq) => (
                                <BoardItem
                                    key={faq.id}
                                    item={faq}
                                    board="faq"
                                    checkedList={checkedList}
                                    checkHandler={checkHandler}
                                    onDetail={onDetail}
                                />
                            ))}
                        </tbody>
                    </table>
                    <div className="admin-pagination">
                        <AdminPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            paginate={setCurrentPage}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};
export default AdminFaqList;