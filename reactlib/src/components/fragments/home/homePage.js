import React, { useEffect, useState } from 'react';
import './homePage.css';
import Header from '../header/header';
import Footer from '../footer/footer';
import BookSearch from './booksearch';
import Trends from './Trends';
import Notice from './notice';
import New from './new';
import HolidayDetail from '../../pages/admin/modal/HolidayDetail';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";
import Kakao from '../../map/mapForm';
import Popup from './popup';
import useAuth, { LOGIN_STATUS, ROLES } from '../../hooks/useAuth';
import Auth from '../../helpers/Auth';
import RedirectLogin from '../../helpers/RedirectLogin';
// import KeywordCloud from './KeywordCloud';
// import KeywordCloud_bookId from './KeywordCloud_bookId';
// import BookCloud from './bookCloud';
// import StatisticsPage from '../../pages/visit/StatisticsPage';
// import Calendar from 'react-calendar'

import axios from 'axios';

const HomePage = () => {

  const { axios } = useAuth();
  const [popList, setPopList] = useState([])
  const [date, setDate] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHolidays, setSelectedHolidays] = useState([]);

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

  

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchSelectedDateHolidays(date);
    setShowDetail(true);
  };

  const fetchSelectedDateHolidays = (date) => {
    const adjustDate = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    const nextDate = adjustDate(date, 1);

    console.log("Fetching holidays for selected date:", nextDate);

    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: nextDate.toISOString().split('T')[0]
      }
    }).then((response) => {
      console.log("Fetched holidays for selected date:", response.data);
      setSelectedHolidays(response.data.result);
    }).catch((error) => {
      console.error("Error fetching holidays for selected date:", error);
      setSelectedHolidays([]);
    });
  };

  const handleCloseModal = () => {
    setShowDetail(false);
  };

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
                <Calendar
                locale="en-US"
                onClickDay={handleDateClick}
                value={date}
              />
              <HolidayDetail
                show={showDetail}
                handleClose={handleCloseModal}
                holidays={selectedHolidays}
              />
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

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <HomePage />
      </Auth>
    </>
  );
}
