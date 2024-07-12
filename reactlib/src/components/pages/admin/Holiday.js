import './Holiday.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HolidayNew from './HolidayNew';
import HolidayDetail from './HolidayDetail';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import { GlobalStyles } from './GlobalStyles';


const Holiday = () => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();
  const [schedules, setSchedules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedHolidays, setSelectedHolidays] = useState([]);
  const [showAll, setShowAll] = useState(false); // 전체 보기 상태
  const navigate = useNavigate();
  const districts = {
    '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
    '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관',]
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = () => {
    axios({
      url: '/api/admin/holiday/list',
      method: 'get',
    }).then((res) => {
      if (Array.isArray(res.data.result)) {
        setSchedules(res.data.result);
      } else {
        console.error('Fetched data is not an array:', res.data.result);
      }
    }).catch((err) => {
      console.error("Error fetching holidays:", err);
    });
  };

  const handleDateClick = (date) => {
    const holidays = schedules.filter(schedule => moment(schedule.holiday).isSame(date, 'day'));
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
            let holidays = schedules.filter(schedule => moment(schedule.holiday).isSame(current, 'day'));
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
    <>
           <GlobalStyles width="100vw" />
    <div className="admin-page">

      <div className="admin-base">
        <AdminHeader />
        <AdminSide />
      </div>

      <main className="admin-holiday-main">
        <div className="admin-holiday-body">
          <div className="admin-holiday-title">
            <h1> 도서관 일정 </h1>
          </div>


          <div className="admin-holiday-header">
            <div></div>
              <div className="admin-holiday-month">
                <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={() => setMoment(getMoment.clone().subtract(1, 'month'))}>이전달</button>
                <h4><span> {today.format('YYYY 년 MM 월')}</span> </h4>
                <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={() => setMoment(getMoment.clone().add(1, 'month'))}>다음달</button>
              </div>
              <div className="admin-holiday-btn">
                <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={() => navigate('/admin/holiday/list')}>목록보기</button>
                <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={() => setShowModal(true)}>등록하기</button>
              </div>
            </div>


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


          {showModal && (
            <HolidayNew
              showModal={showModal}
              handleCloseModal={() => {
                setShowModal(false);
                fetchHolidays(); // 새로고침
              }}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              districts={districts}
            />
          )}

          <HolidayDetail
            show={showDetail}
            handleClose={() => setShowDetail(false)}
            holidays={selectedHolidays}
          />





        </div>
      </main>
    </div>
    </>
  );
};

export default Holiday;
