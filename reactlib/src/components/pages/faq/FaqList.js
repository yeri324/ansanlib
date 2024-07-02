import './FaqList.css';
import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import FaqItem from './FaqItem';

function FaqList() {
    const [checkedList, setCheckedList] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const [searchResult, setSerchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

    //리스트 읽기
    useEffect(() => {
        onSearch();
    }, []);

    // 생성페이지 이동
    const onCreate = () => {
        navigate(`/faq/new`)
    }

    //상세페이지 이동
    const handleDetail = (faq) => {
        window.location.reload(navigate(`/faq/detail/${faq.id}`, {
            state: {
                ...faq
            }
        }))
    }

    const onSearch = () => {
        console.log(searchOption.searchBy, searchOption.searchQuery)
        axios(
            {
                url: '/faq/search',
                method: 'post',
                data: {
                    searchBy: searchOption.searchBy,
                    searchQuery: searchOption.searchQuery,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            console.log(response.data.result);
            setSerchResult(response.data.result);
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

    // 삭제용 체크리스트
    const checkHandler = (e, value) => {
        setIsChecked(!isChecked);
        checkedHandler(value, e.target.checked);
    };

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
    }

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
                        <FaqItem key={faq.id} faq={faq} checkedList={checkedList} checkHandler={checkHandler} handleDetail={handleDetail} />
                    ))}

                </div>
                <button onClick={onDelete}>삭제하기</button>
                <button onClick={onCreate}>작성하기</button>
            </table >
        </div >
    );
};

export default FaqList;