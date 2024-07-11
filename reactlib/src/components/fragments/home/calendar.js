import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // calendar.css 임포트
import Modal from "./modal"; // 모달 컴포넌트 임포트

const TodoCalendar = () => {
  const [today, setToday] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [newEventDate, setNewEventDate] = useState(new Date());
  const [newEventTitle, setNewEventTitle] = useState('');
  const [showAddEventForm, setShowAddEventForm] = useState(false);

  const onChangeToday = date => {
    setToday(date);
  };

  const onClickDay = date => {
    setNewEventDate(date);
    setShowAddEventForm(true); // 폼 표시
  };

  const addEvent = (date, title) => {
    const newEvent = { date, title };
    setEvents([...events, newEvent]);
  };

  const renderEvents = ({ date, view }) => {
    const dayEvents = events.filter(event => 
      new Date(event.date).toDateString() === date.toDateString()
    );

    return (
      <>
        {dayEvents.map((event, index) => (
          <div key={index}>{event.title}</div>
        ))}
      </>
    );
  };

  const handleAddEvent = () => {
    addEvent(newEventDate, newEventTitle);
    setNewEventTitle('');
    setShowAddEventForm(false); // 폼 숨기기
  };

  const handleCloseModal = () => {
    setShowAddEventForm(false);
  };

  return (
    <div className="calendar-container">
      <Calendar
        locale="ko"
        onChange={onChangeToday}
        onClickDay={onClickDay} // 날짜 클릭 이벤트 추가
        value={today}
        tileContent={renderEvents}
      />
      <Modal show={showAddEventForm} handleClose={handleCloseModal}>
        <div className="add-event-form">
          <input
            type="date"
            value={newEventDate.toISOString().split('T')[0]}
            onChange={(e) => setNewEventDate(new Date(e.target.value))}
          />
          <input
            type="text"
            placeholder="일정 제목"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
          />
          <button onClick={handleAddEvent}>일정 추가</button>
        </div>
      </Modal>
    </div>
  );
};

export default TodoCalendar;





