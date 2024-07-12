import React, { useState } from 'react';
import moment from 'moment';
import { getLibraryNum } from '../../../utils/libraryUtils';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Modal.css";

const HolidayNew = ({ showModal, handleCloseModal, selectedDate, setSelectedDate, districts }) => {
  const [district, setDistrict] = useState('');
  const [library, setLibrary] = useState('');
  const [libNum, setLibNum] = useState('');

  const checkDuplicate = async (date, library) => {
    try {
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
  };

  if (!districts) {
    return null;
  }

  return (
    <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="admin-modal" tabIndex="-1" aria-labelledby="admin-modal-title" aria-hidden="true">
      <div className="modal-dialog" id="admin-modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="admin-modal-title">
              도서관 휴관일 등록 - {selectedDate && selectedDate.format('YYYY-MM-DD')}
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleAddSchedule} className='holidaynew'>
              <div className="form-group" id="admin-form-group">
                <label>지역 선택</label>
                <select value={district} className="form-control" onChange={(e) => setDistrict(e.target.value)}>
                  <option value="">지역 선택</option>
                  {Object.keys(districts).map((dist, index) => (
                    <option key={index} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>
              {district && (
                <div className="form-group" id="admin-form-group">
                  <label>도서관 선택</label>
                  <select value={library} className="form-control" onChange={(e) => handleLibraryChange(e.target.value)}>
                    <option value="">도서관 선택</option>
                    {districts[district].map((lib, index) => (
                      <option key={index} value={lib}>{lib}</option>
                    ))}
                  </select>
                </div>
              )}
              <div className="form-group" id="admin-form-group">
                <label>날짜 선택</label>
                <input type="date" className="form-control" value={selectedDate ? selectedDate.format('YYYY-MM-DD') : ''} onChange={(e) => setSelectedDate(moment(e.target.value))} />
              </div>
              <div className="modal-footer" id="admin-modal-footer">
                <button type="button" id="admin-modal-btn" class="btn btn-outline-dark" onClick={handleCloseModal}>취소</button>
                <button type="submit"  id="admin-modal-btn" class="btn btn-outline-dark">저장</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolidayNew;
