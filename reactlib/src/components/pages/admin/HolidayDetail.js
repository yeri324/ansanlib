import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const HolidayDetailsModal = ({ show, handleClose, holidays }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>휴관일 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {holidays.length > 0 ? (
          <table striped bordered hover>
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default HolidayDetailsModal;
