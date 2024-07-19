import './SearchModal.css';
import useAuth from '../../../hooks/useAuth';
import { useState, useRef } from 'react';

function SearchModal({ setIsOpen, setSelectBook }) {
    const { axios } = useAuth();
    const [searchList, setSearchList] = useState([]);
    const queryRef = useRef("");

    // 검색
    const onSearch = () => {
        console.log(queryRef.current.value);
        axios({
            url: '/admin/recboard/searchbook',
            method: 'post',
            data: {
                searchQuery: queryRef.current.value,
            },
            baseURL: 'http://localhost:8090',
        }).then((response) => {
            setSearchList(response.data);
        }).catch((error) => {
            console.error("Error searching for books:", error);
        });
    };

    const onSelect = (e) => {
        console.log(e);
        setSelectBook(e);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onSearch();
        }
    };

    return (
        <div className='searchModal'>
            <div className='close-btn'>
                <button type='button' onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <div className='search-tab'>
                <input ref={queryRef} type="text" onKeyDown={handleKeyDown} />
                <button className='search-btn' type='button' onClick={onSearch}>검색</button>
            </div>
            <div className='search-list'>
                <table className='s-table'>
                    <thead>
                        <tr>
                            <td className="td-title">제목</td>
                            <td className="td-author">저자</td>
                            <td className="td-publisher">출판사</td>
                            <td className="td-pub_date">출판년도</td>
                        </tr>
                    </thead>
                    <tbody>
                        {searchList.map((list) => (
                            <tr key={list.id} onClick={() => onSelect(list)}>
                                <td>{list.title}</td>
                                <td>{list.author}</td>
                                <td>{list.publisher}</td>
                                <td>{list.pub_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SearchModal;
