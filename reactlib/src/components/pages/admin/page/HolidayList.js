import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import HolidayNew from '../modal/HolidayNew';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import AdminHeader from "../common/AdminHeader";
import AdminSide from "../common/AdminSide";
import AdminPagination from '../common/AdminPagination';
import "./AdminPage.css";
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';



const HolidayList = () => {
  const { axios } = useAuth();
  const [searchResult, setSearchResult] = useState([]);
  const [originalResult, setOriginalResult] = useState([]); // 원본 데이터 저장
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMonth, setSearchMonth] = useState(null); // 검색할 날짜 상태 추가
  const [searchCriteria, setSearchCriteria] = useState('library'); // 검색 기준 상태 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

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
    else {
      filteredResults = originalResult.filter(holiday => holiday.libNum.includes(searchTerm));

    }

    setSearchResult(filteredResults);
    setCurrentPage(1); // 검색 결과가 변경되면 첫 페이지로 이동
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
      alert("삭제가 완료되었습니다.");
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
      // Adjust if 'libNum' is nested, for example, if it's accessed via a.library.libNum
      const valA = key === 'libNum' && a.library ? a.library.libNum : a[key];
      const valB = key === 'libNum' && b.library ? b.library.libNum : b[key];
      if (valA < valB) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (valA > valB) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    setSearchResult(sortedData);
  };


  // 페이지네이션 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <>

    <div className="admin-page">


    <div className="admin-base">
      <AdminHeader />
      <AdminSide />
    </div>
    <main className="admin-page-main">
      <div className="admin-page-body">
        <div className="admin-page-title">
            <h1>휴관일 목록</h1>
          </div>
<div className="admin-page-top">
<div style={{width: "25%"}}></div>
          <div className="admin-page-search" style={{width: "50%"}}>
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

            <button type="button" id="adminbtn" class="btn btn-outline-dark"  onClick={handleSearch}>검색</button>
            <button type="button" id="adminbtn" class="btn btn-outline-dark" onClick={handleRefresh}>새로고침</button>
         
           

         
          </div>

          <div className="admin-page-button" style={{width: "25%"}}>
            <button type="button" id="adminbtn" class="btn btn-outline-dark"  onClick={() => navigate('/admin/holiday')}>돌아가기</button>
            <button type="button" id="adminbtn" class="btn btn-outline-dark"  onClick={handleAddHoliday}>등록하기</button>
          </div>
          </div>
          


          <table className="admin-table">
              <thead>
                <tr className="admin-th-tr">

                             <th>No</th>
                <th className="sortable" onClick={() => handleSort('lib_name')} style={{ width: '20%' }}>도서관 이름</th>
                <th className="sortable" onClick={() => handleSort('libNum')} style={{ width: '30%' }}>도서관 번호</th>
                <th className="sortable" onClick={() => handleSort('holiday')}>휴관일</th>
                <th>삭제</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(currentItems) && currentItems.map((holiday) => (
                <tr key={holiday.id} className="admin-td-tr" style={{cursor:"default"}} >
                  <td>{holiday.id}</td>
                  <td>{holiday.lib_name}</td>
                  <td>{holiday.library ? holiday.library.libNum : ''}</td>
                  <td>{holiday.holiday}</td>
                  <td>
                    <button type="button" class="btn btn-outline-dark" onClick={() => handleDelete(holiday.id)}>삭제</button>
                  </td>
                </tr>
              ))}
              </tbody>
            </table>

        
          <div className="admin-pagination">
              <AdminPagination
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
              />
 
         

</div>
{showModal && (
    <HolidayNew
      showModal={showModal}
      handleCloseModal={() => {
        setShowModal(false);
        fetchHolidays();
      }}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      districts={districts}
    />
  )}


        </div>
      </main>
    </div>
    </>
  );
};
export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <HolidayList  />
      </Auth>
    </>
  );
}