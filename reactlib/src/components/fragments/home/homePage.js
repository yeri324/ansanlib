import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import BookSlider from './BookSlider';
import Notice from './notice';
import TodoCalendar from './calendar';
import "react-calendar/dist/Calendar.css";
import LibMap from './LibMap';
import Popup from './popup';

import axios from 'axios';

const HomePage = () => {
  const navigate = useNavigate();
  const [popList, setPopList] = useState([])
  const [recList, setRecList] = useState([])
  const [newBookList, setNewBookList] = useState([])

  useEffect(() => {
    getPopList()
    getnewbookList()
    getRecList()
  }, [])

  //팝업리스트
  const getPopList = () => {
    axios({
      url: `/api/popup/home`,
      method: 'get',
      baseURL: 'http://localhost:8090',
    }
    ).then((res) => {
      setPopList(res.data);
    })
  }

  // 추천도서 리스트 조회
  const getRecList = () => {
    axios(
      {
        url: '/recboard/search',
        method: 'post',
        data: {
          page: 0,
          size: 8,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((response) => {

      const resList = response.data.content.map(item => item.book)
      console.log(resList)
      setRecList(resList)
    });
  }

  // 신규도서 리스트 조회
  const getnewbookList = () => {
    axios(
      {
        url: '/newBook',
        method: 'post',
        data: {
          page: 0,
          size: 8,
        },
        baseURL: 'http://localhost:8090',
      }
    ).then((response) => {
      console.log(response.data.content)
      setNewBookList(response.data.content)

    });
  }

  return (
    <>
      <header><Header /></header>
      <div id="home-popup">
        {popList.map((popup) => (<Popup key={popup.id} popup={popup} />))}

      </div>
      <div id="home-main-content" >
        <div className="search-div" >
          <div className='search-input-group'>
            <input className='search-input' /><button className='search-btn'>검색</button>
          </div>
        </div>
        <div className='quick-menu'>
          <div className='quick-content' onClick={()=> window.location.reload(navigate('/intro/history'))}>
            <h5>도서관소개</h5>
          </div>
          <div className='quick-content' onClick={()=> window.location.reload(navigate('/newBook'))}>
            <h5>신규도서</h5>
          </div>
          <div className='quick-content' onClick={()=> window.location.reload(navigate('/user/recboard/list'))}>
            <h5>추천도서</h5>
          </div>
          <div className='quick-content' onClick={()=> window.location.reload(navigate('/requestbook/new'))}>
            <h5>희망도서신청</h5>
          </div>
        </div>
        <div className="bottom-column">
          <div className="notice-board">
            <Notice />
          </div>
          <div className="monthly-plan">
            <div className='calendar-title'><h4>도서관 휴관일</h4></div>
            <TodoCalendar
            />
          </div>
        </div>

        <div className="book-content-group">
          <div className="book-content">
            <h2>추천도서</h2>
            <hr />
            <div className="trend-list">
              <BookSlider bookList={recList} />
            </div>
          </div>
          <div className="book-content">
            <h2>신규도서</h2>
            <hr />
            <div className="trend-list">
              <BookSlider bookList={newBookList} />
            </div>
          </div>
        </div>
        <div className="lib-info-container">
          <div className="lib-info">
            <h2>오시는 길</h2>
            <hr />
            <div className="lib-guide">
              <LibMap />
            </div>
          </div>
        </div>

      </div>

      <footer><Footer /></footer>
    </>
  );
}

export default HomePage;
