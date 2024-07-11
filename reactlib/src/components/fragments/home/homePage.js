import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';
import BookSearch from './booksearch';
import Trends from './Trends';
import Notice from './notice';
import New from './new';
import TodoCalendar from './calendar';
import Kakao from '../../map/mapForm';
import Bestseller from './Bestseller';
import "react-calendar/dist/Calendar.css";
import LibraryPage from '../../pages/visit/LibraryPage';
// import BookCloud from './bookCloud';
// import StatisticsPage from '../../pages/visit/StatisticsPage';
// import Calendar from 'react-calendar'
// import { styled } from "styled-components";

const HomePage = () => {
  return (
    <>
      <header><Header /></header>
      <section>
        <div id="home-main-content" className="main_content">
          <div id="home-main-grid" className="main_grid">
            <div id="home-content-grid" className="content_grid">
              <div id="home-top-column" className="top_column">
                <div id="home-hr-div" className="hr_div"><hr></hr></div>
                <div id="home-book-search" className="book_search">
                  <BookSearch />
                </div>
              </div>
              <div id="home-bottom-column" className="bottom_column">
                <div id="home-notice-board" className="notice_board">
                  <Notice />
                </div>
                <div id="home-monthly-plan" className="monthly_plan">
                  <TodoCalendar />
                </div>
                <div id="home-login-box" className="login_box">
                  <div className="new_h2"><h2>신규도서</h2></div>
                  <New />
                </div>
              </div>
            </div>
          </div>

          <div id="home-sub-content" className="sub_content">
            <div id="home-sub-content1" className="sub_content1">
              <div className="trend_h2"><h2>인기도서</h2></div>
              <div className="div_border"><hr></hr></div>              
              <div className="trend_list">
                <Trends />
              </div>
              <div className="trend_h2"><h2>베스트셀러</h2></div>
              <div className="div_border"><hr></hr></div>
              <div className="best_list">
                <Bestseller />
              </div>
              <div className="trend_h2"><h2>방문 통계</h2></div>
              <div className="div_border"><hr></hr></div>
              <div className="total_visit">
                <LibraryPage />
              </div>
            </div>
            <div id="home-sub-content2" className="sub_content2">
              <div className="lib_h2"><h2>오시는 길</h2></div>
              <div className="div_border"><hr></hr></div>
              <div className="lib_guide">
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
