import React, { useEffect, useState } from 'react';

import AdminBookRequestDetail from '../modal/AdminBookRequestDetail';
import AdminHeader from '../common/AdminHeader';
import AdminSide from '../common/AdminSide';
import "./AdminPage.css";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import DatePicker from "react-datepicker";
import axios from 'axios';


import "react-datepicker/dist/react-datepicker.css"; // Include DatePicker CSS
import AdminPagination from '../common/AdminPagination';

const AdminBookRequest = () => {


  const [requests, setRequests] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchResult, setSearchResult] = useState([]);
  const [originalResult, setOriginalResult] = useState([]); // 원본 데이터 저장
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchMonth, setSearchMonth] = useState(null); // 검색할 날짜 상태 추가
  const [searchCriteria, setSearchCriteria] = useState('title'); // 검색 기준 상태 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/admin/book/request');
      if (Array.isArray(response.data.result)) {
        setRequests(response.data.result);
        setOriginalResult(response.data.result); // 원본 데이터 저장
        groupData(response.data.result);
      } else {
        setError('Data format is not an array');
      }
    } catch (error) {
      setError('Error fetching book requests');
    }
  };

  const groupData = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const pubYear = new Date(curr.pub_date).getFullYear().toString();
      const key = `${curr.isbn}`;
      
      if (!acc[key]) {
        acc[key] = { ...curr, count: 0, pub_year: pubYear, libraries: {} };
      }
  
      if (acc[key].libraries[curr.lib_name]) {
        acc[key].libraries[curr.lib_name] += 1;
      } else {
        acc[key].libraries[curr.lib_name] = 1;
      }
  
      acc[key].count += 1;
      return acc;
    }, {});
  
    const groupedArray = Object.values(grouped).map(item => ({
      ...item,
      libraries: Object.entries(item.libraries).map(([lib_name, count]) => ({ lib_name, count }))
    }));
  
    setGroupedRequests(groupedArray);
    setSearchResult(groupedArray.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  };

  useEffect(() => {
    setSearchResult(groupedRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  }, [groupedRequests, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(groupedRequests.length / itemsPerPage);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    sortData(key, direction);
  };

  const sortData = (key, direction) => {
    const sortedData = [...groupedRequests].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSearchResult(sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    const searchYearStr = searchMonth ? moment(searchMonth).format('YYYY') : '';
    let filteredResults = [];

    if (searchCriteria === 'title') {
      filteredResults = originalResult.filter(request => request.title.includes(searchTerm));
    } else if (searchCriteria === 'author') {
      filteredResults = originalResult.filter(request => request.author.includes(searchTerm));
    } else if (searchCriteria === 'date') {
      filteredResults = originalResult.filter(request => searchYearStr && moment(request.pub_date).format('YYYY') === searchYearStr);
    }

    groupData(filteredResults); // Group the filtered results
    setCurrentPage(1); // 검색 결과가 변경되면 첫 페이지로 이동
  };

  const handleSave = (updatedRequest) => {
    const updatedRequests = requests.map((request) =>
      request.isbn === updatedRequest.isbn ? updatedRequest : request
    );
    setRequests(updatedRequests);
    setOriginalResult(updatedRequests); // 원본 데이터 업데이트
    groupData(updatedRequests);
    setIsModalOpen(false);
  };

  if (error) {
    return <div>{error}</div>;
  }
  const handleRefresh = () => {
    fetchRequests();
  };

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
              <h1>희망도서신청</h1>
            </div>

            <div className="admin-page-search">
              <select value={searchCriteria} onChange={(e) => setSearchCriteria(e.target.value)}>
                <option value="title">도서명</option>
                <option value="author">작가</option>
                <option value="date">출판년도</option>
              </select>

              {searchCriteria !== 'date' && (
                <input
                  type="text"
                  placeholder={`${searchCriteria === 'title' ? '도서 제목을 입력하세요' : '작가명을 입력하세요'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              )}
              {searchCriteria === 'date' && (
                <DatePicker
                  selected={searchMonth}
                  onChange={(date) => setSearchMonth(date)}
                  dateFormat="yyyy"
                  showYearPicker
                  placeholderText="출판년도를 선택하세요"
                  onKeyDown={handleKeyDown}
                />
              )}
              <button type="button" className="btn btn-outline-dark" onClick={handleSearch}>검색</button>
              <button type="button" id="adminbtn" class="btn btn-outline-dark" onClick={handleRefresh}>새로고침</button>
            </div>

            <table className="admin-table">
              <thead>
                <tr className='admin-th-tr'>
                  <th>No</th>
                  <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
                  <th className='sortable' onClick={() => handleSort('title')}>도서 제목</th>
                  <th className='sortable' onClick={() => handleSort('author')}>작가</th>
                  <th className='sortable' onClick={() => handleSort('publisher')}>출판사</th>
                  <th className='sortable' onClick={() => handleSort('pub_year')}>출판년도</th>
                  <th className='sortable' onClick={() => handleSort('count')}>신청 권수</th>
                </tr>
              </thead>
              <tbody>
                {searchResult.map((request, index) => (
                  <tr key={index} onClick={() => handleOpenModal(request)} className='admin-td-tr'>
                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td>{request.isbn}</td>
                    <td>{request.title}</td>
                    <td>{request.author}</td>
                    <td>{request.publisher}</td>
                    <td>{request.pub_year}</td>
                    <td>{request.count}</td>
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

            {isModalOpen && (
              <AdminBookRequestDetail
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                request={selectedRequest}
                onSave={handleSave}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
};
export default AdminBookRequest;