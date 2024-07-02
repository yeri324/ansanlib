import './Calendar.css';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';




const Calendar = () => {
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;

  const firstWeek = today.clone().startOf('month').week();
  const lastWeek = today.clone().endOf('month').week() === 1 ? 53 : today.clone().endOf('month').week();

  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [district, setDistrict] = useState('');
  const [library, setLibrary] = useState('');
  const [libNum, setLibNum] = useState('');

  useEffect(() => {
    const storedSchedules = loadFromLocalStorage('calendarSchedules');
    setSchedules(storedSchedules);
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  };
  const districts = {
    '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
    '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관',]
  };

  const [schedules, setSchedules] = useState({});

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;

    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7).fill(0).map((data, index) => {
            let days = today.clone().startOf('year').week(week).startOf('week').add(index, 'day');
            let isWeekend = days.day() === 0 || days.day() === 6;

            let tdStyle = {};
            if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
              tdStyle.backgroundColor = 'yellow';
            } else if (days.format('MM') !== today.format('MM')) {
              tdStyle.backgroundColor = 'lightgray';
            }

            if (isWeekend) {
              tdStyle.color = 'red';
            }
            // Assuming holiday is an object with updateTime field
            let holiday = schedules[days.format('YYYYMMDD')];
            return (
              <td key={index} style={tdStyle} onClick={() => handleDateClick(days)}>
                <span>{days.format('D')}</span>
                {schedules[days.format('YYYYMMDD')] && (
                  <div className="schedule">
                    {schedules[days.format('YYYYMMDD')].map((schedule, i) => (
                      <div key={i}>{schedule}</div>
                    ))}
                  </div>
                )}
              </td>
            );
          })}
        </tr>
      );
    }

    return result;
  };

  useEffect(() => {
    const storedSchedules = loadFromLocalStorage('calendarSchedules');
    setSchedules(storedSchedules);
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };


  //
  const handleAddSchedule = async () => {
    if (selectedDate && library) {
      const newSchedule = `\n휴관: ${library} `;
      const dateKey = selectedDate.format('YYYYMMDD');
      axios(
        {
          url: 'api/admin/holiday/new',
          method: 'post',
          data: {
            holiday: selectedDate.format('YYYY-MM-DD'),
            lib_name: library,
            lib_num: libNum,
          },
          baseURL: 'http://localhost:8090',
        }
      ).then((response) => {

        // Update the schedules state with the new schedule
        const updatedSchedules = {
          ...schedules,
          [dateKey]: [...(schedules[dateKey] || []), newSchedule],
        };
        setSchedules(updatedSchedules);

        // Save to local storage
        saveToLocalStorage('calendarSchedules', updatedSchedules);

        setShowModal(false);
        setDistrict('');
        setLibrary('');
        setLibNum('');
      }).catch(error => {
        console.error('Error:', error);
      }
      )
    }
  };
  //---------------



  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDate(null);
    setDistrict('');
    setLibrary('');
    setLibNum('');

  };

  const handleLibraryChange = (selectedLibrary) => {
    const num = getLibraryNum(selectedLibrary);
    setLibrary(selectedLibrary);
    setLibNum(num);
  };

  const getLibraryNum = (selectedLibrary) => {
    // Implement your logic to get the corresponding library number
    // This might involve fetching from a predefined mapping or database
    return selectedLibrary === '감골도서관' ? '7004' :
      selectedLibrary === '반월도서관' ? '7008' :
        selectedLibrary === '상록어린이도서관' ? '7007' :
          selectedLibrary === '부곡도서관' ? '7011' :
            selectedLibrary === '본오도서관' ? '7026' :
              selectedLibrary === '성포도서관' ? '7003' :
                selectedLibrary === '상록수도서관' ? '7006' :
                  selectedLibrary === '수암도서관' ? '7023' :
                    selectedLibrary === '관산도서관' ? '7002' :
                      selectedLibrary === '단원어린이도서관' ? '7005' :
                        selectedLibrary === '미디어도서관' ? '7014' :
                          selectedLibrary === '선부도서관' ? '7028' :
                            selectedLibrary === '원고잔도서관' ? '7018' :
                              '';
  };

  return (
    <div className="Calendar">
      <div className="control">
        <div>
          <Button onClick={() => setMoment(getMoment.clone().subtract(1, 'month'))}>이전달</Button>
          <span>{today.format('YYYY 년 MM 월')}</span>
          <Button onClick={() => setMoment(getMoment.clone().add(1, 'month'))}>다음달</Button>
        </div>
        <Button className="regschedule" onClick={() => window.location.href = '/admin/holiday/list'}>목록보기</Button>
      </div>
      <table>
        <tbody>
          {calendarArr()}
        </tbody>
      </table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>도서관 휴관일 등록 - {selectedDate && selectedDate.format('YYYY-MM-DD')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDistrict">
              <Form.Label>지역 선택</Form.Label>
              <Form.Control as="select" value={district} onChange={(e) => setDistrict(e.target.value)}>
                <option value="">지역 선택</option>
                {Object.keys(districts).map((dist, index) => (
                  <option key={index} value={dist}>{dist}</option>
                ))}
              </Form.Control>
            </Form.Group>
            {district && (
              <Form.Group controlId="formLibrary">
                <Form.Label>도서관 선택</Form.Label>
                <Form.Control as="select" value={library} onChange={(e) => handleLibraryChange(e.target.value)}>
                  <option value="">도서관 선택</option>
                  {districts[district].map((lib, index) => (
                    <option key={index} value={lib}>{lib}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            )}

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
          <Button variant="primary" onClick={handleAddSchedule}>저장</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Calendar;
