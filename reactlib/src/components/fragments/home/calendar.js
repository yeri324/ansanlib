import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./calendar.css";
import HolidayDetail from "../../pages/admin/modal/HolidayDetail";
import axios from "axios";

const TodoCalendar = () => {
  const [today, setToday] = useState(new Date());
  const [showDetail, setShowDetail] = useState(false);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
  },[today])

  // 모달 닫기
  const handleCloseModal = () => {
    setShowDetail(false);
  };

  // 모달 열기
  const handleDateClick = (today) => {
    setSelectedDate(today);
    fetchSelectedDateHolidays(today);
    setShowDetail(true);
  };

  // 선택 날짜 휴일 여부 가져오기
  const fetchSelectedDateHolidays = (today) => {
    const adjustDate = (today, days) => {
      const result = new Date(today);
      result.setDate(result.getDate() + days);
      return result;
    };

    const nextDate = adjustDate(today, 1);
    axios({
      url: '/api/admin/holiday/list',
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
        locale="ko"
        onClickDay={handleDateClick}
        value={today}
      />
      <HolidayDetail
        show={showDetail}
        handleClose={handleCloseModal}
        holidays={selectedHolidays}
      />
    </div>
  );
};

export default TodoCalendar;
