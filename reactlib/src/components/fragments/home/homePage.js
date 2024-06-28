import Header from '../header/header';
import Footer from '../footer/footer';
import './homePage.css';
import React from 'react';
import BookSearch from './booksearch';
import CategorySlider from './recommend';
import Trends from './trends';
import Notice from './notice';
import Calendar from 'react-calendar'
import Kakao from '../../map/mapForm';
import { styled } from "styled-components";
import "react-calendar/dist/Calendar.css";
import book1 from '../../images/cover/book1.jpg'
import book2 from '../../images/cover/book2.jpg'
import book3 from '../../images/cover/book3.jpg'
import book4 from '../../images/cover/book4.jpg'

export const CalendarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyleCalendar = styled(Calendar)`
  max-width: 100%;
  border: none;
  margin-bottom: 15px;
  padding: 20px;

  .react-calendar__navigation {
    display: flex;
    height: 24px;
    margin-bottom: 1em;
  }

  .react-calendar__navigation button {
    min-width: 24px;
    background-color: none;
  }

  .react-calendar__navigation button:disabled {
    background-color: #e8e8e8;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e8e8e8;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.15em;
  }

  .react-calendar__year-view .react-calendar__tile,
  .react-calendar__decade-view .react-calendar__tile,
  .react-calendar__century-view .react-calendar__tile {
    padding: 1.2em 0.5em;
  }

  .react-calendar__tile--hasActive {
    color: #ffffff;
    background-color: #797979;
    border-radius: 5px;
  }

  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background-color: #797979;
  }

  .react-calendar__tile--active {
    color: #ffffff;
    background-color: #6a6a6a;
    border-radius: 7px;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #6a6a6a;
  }
`;

const HomePage = () => {

  const category1 = {
    id: 'category1',
    title: '카테고리 1',
    books: [
      { title: '도서 1', image: book1 },
      { title: '도서 2', image: book2 },
      { title: '도서 3', image: book3 },
      { title: '도서 4', image: book4 }
    ]
  };


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
                  <Calendar />
                </div>
                <div className="login_box">로그인</div>
              </div>
            </div>
          </div>

          <div className="sub_content1">
            <div className="trend_list">
              <Trends />
            </div>
          </div>
          <div className="sub_content2">
            <div className="recommend_content">
              <div className="recommend_menu">
                <div className="recommend_list">
                  슬라이드 임시 제거
                  {/* <CategorySlider title={category1.title} books={category1.books} /> */}
                </div>
              </div>
            </div>
            <div className="lib_guide">
              <Kakao />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}


export default HomePage;