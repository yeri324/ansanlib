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
        axios(
            {
                url: '/admin/recboard/searchbook',
                method: 'post',
                data: {
                    searchQuery: queryRef.current.value,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            setSearchList(response.data);
        });

    }

    const onSelect = (e) => {
        console.log(e);
        setSelectBook(e);
        setIsOpen(false);
    }

    return (
        <div className='searchModal'>
            <div class='close-btn'>
                <button type='button' onClick={() => setIsOpen(false)}>&times;</button>
            </div>
            <div class='search-tab'>
                <input ref={queryRef} type="text" />
                <button class='search-btn' type='button' onClick={onSearch}>검색</button>
            </div>
            <div class='search-list'>
                <table class='s-table'>
                    <tr>
                        <td class="td-title">제목</td>
                        <td class="td-author">저자</td>
                        <td class="td-publisher">출판사</td>
                        <td class="td-pub_date">출판년도</td>
                    </tr>
                    {searchList.map((list) => (
                        <tr key={list.id} onClick={() => onSelect(list)}>
                            <td>{list.title}</td>
                            <td>{list.author}</td>
                            <td>{list.publisher}</td>
                            <td>{list.pub_date}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    )
}
export default SearchModal;