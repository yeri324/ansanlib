// HolidayCalendar.js
import React from 'react';
import moment from 'moment';
import '../page/Holiday.css'; // 추가


const HolidayCalendar = ({ schedules, setSelectedHolidays, setShowDetail, getMoment, setMoment }) => {
  const today = getMoment || moment(); // getMoment가 undefined일 경우를 처리
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const handleDateClick = (date) => {
    const holidays = (schedules || []).filter(schedule => moment(schedule.holiday).isSame(date, 'day'));
    setSelectedHolidays(holidays);
    setShowDetail(true);
  };

  const renderCalendar = () => {
    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week} className='admin-calender-td-tr'>
          {Array(7).fill(0).map((n, i) => {
            let current = today.clone().startOf('week').week(week).add(i, 'day');
            let isSelectedMonth = current.format('MM') === today.format('MM');
            let isToday = current.isSame(new Date(), 'day');
            let isWeekend = current.day() === 0 || current.day() === 6;
            let holidays = (schedules || []).filter(schedule => moment(schedule.holiday).isSame(current, 'day'));
            let displayHolidays = holidays.slice(0, 3);
            let moreHolidays = holidays.length > 3 ? holidays.length - 3 : 0;

            return (
              <td
                key={i}
                className={`day ${isSelectedMonth ? '' : 'not-current'} ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`}
                onClick={() => handleDateClick(current)}
              >
                <span>{current.format('D')}</span>
                <div className="holidays">
                  {displayHolidays.map((holiday, index) => (
                    <div key={index} className="holiday">휴관: {holiday.lib_name}</div>
                  ))}
                  {moreHolidays > 0 && (
                    <div className="more" onClick={() => handleDateClick(current)}>
                      + more
                    </div>
                  )}
                </div>
              </td>
            );
          })}
        </tr>
      );
    }

    return result;
  };

  return (
    <div className="admin-holiday-table">
      <table className='admin-calendar-table'>
        <thead>
          <tr className="admin-calendar-th-tr">
            <th style={{ width: "14%" }}>일</th>
            <th style={{ width: "14%" }}>월</th>
            <th style={{ width: "14%" }}>화</th>
            <th style={{ width: "14%" }}>수</th>
            <th style={{ width: "14%" }}>목</th>
            <th style={{ width: "14%" }}>금</th>
            <th style={{ width: "14%" }}>토</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
    </div>
  );
};

export default HolidayCalendar;
