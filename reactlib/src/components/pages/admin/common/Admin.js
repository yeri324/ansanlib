import React, { useState, useEffect } from 'react';
import AdminHeader from "./AdminHeader";
import AdminSide from "./AdminSide";
import './Admin.css';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import HolidayDetail from '../modal/HolidayDetail';
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';
import HolidayListTable from '../../admin/item/HolidayListTable';
import AdminBookRequestTable from '../item/AdminBookRequestTable';
import NewBooks from '../../../fragments/home/new';
import Trends from '../../../fragments/home/Trends';
import LibraryPage from '../../visit/LibraryPage';

const Admin = () => {
  const { axios } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [bookRequests, setBookRequests] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetchHolidays(date);
    fetchBookRequests();
  }, [date]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchHolidays(date);
    setShowDetail(true);
  };

  const fetchHolidays = (date) => {
    // Utility function to adjust the date
    const adjustDate = (date, days) => {
      const result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    };

    // Adjust the date by subtracting one day
    const previousDate = adjustDate(date, +1);

    console.log("Fetching holidays for date:", previousDate);

    // Fetch holidays for the current date
    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: date.toISOString().split('T')[0] // 날짜를 쿼리 파라미터로 전달
      }
    }).then((response) => {
      console.log("Fetched holidays for current date:", response.data);
      setHolidays(response.data.result); // 현재 날짜의 휴일 목록 설정
    }).catch((error) => {
      console.error("Error fetching holidays for current date:", error);
      setHolidays([]); // 오류 발생 시 빈 배열로 설정
    });

    // Fetch holidays for the previous date
    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: previousDate.toISOString().split('T')[0] // 날짜를 쿼리 파라미터로 전달
      }
    }).then((response) => {
      console.log("Fetched holidays for previous date:", response.data);
      setSelectedHolidays(response.data.result); // 모달에 표시할 데이터 설정
    }).catch((error) => {
      console.error("Error fetching holidays for previous date:", error);
      setSelectedHolidays([]); // 오류 발생 시 빈 배열로 설정
    });
  };

  const fetchBookRequests = () => {
    axios.get('/api/admin/book/request')
      .then(response => {
        setBookRequests(response.data.result);
        setSearchResult(response.data.result.slice(0, 3)); // 상위 3개 항목만 표시
      })
      .catch(error => {
        console.error('Error fetching book requests:', error);
      });
  };

  const handleCloseModal = () => {
    setShowDetail(false);
  };

  return (
    <div className="admin-page">
      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>
      <main className="admin-main-main">
        <div className="admin-main-body">
          <div className="admin-main-dash-top"></div>
          <div className="admin-main-dash-body">
            <div className="admin-main-left" style={{ width: "25%" }}>
              <div className='admin-left-box1'>
                <h4>오늘은 &nbsp;<span>{date.toISOString().split('T')[0]}</span> &nbsp;입니다.</h4>
              </div>
              <div className="admin-left-box2 calendar-container">
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
              <div className="admin-left-box3">
                <HolidayListTable holidays={holidays.slice(0, 3)} excludedColumns={['delete']} />
              </div>
              <div className="admin-left-box4">
                <div className='admin-right-board' style={{ width: "25%" }}>
                  <h3>신간도서</h3>
                  <NewBooks />
                </div>
              </div>
            </div>
            <div className="admin-main-right" style={{ width: "75%" }}>
              <div className="admin-right-box1">
                <div className='admin-right-graph'>
                  <LibraryPage />
                </div>
                <div className='admin-right-graph'>
                  그래프2
                </div>
                <div className='admin-right-graph'>
                  그래프3
                </div>
              </div>
              <div className="admin-right-box2">
                <div className='admin-right-board' style={{ width: "75%" }}>
                  <h3>추천도서</h3>
                  <Trends />
                </div>
                
              </div>
              <div className="admin-right-box3">
                <h3><a href="admin/book/request">희망도서신청</a></h3>
                <AdminBookRequestTable searchResult={searchResult} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <Admin />
      </Auth>
    </>
  );
}
