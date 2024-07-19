import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPagination from '../common/AdminPagination';
import HolidayListTable from '../item/HolidayListTable'; // 컴포넌트 임포트
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import AdminHeader from "../common/AdminHeader";
import AdminSide from "../common/AdminSide";
import "./AdminPage.css";
import useAuth, { LOGIN_STATUS, ROLES } from '../../../hooks/useAuth';
import Auth from '../../../helpers/Auth';
import RedirectLogin from '../../../helpers/RedirectLogin';

const HolidayList = () => {
  const { axios } = useAuth();
  const [holidays, setHolidays] = useState([]);
  const [HolidayNew, setHolidayNew]=useState([]);
  const [ districts,setDistricts]=useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [originalResult, setOriginalResult] = useState([]); // 원본 데이터 저장
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMonth, setSearchMonth] = useState(null); // 검색할 날짜 상태 추가
  const [searchCriteria, setSearchCriteria] = useState('library'); // 검색 기준 상태 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  useEffect(() => {
    fetchHolidays();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('/api/admin/holiday/list');
      if (Array.isArray(response.data.result)) {
        setHolidays(response.data.result);
        setOriginalResult(response.data.result); // 원본 데이터 저장
        setSearchResult(response.data.result); // 전체 항목 표시
      } else {
        console.error('Fetched data is not an array:', response.data.result);
      }
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
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

    setSearchResult(filteredResults); // 전체 항목 표시
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResult.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(searchResult.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
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
            <div style={{ width: "25%" }}></div>
            <div className="admin-page-search" style={{ width: "50%" }}>
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

              <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={handleSearch}>검색</button>
              <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={handleRefresh}>새로고침</button>
            </div>

            <div className="admin-page-button" style={{ width: "25%" }}>
              <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={() => navigate('/admin/holiday')}>돌아가기</button>
              <button type="button" id="adminbtn" className="btn btn-outline-dark" onClick={handleAddHoliday}>등록하기</button>
            </div>
          </div>

          <HolidayListTable
            holidays={currentItems}
            handleSort={handleSort}
            handleDelete={handleDelete}
            excludedColumns={['delete']}
          />

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
  );
};

export default function () {
  return (
    <>
      <RedirectLogin />
      <Auth loginStatus={LOGIN_STATUS.LOGGED_IN} roles={ROLES.ADMIN}>
        <HolidayList />
      </Auth>
    </>
  );
}
