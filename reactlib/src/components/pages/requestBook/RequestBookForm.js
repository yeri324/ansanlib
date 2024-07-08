import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RequestBookForm = () => {
  const navigate = useNavigate();

  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [libName, setLibName]  =useState('');

  useEffect(()=>{
    const memberData = JSON.parse(sessionStorage.getItem("member") ?? "null");
    if(memberData?.userId){
      setUserId(memberData?.userId);
      setUserName(memberData?.name);
    } else{
        alert("로그인이 되어있지 않습니다.");
        navigate("/login");
    }
  },[]);

  const handleSubmit = (event) => {
    event.preventDefault();

  const requestBook = {
      isbn, title, author, publisher,
      pubDate, userId: parseInt(userId), lib_name: libName
  };

    axios.post('/api/requestbook', requestBook, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Book request created:', response.data);
      alert('신청되었습니다.');
      setIsbn('');
      setTitle('');
      setAuthor('');
      setPublisher('');
      setPubDate('');
      setUserId('');
      setLibName('');
    })
    .catch(error => {
      if(error.response){
        alert(`에러 : ${error.response.data}`);
      } else if(error.request){
        alert('서버에 요청을 보내는 중 오류가 발생했습니다.');
      } else{
        alert(`에러 : ${error.message}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2> {userName}의 도서신청</h2>
      <div>
        <label>도서 ISBN:</label>
        <input 
          type="text" 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>책 제목:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>저자:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>출판사:</label>
        <input 
          type="text" 
          value={publisher} 
          onChange={(e) => setPublisher(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>출판일:</label>
        <input 
          type="date" 
          value={pubDate} 
          onChange={(e) => setPubDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label> 신청 할 도서관 :</label>
        <input 
          type="text" 
          value={libName} 
          onChange={(e) => setLibName(e.target.value)} 
          required 
        />
      </div>
      {/*<div>
        <label>User ID:</label>
        <input 
          type="text" 
          value={userId} 
          onChange={(e) => setUserId(e.target.value)} 
          required 
        />
      </div>*/}
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestBookForm;
