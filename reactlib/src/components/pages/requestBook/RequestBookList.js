import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useRealName from '../../hooks/useRealName';
import useAuth,{ LOGIN_STATUS } from '../../hooks/useAuth';

const RequestBookList = () => {
  const navigate = useNavigate();

  const name = useRealName();

  const [requestBooks, setRequestBooks] = useState([]);
  const [selectedRequestBooks, setSelectedRequestBooks] = useState([]);
  const [isErrored, setErrored] =useState(false);

  const { loginStatus } = useAuth();

  useEffect(()=>{
    //로그아웃됨.
    if(loginStatus === LOGIN_STATUS.LOGGED_OUT) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }
  }, [loginStatus]); //로그인 상태 변경시 useEffect 실행

  const fetchRequestBook  = async () => {
    if(loginStatus === LOGIN_STATUS.LOGGED_IN) {
      try{
        const response = await axios.get(`/api/requestbook/get`);
        setRequestBooks(response.data);
        setErrored(false);
      } catch(error){
        if (error.response) {
          // 서버가 응답을 반환한 경우 (예: 4xx, 5xx 오류)
          console.error('Server responded with an error:', error.response.data);
        } else if (error.request) {
          // 요청이 서버에 도달하지 않은 경우 (예: 네트워크 오류)
          console.error('Request did not reach the server:', error.request);
        } else {
          // 기타 오류 처리
          console.error('Error while making the request:', error.message);
        }
        setErrored(true);
      }
    } else {
        setRequestBooks([]);
        setErrored(true);
      }
    
  };

  useEffect(()=>{ fetchRequestBook();}, [loginStatus]);

  const handleSelectRequestBook =(requestBookId)=>{
    setSelectedRequestBooks(prevSelected=>
      prevSelected.includes(requestBookId)
        ? prevSelected.filter(id => id !== requestBookId)
        : [...prevSelected, requestBookId]
    );
  };

  const handleDeleteRequestBook = async()=>{
    try{
      await Promise.all(selectedRequestBooks.map(id =>
          axios.delete(`/api/requestbook/delete/${id}`)
      ));
      alert('선택한 도서가 삭제되었습니다.');
      setRequestBooks(requestBooks.filter(requestBook => !selectedRequestBooks.includes(requestBook.id)));
      setSelectedRequestBooks([]);
    } catch (error){
      console.error('도서 삭제 중 오류 발생',error);
;      alert('희망도서 삭제 중 오류가 발생하였습니다. ');
    }
  };

  const deselectAll =() => setSelectedRequestBooks([]);

  const selectAll = () => setSelectedRequestBooks(requestBooks.map(({id}) => id));

  return (
    <div>
      <h2>{name}의 도서 신청 목록</h2>
      <ul>
        {requestBooks.map(book => (
          <li key={book.id}>
            <input
              type="checkbox"
              checked={selectedRequestBooks.includes(book.id)}
              onChange={() => handleSelectRequestBook(book.id)}
            />
            책 제목:{book.title} <br/>
            저자 : {book.author} (ISBN: {book.isbn})<br />
            출판사: {book.publisher}, 출판일: {new Date(book.pub_date).toLocaleDateString()}
            신청 한 도서관 : {book.lib_name}
          </li>
        ))}
      </ul>
      {
        !isErrored &&
        <>
          <button 
            onClick={selectAll}
            disabled={selectedRequestBooks.length === requestBooks.length}
          >
            전체 선택
          </button>
          <button 
            onClick={deselectAll}
            disabled={selectedRequestBooks.length === 0}
          >
            전체 선택해제
          </button>
          <button 
            onClick={handleDeleteRequestBook}
            disabled={selectedRequestBooks.length === 0}
          >
            삭제
          </button>
        </>
      }
     {isErrored && <h2>신청한 도서가 없습니다.</h2>}
    </div>
  );
};

export default RequestBookList;
