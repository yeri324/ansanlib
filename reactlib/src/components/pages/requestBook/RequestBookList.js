import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestBookList = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [requestBooks, setRequestBooks] = useState([]);
  const [selectedRequestBooks, setSelectedRequestBooks] = useState([]);
  const [isErrored, setErrored] =useState(false);

  useEffect(()=>{
    const memberData = JSON.parse(sessionStorage.getItem("member") ?? "null");
    if(memberData?.userId) {
      setUserId(memberData?.userId);
      setUserName(memberData?.name);
    } else {
        setErrored(true);
        alert("로그인이 되어있지 않습니다.");
        navigate("/login");
    }
  },[])
  
  const fetchRequestBook  = async () => {
    if(userId) {
      try{
        const response = await axios.get(`/api/requestbook/get/by-user/${userId}`);
        setRequestBooks(response.data);
      } catch(error){
        setErrored(true);
        console.error('There was an error fetching the request books!', error);
      }
    }
    
  };

  useEffect(()=>{ fetchRequestBook();}, [userId]);

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
          axios.delete(`/api/requestbook/${id}`)
      ));
      alert('선택한 도서가 삭제되었습니다.');
      setRequestBooks(requestBooks.filter(requestBook => !selectedRequestBooks.includes(requestBook.id)));
      setSelectedRequestBooks([]);
    } catch (error){
      console.error('도서 삭제 중 오류 발생',error)
;      alert('희망도서 삭제 중 오류가 발생하였습니다. ');
    }
  };

  const deselectAll =() => setSelectedRequestBooks([]);

  const selectAll = () => setSelectedRequestBooks(requestBooks.map(({id}) => id));

  return (
    <div>
      <h2>{userName}의 도서 신청 목록</h2>
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
