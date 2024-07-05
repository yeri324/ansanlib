import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import FaqItem from './FaqItem';

function FaqList() {
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
    const [totalFaqCount, setTotalFaqCount] = useState(0);
    const faqPerPage = 8;

    //리스트 읽기
    useEffect(() => {
        onSearch(currentPage);
    }, [currentPage, searchOption]);

    // 생성페이지 이동
    const onCreate = () => {
        navigate('/faq/new')
    }

    //상세페이지 이동
    const onDetail = (faq) => {
        window.location.reload(navigate(`/faq/detail/${faq.id}`, {
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
                    page: page-1,
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
                    url: '/faq/delete',
                    method: 'delete',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/faq/list", { repalce: true }));
        }
    };

    return (
        <div>
            <div>
                <select name="searchBy" value={searchOption.searchBy} onChange={handleOnChange}>
                    <option value="loginid">ID</option>
                    <option value="title">Title</option>
                </select>
                <input type="text" name="searchQuery" value={searchOption.searchQuery} onChange={handleOnChange} />
                <button onClick={onSearch}>Search</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th> - </th>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성시간</th>
                        <th>수정시간</th>
                    </tr>
                </thead>
                <div className="slide">
                    {searchResult.map((faq) => (
                        <FaqItem key={faq.id} faq={faq} checkedList={checkedList} checkHandler={checkHandler} onDetail={onDetail}/>
                   ))}
                </div>
                
                <button onClick={onDelete}>삭제하기</button>
                <button onClick={onCreate}>작성하기</button>
            </table >
            {/* 페이징 */}
            <div className="count_item">
                총 {totalFaqCount}건 / {totalPages} 페이지
            </div>
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

export default FaqList;