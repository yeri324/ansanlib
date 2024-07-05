import React, { useState, useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HolidayNew from './HolidayNew';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const HolidayList = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [originalResult, setOriginalResult] = useState([]); // 원본 데이터 저장
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMonth, setSearchMonth] = useState(null); // 검색할 날짜 상태 추가
  const [searchCriteria, setSearchCriteria] = useState('library'); // 검색 기준 상태 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('/api/admin/holiday/list');
      if (Array.isArray(response.data.result)) {
        setSearchResult(response.data.result);
        setOriginalResult(response.data.result); // 원본 데이터 저장
      } else {
        console.error('Fetched data is not an array:', response.data.result);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const districts = {
    '상록구': ['감골도서관', '반월도서관', '부곡도서관', '본오도서관', '상록수도서관', '상록어린이도서관', '성포도서관', '수암도서관'],
    '단원구': ['관산도서관', '단원어린이도서관', '미디어도서관', '선부도서관', '원고잔도서관',]
  };

  const handleSearch = async () => {
    await fetchHolidays(); // 새로 고침 (목록 새로 고침)
    const searchMonthStr = searchMonth ? moment(searchMonth).format('YYYY-MM') : '';
    let filteredResults = [];

    if (searchCriteria === 'library') {
      filteredResults = originalResult.filter(holiday => holiday.lib_name.includes(searchTerm));
    } else if (searchCriteria === 'date') {
      filteredResults = originalResult.filter(holiday => searchMonthStr && moment(holiday.holiday).format('YYYY-MM') === searchMonthStr);
    }

    setSearchResult(filteredResults);
  };

  // 엔터키 누르면
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/holiday/${id}`);
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

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...searchResult].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSearchResult(sortedData);
  };

  return (
    <div className="holidayList">
      <h2>휴관일 목록</h2>
      <div className="search-container">
        <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
          <option value="library">도서관 이름</option>
          <option value="date">날짜 (월)</option>
        </select>

        {searchCriteria === 'library' && (
          <input 
            type="text" 
            placeholder="도서관 이름을 입력하세요" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            onKeyDown={handleKeyDown} 
          />
        )}

        {searchCriteria === 'date' && (
          <DatePicker
            selected={searchMonth}
            onChange={(date) => setSearchMonth(date)}
            dateFormat="yyyy-MM"
            showMonthYearPicker
            placeholderText="날짜를 선택하세요"
            onKeyDown={handleKeyDown}
          />
        )}

        <Button variant="primary" onClick={handleSearch}>검색</Button>
      </div>
      <div className="buttons">
        <Button variant="primary" onClick={() => navigate('/admin/holiday')}>돌아가기</Button>
        <Button variant="primary" onClick={handleAddHoliday}>등록하기</Button>
        <Button variant="success" onClick={handleRefresh}>새로고침</Button> {/* Added refresh button */}
      </div>
      <table>
        <thead>
          <tr>
            <th className="sortable"  onClick={() => handleSort('LibNum')}>도서관 번호</th>
            <th className="sortable" onClick={() => handleSort('lib_name')}>도서관 이름</th>
            <th className="sortable"onClick={() => handleSort('holiday')}>휴관일</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(searchResult) && searchResult.map((holiday) => (
            <tr key={holiday.id}>
              <td>{holiday.library ? holiday.library.libNum:''}</td>
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
          handleCloseModal={() => {
            setShowModal(false);
            fetchHolidays(); // 새로고침
          }}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          districts={districts}
        />
      )}
    </div>
  );
};

export default HolidayList;
