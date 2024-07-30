import React, { useEffect, useState } from 'react';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import Trends from './Trends';
import Notice from './notice';
import TodoCalendar from './calendar';
import "react-calendar/dist/Calendar.css";
import Kakao from '../../map/mapForm';
import Popup from './popup';

// import KeywordCloud from './KeywordCloud';
// import KeywordCloud_bookId from './KeywordCloud_bookId';
// import BookCloud from './bookCloud';
// import StatisticsPage from '../../pages/visit/StatisticsPage';
// import Calendar from 'react-calendar'

import axios from 'axios';

const HomePage = () => {

  const [popList, setPopList] = useState([])
  const [recList , setRecList] = useState([])
  const [newBookList , setNewBookList] = useState([])


  useEffect(() => {
    getPopList()
    getnewbookList()
    getRecList()
  }, [])

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

  const getRecList =() => {
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

      const resList = response.data.content.map(item=>item.book)
      console.log(resList)
      setRecList(resList)
      });
}

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
      console.log(response.data)
      setNewBookList(response.data)
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
              <input className='search-input'/><button className='search-btn'>검색</button>
             </div>
              </div>
              <div className='quick-menu'>
              <div className='quick-content'>
                <h5>도서관소개</h5>
                </div>
              <div className='quick-content'>
                <h5>신규도서</h5>
                </div>
              <div className='quick-content'>
                <h5>추천도서</h5>
                </div>
              <div className='quick-content'>
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
              <Trends book={recList}/>
              </div>
            </div>
            <div className="book-content">
              <h2>신규도서</h2>
              <hr />
              <div className="trend-list">
              <Trends book={recList}/>
              </div>
            </div>
            </div>


            <div className="sub-content2">
              <div className="lib-h2"><h2>오시는 길</h2></div>
              <div className="div-border"><hr /></div>
              <div className="lib-guide">
                <Kakao />
              </div>
            </div>

  </div>
        
      <footer><Footer /></footer>
    </>
  );
}

export default HomePage;
