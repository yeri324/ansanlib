import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBookRequest.css';
import AdminBookRequestDetail from './AdminBookRequestDetail';
import AdminHeader from './AdminHeader';
import AdminSide from './AdminSide';

const AdminBookRequest = () => {
  const [requests, setRequests] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchResult, setSearchResult] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchRequests();
  }, []);

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
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
    <AdminHeader />
    <AdminSide />
    <div className="main-container">
      <div className="content">
        <h1>희망도서신청 현황</h1>
        <table>
          <thead>
            <tr className='tableheader'>
              <th >No</th>
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
              <tr key={index} onClick={() => handleOpenModal(request)}>
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
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => changePage(currentPage - 1)}>&laquo;</button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i + 1} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
                <button className="page-link" onClick={() => changePage(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => changePage(currentPage + 1)}>&raquo;</button>
            </li>
          </ul>
        </nav>
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
    </>
  );
};

export default AdminBookRequest;
