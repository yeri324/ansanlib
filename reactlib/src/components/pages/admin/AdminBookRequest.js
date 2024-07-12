import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminBookRequestDetail from './AdminBookRequestDetail';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';
import "./AdminPage.css";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import DatePicker from "react-datepicker";
import { GlobalStyles } from './GlobalStyles';


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
  const [searchCriteria, setSearchCriteria] = useState('library'); // 검색 기준 상태 추가
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await axios.get('/api/admin/book/request');
      if (Array.isArray(response.data.result)) {
        setSearchResult(response.data.result);
        setOriginalResult(response.data.result); // 원본 데이터 저장
      } else {
        console.error(response.data.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/admin/book/request');
      if (Array.isArray(response.data.result)) {
        setRequests(response.data.result);
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
      const key = `${curr.isbn}-${curr.title}-${curr.author}-${curr.publisher}-${pubYear}`;
      acc[key] = acc[key] || { ...curr, count: 0, pub_year: pubYear };
      acc[key].count += 1;

      return acc;
    }, {});
    setGroupedRequests(Object.values(grouped));
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
    setSearchResult(sortedData);
  };
  // 엔터키 누르면
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
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

    setSearchResult(filteredResults);
    setCurrentPage(1); // 검색 결과가 변경되면 첫 페이지로 이동
  };

  const handleSave = (updatedRequest) => {
    const updatedRequests = requests.map((request) =>
      request.isbn === updatedRequest.isbn ? updatedRequest : request
    );
    setRequests(updatedRequests);
    groupData(updatedRequests);
    setIsModalOpen(false);
  };

  const changePage = (number) => {
    setCurrentPage(number);
    setSearchResult(requests.slice((number - 1) * itemsPerPage, number * itemsPerPage));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <GlobalStyles width="100vw" />
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
              <option value="author">저자</option>
              <option value="date">출판년도</option>
            </select>

            {searchCriteria === 'title' && (
              <input
                type="text"
                placeholder="도서 제목을 입력하세요"
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
                showMonthYearPicker
                placeholderText="날짜를 선택하세요"
                onKeyDown={handleKeyDown}
              />
            )}

            <button type="button" className="btn btn-outline-dark" onClick={handleSearch}>검색</button>
          </div>



          <table className="admin-table">
            <thead>
              <tr className='admin-th-tr'>
                <th>No</th>
                <th className='sortable' onClick={() => handleSort('isbn')}>ISBN</th>
                <th className='sortable' onClick={() => handleSort('title')}>도서 제목</th>
                <th className='sortable' onClick={() => handleSort('author')}>저자</th>
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
            <div className="admin-pagination" >
              <nav aria-label="Page navigation example">
                <ul className="pagination" id="admin-pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button type="button" className="btn btn-outline-dark page-link" onClick={() => paginate(currentPage - 1)} aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                      <button type="button" className="btn btn-outline-dark page-link" style={{ backgroundColor: "#092a4bec" }}  onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </button>
                    </li>
                  ))}
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button type="button" className="btn btn-outline-dark page-link" onClick={() => paginate(currentPage + 1)} aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
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

        </div>

      </main>
    </div>

    </>
  );
};

export default AdminBookRequest;