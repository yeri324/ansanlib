import React, { useEffect, useState } from 'react';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import BookSearch from './booksearch';
import Trends from './Trends';
import Notice from './notice';
import New from './new';
import TodoCalendar from './calendar';
import "react-calendar/dist/Calendar.css";
import Kakao from '../../map/mapForm';
import Bestseller from './Bestseller';
import LibraryPage from '../../pages/visit/LibraryPage';
import Popup from './popup';
import KeywordCloud from './KeywordCloud';
import KeywordCloud_bookId from './KeywordCloud_bookId';
// import BookCloud from './bookCloud';
// import StatisticsPage from '../../pages/visit/StatisticsPage';
// import Calendar from 'react-calendar'
// import { styled } from "styled-components";

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
      <section>
        <div id="home-popup">
          {popList.map((popup) => (<Popup key={popup.id} popup={popup} />))}

        </div>
        <div id="home-main-content" className="main-content">
          <div className="main-grid">
            <div className="content-grid">
              <div className="top-column">
                <div className="hr-div"><hr /></div>
                <div className="book-search">
                  <BookSearch />
                </div>
              </div>
              <div className="bottom-column">
                <div className="notice-board">
                  <Notice />
                </div>
                <div className="monthly-plan">
                  <TodoCalendar />
                </div>
                <div className="login-box">
                  <div className="new-h2"><h2>신규도서</h2></div>
                  <New />
                </div>
              </div>
            </div>
          </div>
          <div className="sub-content">
            <div className="sub-content1">
              <div className="trend-h2"><h2>인기도서</h2></div>
              <div className="div-border"><hr /></div>
              <div className="trend-list">
                <Trends />
              </div>
              <div className="trend-h2"><h2>베스트셀러</h2></div>
              <div className="div-border"><hr /></div>
              <div className="best-list">
                <Bestseller />
              </div>
              <div className="trend-h2"><h2>방문 통계</h2></div>
              <div className="div-border"><hr /></div>
              <div className="total-visit">
                <LibraryPage />
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
      </section>
      <footer><Footer /></footer>
    </>
  );
}

export default HomePage;
