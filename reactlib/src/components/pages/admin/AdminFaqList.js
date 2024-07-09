import axios from 'axios';
import React, { useEffect, useState, } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminFaqList() {
    const [checkedList, setCheckedList] = useState([]);
    const navigate = useNavigate();
    const [searchResult, setSerchResult] = useState([]);
    const [searchOption, setSearchOption] = useState({
        searchBy: "title",
        searchQuery: "",
    });

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

    //리스트 읽기
    useEffect(() => {
        onSearch();
    }, []);

    //상세페이지 이동
    const handleDetail = ({ item }) => {
        navigate(`/faq/detail/${item}`, {
            state: {
                ...item,
            }
        })
    }

    // 기준검색
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
            setSerchResult(response.data);
        });

    }

    //FAQ 다중삭제하기
    const onDelete = () => {
        if (window.confirm('삭제 하시겠습니까?')) {
            axios(
                {
                    url: `/faq/delete`,
                    method: 'DELETE',
                    data: {
                        idList: checkedList,
                    },
                    baseURL: 'http://localhost:8090',
                }
            )
            window.location.reload(navigate("/faq/list", { repalce: true }));
        }

    }

    // 생성페이지 이동
    const onCreate = () => {
        navigate(`/faq/new`)
    }

    // 업데이트
    // function onUpdate() {
    //     if (window.confirm('수정 하시겠습니까?')) {
    //         axios(
    //             {
    //                 url: `/faq/detail/${id}`,
    //                 method: 'put',
    //                 data: {
    //                     id: id,
    //                     title: title,
    //                     content: content,
    //                 },
    //                 baseURL: 'http://localhost:8090',
    //             }
    //         ).then(function (response) {
    //             console.log(response.data);
    //         });
    //         navigate("/faq/list", { repalce: true });
    //     }
    // }

    return (
        // <FaqStateContext.Provider value={data}>
        //     <FaqDispatchContext.Provider value={{onSearch, onDelete, onCreate, onUpdate}}>
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
                       

                            {searchResult.map((item) => (

                                // <FaqItem key={item.id}  {...item} />
                                  <tr>
                                    <td>{item.id}</td>
                                    <td onClick={() => handleDetail({ item })}>{item.title}</td>
                                    <td>{item.regTime}</td>
                                    <td>{item.updateTime}</td>
                                  </tr>
                            ))}

                      
                        <button onClick={onDelete}>삭제하기</button>
                        <button onClick={onCreate}>작성하기</button>
                    </table >
                </div >
        //     </FaqDispatchContext.Provider>
        // </FaqStateContext.Provider>
    );
};

export const FaqStateContext = React.createContext();
export const FaqDispatchContext = React.createContext();

export default AdminFaqList;