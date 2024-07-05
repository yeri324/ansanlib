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
import "react-calendar/dist/Calendar.css";
import LibraryPage from '../../pages/visit/LibraryPage';
// import StatisticsPage from '../../pages/visit/StatisticsPage';
// import Calendar from 'react-calendar'
// import { styled } from "styled-components";


const HomePage = () => {


  return (
    <>
      <Header />
      <section>
        <div className="main_content">
          <div className="main_grid">
            <div className="content_grid">
              <div className="top_column">
                <div className="book_search">
                  <BookSearch />
                </div>
              </div>
              <div className="bottom_column">
                <div className="notice_board">
                  <Notice />
                </div>
                <div className="monthly_plan">
                  <TodoCalendar />
                </div>
                <div className="login_box">
                  <div className="new_h2"><h2>신규도서</h2></div>
                  <New />
                </div>
              </div>
            </div>
          </div>

          <div className="sub_content">
            <div className="sub_content1">
              <div className="trend_h2"><h2>인기도서</h2></div>
              <div className="div_border"><hr></hr></div>
              <div className="trend_list">
                <Trends />
              </div>
            </div>
            <div className="visit_content">
              <div className="total_visit">
                <LibraryPage />
              </div>
            </div>
            <div className="sub_content2">
              <div className="lib_h2"><h2>오시는 길</h2></div>
              <div className="div_border"><hr></hr></div>
              <div className="lib_guide">
                <Kakao />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


export default HomePage;