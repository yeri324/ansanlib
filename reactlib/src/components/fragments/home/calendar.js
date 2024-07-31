import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";
import HolidayDetail from "../../pages/admin/modal/HolidayDetail";
import axios from "axios";

const TodoCalendar = ({ locale }) => {
  const [today, setToday] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {}, [today]);

  // 모달 닫기
  const handleCloseModal = () => {
    setShowDetail(false);
  };

  // 모달 열기
  const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchSelectedDateHolidays(date);
    setShowDetail(true);
  };

  // 선택 날짜 휴일 여부 가져오기
  const fetchSelectedDateHolidays = (date) => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    axios({
      url: '/api/holiday/list',
      method: 'get',
      params: {
        date: nextDate.toISOString().split('T')[0]
      }
    }).then((response) => {
      setSelectedHolidays(response.data.result);
    }).catch((error) => {
      setSelectedHolidays([]);
    });
  };

  return (
    <div id="todo-calendar-container" className="calendar-container">
      <Calendar
       locale={locale}
        onClickDay={handleDateClick}
        value={today}
      />
      <HolidayDetail
        show={showDetail}
        handleClose={handleCloseModal}
        holidays={selectedHolidays}
        selectedDate={selectedDate} // 모달에 선택된 날짜 전달
      />
    </div>
  );
};

export default TodoCalendar;
