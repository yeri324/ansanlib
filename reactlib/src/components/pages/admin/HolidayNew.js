import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';
import { getLibraryNum } from '../../../utils/libraryUtils';

const HolidayNew = (props) => {
  const { showModal, handleCloseModal, selectedDate, setSelectedDate, districts } = props;
  const [district, setDistrict] = useState('');
  const [library, setLibrary] = useState('');
  const [libNum, setLibNum] = useState('');

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    if (selectedDate && library) {
      try {
        const response = await fetch('http://localhost:8090/api/admin/holiday/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            holiday: selectedDate.format('YYYY-MM-DD'),
            lib_name: library,
            lib_num: libNum
          }),
        });

        if (response.ok) {
          alert('저장이 완료되었습니다!');
          handleCloseModal(); // Close the modal after saving
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
    return null; // Handle the case where districts is not yet available
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>도서관 휴관일 등록 - {selectedDate && selectedDate.format('YYYY-MM-DD')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddSchedule}>
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
          <Form.Group controlId="formDate">
            <Form.Label>날짜 선택</Form.Label>
            <Form.Control type="date" onChange={(e) => setSelectedDate(moment(e.target.value))} />
          </Form.Group>
          <Button variant="secondary" onClick={handleCloseModal}>취소</Button>
          <Button variant="primary" type="submit">저장</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default HolidayNew;
