// Admin.js
import React, { useState } from 'react';
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
import BestsellerBoard from '../../../fragments/home/Bestseller';
import Notice from '../../../fragments/home/notice';
const Admin = () => {
  const { axios } = useAuth();
  const [date, setDate] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHolidays, setSelectedHolidays] = useState([]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setDate(date);
    fetchHolidays(date);
    setShowDetail(true);
  };

  const fetchHolidays = (date) => {
    console.log("Fetching holidays for date:", date);

    // 서버에서 해당 날짜의 휴관일 정보를 가져오는 로직을 구현합니다.
    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
      params: {
        date: date.toISOString().split('T')[0] // 날짜를 쿼리 파라미터로 전달
      }
    }).then((response) => {
      console.log("Fetched holidays:", response.data);
      setSelectedHolidays(response.data.result); // 서버 응답 데이터 사용
    }).catch((error) => {
      console.error("Error fetching holidays:", error);
      setSelectedHolidays([]); // 오류 발생 시 빈 배열로 설정
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
          <div className="admin-main-dash-top">
           
            
          </div>
          <div className="admin-main-dash-body">
            <div className="admin-main-left" style={{ width: "20%" }}>
              <div className="admin-left-box1 calendar-container">
                <Calendar
                
                  locale="en-US"
                  onChange={handleDateClick}
                  value={date}
                />
                <HolidayDetail
                  show={showDetail}
                  handleClose={handleCloseModal}
                  holidays={selectedHolidays}
                />
              </div>
              <div className="admin-left-box2">
                <HolidayListTable excludedColumns={['delete']} />
              </div>
              <div className="admin-left-box3">
                <AdminBookRequestTable excludedColumns={['count']}
                 />
              </div>
            </div>
            <div className="admin-main-right" style={{ width: "80%" }}>
              <div className="admin-right-box1">

                <div className='admin-right-graph'>

                  그래프1
                </div>

                <div className='admin-right-graph'>

                  그래프2
                </div>

                <div className='admin-right-graph'>


                  그래프3
                </div>



              </div>
              <div className="admin-right-box2">
                
                <div className='admin-right-board'>

                  <BestsellerBoard />
                </div>

                <div className='admin-right-board'>

                게시판
                </div>
              </div>
              <div className="admin-right-box3">
                box3-faq공지사항팝업관린
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
