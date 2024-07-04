import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HolidayNew from './HolidayNew';

const HolidayList = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get("http://localhost:8090/api/admin/holiday/list");
      setSearchResult(response.data);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const districts = {
    '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
    '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관',]
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8090/api/admin/holiday/${id}`);
      console.log("Delete response:", response.data);
      // After deletion, fetch holidays again to update the list
      fetchHolidays();
    } catch (error) {
      console.error("Error deleting holiday:", error);
    }
  };

  const handleAddHoliday = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRefresh = () => {
    fetchHolidays();
  };

  return (
    <div className="holidayList">
      <h2>휴관일 목록</h2>
      <Button variant="primary" onClick={() => window.location.href = '/admin/holiday'}>돌아가기</Button>
      <Button variant="primary" onClick={handleAddHoliday}>등록하기</Button>
      <Button variant="success" onClick={handleRefresh}>새로고침</Button> {/* Added refresh button */}
      <table>
        <thead>
          <tr>
            <th className="lib_num">도서관 번호</th>
            <th className="lib_name">도서관 이름</th>
            <th>휴관일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.library?.lib_num}</td>
              <td>{holiday.lib_name}</td>
              <td>{holiday.holiday}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(holiday.id)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for adding new holiday */}
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

export default HolidayList;
