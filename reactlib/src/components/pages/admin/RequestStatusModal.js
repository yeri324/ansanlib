import React, { useState, useEffect } from 'react';

const RequestStatusModal = ({ isOpen, onClose, request, onSave }) => {
  const [status, setStatus] = useState(request ? request.status : '');

  useEffect(() => {
    if (request) {
      setStatus(request.status);
    }
  }, [request]);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    const updatedRequest = { ...request, status };
    onSave(updatedRequest);
  };

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>희망도서 신청 상태</h2>
        {request ? (
          <div>
            <p><strong>ISBN:</strong> {request.isbn}</p>
            <p><strong>도서 제목:</strong> {request.title}</p>
            <p><strong>작가:</strong> {request.author}</p>
            <p><strong>출판사:</strong> {request.publisher}</p>
            <p><strong>출판년도:</strong> {request.pub_date}</p>
            <p><strong>신청 권수:</strong> {request.count}</p>
            <p>
              <strong>상태:</strong>
              <select value={status} onChange={handleChange}>
                <option value="대기중">대기중</option>
                <option value="승인">승인</option>
                <option value="거절">거절</option>
              </select>
            </p>
          </div>
        ) : (
          <p>No data available</p>
        )}
        <button onClick={handleSave}>저장</button>
      </div>
    </div>
  );
};

export default RequestStatusModal;
