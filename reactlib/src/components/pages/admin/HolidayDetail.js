import React from 'react';

import "./Modal.css";

const HolidayDetail = ({ show, handleClose, holidays }) => {
  return (
    <div className="modal" style={{ display: show ? 'block' : 'none' }}>
    <div className="modal-content">
      <div className="modal-header">
        <span className="close-button" onClick={handleClose}>&times;</span>
        <h2>휴관일 정보</h2>
      </div>
      <div className="modal-body">
        {holidays.length > 0 ? (
          <table className='detailTable'>
            <thead>
              <tr>
                <th>번호</th>
                <th>도서관</th>
                <th>날짜</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{holiday.lib_name}</td>
                  <td>{holiday.holiday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>해당 날짜에 등록된 휴관일이 없습니다.</p>
        )}
      </div>
      <div className="modal-footer">
        <button onClick={handleClose}>닫기</button>
      </div>
    </div>
  </div>
  );
};

export default HolidayDetail;
