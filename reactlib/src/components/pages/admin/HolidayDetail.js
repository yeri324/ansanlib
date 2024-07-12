import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Modal.css";

const HolidayDetail = ({ show, handleClose, holidays }) => {
  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} id="admin-modal" tabIndex="-1" aria-labelledby="admin-modal-title" aria-hidden="true">
      <div className="modal-dialog" id="admin-modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="admin-modal-title">
              도서관 휴관정보
            </h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            {holidays.length > 0 ? (
              <table className='table table-striped detailTable'>
                <thead>
                  <tr>
                    <th>번호</th>
                    <th style={{ width: "30%" }}>도서관</th>
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
        </div>
      </div>
    </div>
  );
};

export default HolidayDetail;
