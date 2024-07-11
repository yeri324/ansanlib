import React, { useState, useEffect } from 'react';
import './Modal.css';

const AdminBookRequestDetail = ({ isOpen, onClose, request, onSave }) => {
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

 

  return (
    
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>희망도서 신청</h2>
        {request ? (
          <div>
            <p><strong>ISBN:</strong> {request.isbn}</p>
            <p><strong>도서 제목:</strong> {request.title}</p>
            <p><strong>작가:</strong> {request.author}</p>
            <p><strong>출판사:</strong> {request.publisher}</p>
            <p><strong>출판년도:</strong> {request.pub_date}</p>
            <p><strong>신청 권수:</strong> {request.count}</p>
            <p><strong>신청도서관:</strong> {request.lib_names.join(', ')}</p>
        
          
          
          </div>
        ) : (
          <p>No data available</p>
        )}
        <button type="button" className="btn btn-outline-dark" onClick={handleSave}>확인</button>
      </div>
    </div>
  );
};

export default AdminBookRequestDetail;
