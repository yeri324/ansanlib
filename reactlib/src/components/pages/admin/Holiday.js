import './Holiday.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HolidayNew from './HolidayNew';

const Holiday = () => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const districts = {
    '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
    '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관',]
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/admin/holiday/list');
        setSchedules(response.data);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };
    fetchHolidays();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const renderCalendar = () => {
    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7).fill(0).map((n, i) => {
            let current = today.clone().startOf('week').week(week).add(i, 'day');
            let isSelectedMonth = current.format('MM') === today.format('MM');
            let isToday = current.isSame(new Date(), 'day');
            let isWeekend = current.day() === 0 || current.day() === 6;
            let holiday = schedules.find(schedule => moment(schedule.holiday).isSame(current, 'day'));

            return (
              <td
                key={i}
                className={`day ${isSelectedMonth ? '' : 'not-current'} ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}`}
                onClick={() => handleDateClick(current)}
              >
                <span>{current.format('D')}</span>
                {holiday && <div className="holiday">{holiday.library?.name}</div>}
              </td>
            );
          })}
        </tr>
      );
    }

    return result;
  };

  return (
    <div className="Calendar">
      <div className="control">
        <div className="date-navigation">
          <Button onClick={() => setMoment(getMoment.clone().subtract(1, 'month'))}>이전달</Button>
          <span>{today.format('YYYY 년 MM 월')}</span>
          <Button onClick={() => setMoment(getMoment.clone().add(1, 'month'))}>다음달</Button>
        </div>
        <div className="button-group">
          <Button className="regschedule" onClick={() => navigate('/admin/holiday/list')}>목록보기</Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>등록하기</Button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </tr>
        </thead>
        <tbody>
          {renderCalendar()}
        </tbody>
      </table>
      {showModal && (
        <HolidayNew
          showModal={showModal}
          handleCloseModal={() => setShowModal(false)}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          districts={districts}
        />
      )}
    </div>
  );
};

export default Holiday;
