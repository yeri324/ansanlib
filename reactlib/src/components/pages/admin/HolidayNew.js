import React, { useState } from 'react';
import moment from 'moment';
import { getLibraryNum } from '../../../utils/libraryUtils';
import "./Modal.css";

const HolidayNew = ({ showModal, handleCloseModal, selectedDate, setSelectedDate, districts }) => {
  const [district, setDistrict] = useState('');
  const [library, setLibrary] = useState('');
  const [libNum, setLibNum] = useState('');

  const checkDuplicate = async (date, library) => {
    try {
      console.log(`Checking duplicate for date: ${date}, library: ${library}`);
      const response = await fetch(`http://localhost:8090/api/admin/holiday/check?date=${date}&library=${library}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking duplicate:', error);
      return false;
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (selectedDate && library && libNum) {
      const formattedDate = selectedDate.format('YYYY-MM-DD');
      const isDuplicate = await checkDuplicate(formattedDate, library);
      if (isDuplicate) {
        alert('이미 등록된 날짜와 도서관입니다.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8090/api/admin/holiday/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            holiday: formattedDate,
            lib_name: library,
            lib_num: libNum,
          }),
        });

        if (response.ok) {
          alert('저장이 완료되었습니다!');
          handleCloseModal();
        } else {
          const errorData = await response.json();
          console.error('Error:', errorData);
          alert('저장에 실패했습니다. 서버 로그를 확인하세요.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('저장 중 에러가 발생했습니다.');
      }
    } else {
      alert('날짜와 도서관을 선택해주세요.');
    }
  };

  const handleLibraryChange = (selectedLibrary) => {
    const num = getLibraryNum(selectedLibrary);
    setLibrary(selectedLibrary);
    setLibNum(num);
    console.log('Library Changed:', selectedLibrary, 'Lib_num:', num);
  };

  if (!districts) {
    return null;
  }

  return (
    <div className="modal" style={{ display: showModal ? 'block' : 'none' }}>
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <h3>도서관 휴관일 등록 - {selectedDate && selectedDate.format('YYYY-MM-DD')}</h3>
      <form onSubmit={handleAddSchedule} className='holidaynew'>
        <div className="form-group">
          <label>지역 선택</label>
          <select value={district} onChange={(e) => setDistrict(e.target.value)}>
            <option value="">지역 선택</option>
            {Object.keys(districts).map((dist, index) => (
              <option key={index} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        {district && (
          <div className="form-group">
            <label>도서관 선택</label>
            <select value={library} onChange={(e) => handleLibraryChange(e.target.value)}>
              <option value="">도서관 선택</option>
              {districts[district].map((lib, index) => (
                <option key={index} value={lib}>{lib}</option>
              ))}
            </select>
          </div>
        )}
        <div className="form-group">
          <label>날짜 선택</label>
          <input type="date" onChange={(e) => setSelectedDate(moment(e.target.value))} />
        </div>
        <button  class="btn btn-outline-dark" onClick={handleCloseModal}>취소</button>
        <button  class="btn btn-outline-dark" type="submit">저장</button>
      </form>
    </div>
  </div>
);
};

export default HolidayNew;
