import React, { useState, useEffect } from 'react';
import './AdminModal.css';

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
    
    <div className="admin-modal" style={{ display:'block' }} id='admin=modal' >
      <div className="modal-dialog" id="admin-modal-dialog">
    <div className="modal-content" id='admin-modal-content'>
      <div className="modal-header">
        <h5 className="modal-title" id="admin-modal-title">
         희망도서 신청
        </h5>
       
      </div>

      <div className="modal-body" id='admin-modal-body'>
{request ? (
      <div>
        <p><strong>ISBN:</strong> {request.isbn}</p>
        <p><strong>도서 제목:</strong> {request.title}</p>
        <p><strong>작가:</strong> {request.author}</p>
        <p><strong>출판사:</strong> {request.publisher}</p>
        <p><strong>출판년도:</strong> {request.pub_date}</p>
        <p><strong>신청 권수:</strong> {request.count}</p>
        <p><strong>신청도서관:</strong> {request.library}</p>
    
      
      
      </div>
    ) : (
      <p>No data available</p>
    )}
    <button type="button" id="adminbtn" class="btn btn-outline-dark"  onClick={handleSave}>확인</button>
  </div>
</div></div></div>
  );
};

export default AdminBookRequestDetail;