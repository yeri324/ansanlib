import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import "./calendar.css";

const TodoCalendar = () => {
  const [today, setToday] = useState(new Date());
  const navigate = useNavigate();

  const onClickDay = date => {
    navigate(`/calendarDetail?date=${date.toISOString().split('T')[0]}`);
  };

  return (
    <div id="todo-calendar-container" className="calendar-container">
      <Calendar
        locale="ko"
        onChange={setToday}
        onClickDay={onClickDay}
        value={today}
      />
    </div>
  );
};

export default TodoCalendar;
