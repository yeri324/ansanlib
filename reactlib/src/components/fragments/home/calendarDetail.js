import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendarDetail.css";

const CalendarDetail = () => {
  const location = useLocation();
  const dateParam = new URLSearchParams(location.search).get("date");
  const selectedDate = new Date(dateParam);

  const [events, setEvents] = useState([
    { date: "2024-07-15", title: "Sample Event 1" },
    { date: "2024-07-15", title: "Sample Event 2" }
  ]);
  const [newEventTitle, setNewEventTitle] = useState('');

  useEffect(() => {
    // 해당 날짜의 일정을 가져오는 로직 추가 (API 호출 등)
  }, [selectedDate]);

  const addEvent = () => {
    const newEvent = { date: selectedDate.toISOString().split('T')[0], title: newEventTitle };
    setEvents([...events, newEvent]);
    setNewEventTitle('');
  };

  const deleteEvent = (eventTitle) => {
    setEvents(events.filter(event => !(event.date === selectedDate.toISOString().split('T')[0] && event.title === eventTitle)));
  };

  const dayEvents = events.filter(
    event => new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="calendar-detail-container">
      <h2>{selectedDate.toDateString()}의 일정</h2>
      <Calendar
        locale="ko"
        value={selectedDate}
        onClickDay={(date) => {
          window.location.href = `/calendarDetail?date=${date.toISOString().split('T')[0]}`;
        }}
      />
      <div className="event-list">
        {dayEvents.length > 0 ? (
          dayEvents.map((event, index) => (
            <div key={index} className="event-item">
              {event.title}
              <button onClick={() => deleteEvent(event.title)}>삭제</button>
            </div>
          ))
        ) : (
          <div>일정 없음</div>
        )}
      </div>
      <div className="add-event-form">
        <input
          type="text"
          placeholder="일정 제목"
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        />
        <button onClick={addEvent}>일정 추가</button>
      </div>
    </div>
  );
};

export default CalendarDetail;
