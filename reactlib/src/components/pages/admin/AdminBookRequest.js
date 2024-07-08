import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminBookRequest.css';
import RequestStatusModal from './RequestStatusModal';

const AdminBookRequest = () => {
  const [requests, setRequests] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchResult, setSearchResult] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    setSearchResult(groupedRequests);
  }, [groupedRequests]);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('/api/admin/book/request');
      console.log('API response:', response); // Log the entire response object
      const data = response.data.result; // Adjust this line based on the actual response structure

      // Check if data is an array before setting state
      if (Array.isArray(data)) {
        setRequests(data);
        groupData(data);
      } else {
        setError('Data format is not an array');
        console.error('Data format is not an array:', data);
      }
    } catch (error) {
      setError('Error fetching book requests');
      console.error('Error fetching book requests:', error);
    }
  };

  const groupData = (data) => {
    const grouped = data.reduce((acc, curr) => {
      const key = `${curr.isbn}-${curr.title}-${curr.author}-${curr.publisher}-${curr.pub_date}-${curr.regist_date}`;
      if (!acc[key]) {
        acc[key] = { ...curr, count: 0, status: curr.status || '대기중' };
      }
      acc[key].count += 1;
      return acc;
    }, {});

    const groupedArray = Object.values(grouped);
    setGroupedRequests(groupedArray);
  };

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
  const handleSave = (updatedRequest) => {
    const updatedRequests = requests.map((request) =>
      request.isbn === updatedRequest.isbn ? updatedRequest : request
    );
    setRequests(updatedRequests);
    groupData(updatedRequests);
    setIsModalOpen(false);
  };
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>희망도서신청 현황</h1>
      <table>
        <thead>
          <tr className='tableheader'>
            <th>No</th>
            <th onClick={() => handleSort('isbn')} className='sortable'>ISBN</th>
            <th onClick={() => handleSort('title')} className='sortable'>도서 제목</th>
            <th onClick={() => handleSort('author')} className='sortable'>작가</th>
            <th onClick={() => handleSort('publisher')} className='sortable'>출판사</th>
            <th onClick={() => handleSort('pub_date')} className='sortable'>출판년도</th>
            <th onClick={() => handleSort('count')} className='sortable'>신청 권수</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          {searchResult.length > 0 ? (
            searchResult.map((request, index) => (
              <tr className='list' key={index} onClick={() => handleOpenModal(request)}>
                <td>{index + 1}</td>
                <td>{request.isbn}</td>
                <td>{request.title}</td>
                <td>{request.author}</td>
                <td>{request.publisher}</td>
                <td>{request.pub_date}</td>
                <td>{request.count}</td>
                <td>{request.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No book requests found</td>
            </tr>
          )}
        </tbody>
      </table>
      <RequestStatusModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        request={selectedRequest}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminBookRequest;
