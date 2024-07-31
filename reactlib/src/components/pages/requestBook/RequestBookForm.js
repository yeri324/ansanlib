import React, { useEffect, useState } from 'react';
import useRealName from '../../hooks/useRealName';
import useAuth, { LOGIN_STATUS } from '../../hooks/useAuth';
import RedirectLogin from '../../helpers/RedirectLogin';
import Auth from '../../helpers/Auth';
import Header from '../../fragments/header/header';
import Footer from '../../fragments/footer/footer';
import Side from '../myPage/Side';
import './RequestBookForm.css';
import { useLocation } from 'react-router-dom';

const RequestBookForm = () => {
  const name = useRealName();
  const location = useLocation();
 const reqbook = location.state?location.state.book: "";
  const { axios } = useAuth();

  const [isbn, setIsbn] = useState(reqbook.isbn);
  const [title, setTitle] = useState(reqbook.title);
  const [author, setAuthor] = useState(reqbook.author);
  const [publisher, setPublisher] = useState(reqbook.publisher);
  const [pubDate, setPubDate] = useState(reqbook.pubdate);
  const [libName, setLibName] = useState('감골도서관');
  const libList = ['감골도서관','반월도서관','부곡도서관','본오도서관','상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관', '관산도서관' ,'단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관']

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBook = {
      isbn, title, author, publisher,
      pubDate, lib_name: libName
    };

    try{
      const response = await axios.post('/api/requestbook/create', requestBook);
      alert("신청되었습니다.");
    } catch (error){
      if(typeof error.response.data === "string"){
        alert(`에러 : ${error.response.data}`);
      } else {
        alert(`에러 : ${error.message}`);
      }

      console.error('There was an error creating the requestBook!', error.response.data);
    }
  }

  return (

    <div className="mypage-container">
    <div className='mypage-header'>
      <h2 className='mypage-header-name'>{name}님의 도서신청</h2>
    </div>

    <form className='requestbookform' onSubmit={handleSubmit}>
      <div>
        <label>도서 ISBN:</label>
        <input 
          type="text" 
          value={isbn} 
          onChange={(e) => setIsbn(e.target.value)} 
          readOnly 
        />
      </div>
      <div>
        <label>책 제목:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          readOnly 
        />
      </div>
      <div>
        <label>저자:</label>
        <input 
          type="text" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
          readOnly
        />
      </div>
      <div>
        <label>출판사:</label>
        <input 
          type="text" 
          value={publisher} 
          onChange={(e) => setPublisher(e.target.value)} 
          readOnly
        />
      </div>
      <div>
        <label>출판일:</label>
        <input 
          type="text" 
          value={pubDate} 
          onChange={(e) => setPubDate(e.target.value)} 
          readOnly
        />
      </div>
      <div>
        <label> 신청 할 도서관 :</label>
        <select  onChange={(e) => setLibName(e.target.value)}>
          {libList.map((item)=>(
            <option key={item} value={item} >{item}</option>
          ))}
        </select>
      </div>
      <button type="submit">신청하기</button>
    </form>
    </div>
  );
};

export default function() {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN}>
      <Header />
        <div className="MyPage-body">
          <Side />
          <RequestBookForm  />
        </div>
        <Footer />
      </Auth>
    </>
  );
};
