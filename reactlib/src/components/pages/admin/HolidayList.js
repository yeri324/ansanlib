import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import axios from "axios";

const HolidayList = () => {
  const [searchResult, setSearchResult] = useState([]);

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

  return (
    <div className="holidayList">
      <h2>휴관일 목록</h2>
      <Button variant="primary" onClick={() => window.location.href = '/admin/calendar'}>돌아가기</Button>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th className="lib_num">도서관 번호</th>
            <th className="lib_name">도서관 이름</th>
            <th>휴관일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.map((holiday) => (
            <tr key={holiday.id}>
             <td>{holiday.library?.lib_num}</td> {/* Optional chaining으로 안전하게 처리 */}
              <td>{holiday.lib_name}</td>
              <td>{holiday.holiday}</td>
              <td>{holiday.library?.lib_name}</td> 
              <td>
                <Button variant="danger" onClick={() => handleDelete(holiday.id)}>삭제</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
  );
};

export default HolidayList;
