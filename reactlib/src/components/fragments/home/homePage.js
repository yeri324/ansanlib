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

  useEffect(() => {
    getPopList()
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
              <div className="bottom-column">
                <div className="notice-board">
                  <Notice />
                </div>
                <div className="monthly-plan">
                  <TodoCalendar 
                  />
                </div>

            </div>
          <div className="sub-content">
            <div className="sub-content1">
              <div className="trend-h2"><h2>인기도서</h2></div>
              <div className="div-border"><hr /></div>
              <div className="trend-list">
                <Trends />
              </div>
            </div>

            <div className="sub-content1">
              <div className="trend-h2"><h2>신규도서</h2></div>
              <div className="div-border"><hr /></div>
              <div className="trend-list">
                <h1>NewBook 자뤼</h1>
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
  </div>
        
      <footer><Footer /></footer>
    </>
  );
}

export default HomePage;
