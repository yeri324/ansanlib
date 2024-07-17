import './SearchModal.css';
import axios from 'axios';
import { useState ,useRef} from 'react';

function SearchModal({setIsOpen,setSelectBook}){
    const [searchList,setSearchList] = useState([]);
    const queryRef = useRef("");
    const onSearch=()=>{
        axios(
            {
                url: '/admin/recboard/searchbook',
                method: 'post',
                data: {
                    searchQuery : queryRef.current.value,
                },
                baseURL: 'http://localhost:8090',
            }
        ).then((response) => {
            setSearchList(response.data);
        });

    }

    const onSelect=(e)=>{
        console.log(e);
        setSelectBook(e);
        setIsOpen(false);
    }

    return (
        <div className='searchModal'>
        <button onClick={() => setIsOpen(false)}>&times;</button>
        <div>
        <input ref={queryRef} type="text" />
        <button onClick={onSearch}>검색</button>
        </div>

        <div>
            <table>
                <tr>
                    <td>제목</td>
                    <td>저자</td>
                    <td>출판사</td>
                    <td>출판년도</td>
                </tr>
            {searchList.map((list)=>(
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