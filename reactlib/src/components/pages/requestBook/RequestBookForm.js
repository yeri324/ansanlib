import React, { useState } from 'react';
import useRealName from '../../hooks/useRealName';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';

const RequestBookForm = () => {
  const name = useRealName();

  const { axios } = useAuth();

  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pubDate, setPubDate] = useState('');
  const [libName, setLibName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBook = {
      isbn, title, author, publisher,
      pubDate, lib_name: libName
    };
    console.log("Sending request with data:", requestBook);

    try{
      const response = await axios.post('/api/requestbook/create', requestBook);
      alert("신청되었습니다.");
      console.log('RequestBook created:', response.data);
    } catch (error){
      if(typeof error.response.data === "string"){
        alert(`에러 : ${error.response.data}`);
      } else {
        alert(`에러 : ${error.message}`);
      }

      console.error('There was an error creating the requestBook!', error.response.data);
    }
  }
  //   axios.post('/api/requestbook', requestBook, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response => {
  //     console.log('Book request created:', response.data);
  //     alert('신청되었습니다.');
  //     setIsbn('');
  //     setTitle('');
  //     setAuthor('');
  //     setPublisher('');
  //     setPubDate('');
  //     setUserId('');
  //     setLibName('');
  //   })
  //   .catch(error => {
  //     if(error.response){
  //       alert(`에러 : ${error.response.data}`);
  //     } else if(error.request){
  //       alert('서버에 요청을 보내는 중 오류가 발생했습니다.');
  //     } else{
  //       alert(`에러 : ${error.message}`);
  //     }
  //   });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <h2> {name}의 도서신청</h2>
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

export default function() {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
        <RequestBookForm />
      </Auth>
    </>
  );
};
